import type {
  Quiz,
  QuizAnswer,
  QuizGradeResult,
  QuizQuestion,
  QuizQuestionResult,
} from "@/data/course/assessment";

function getCorrectOptionIds(question: QuizQuestion): readonly string[] {
  return question.type === "single-choice" ? [question.correctOptionId] : question.correctOptionIds;
}

function sameOptionSet(left: readonly string[], right: readonly string[]): boolean {
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  return leftSet.size === left.length
    && leftSet.size === rightSet.size
    && [...leftSet].every((id) => rightSet.has(id));
}

export function gradeQuiz(
  quiz: Quiz,
  questions: readonly QuizQuestion[],
  answers: readonly QuizAnswer[],
): QuizGradeResult {
  const questionMap = new Map(questions.map((question) => [question.id, question]));
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.selectedOptionIds]));
  const questionResults: QuizQuestionResult[] = [];

  for (const questionId of quiz.questionIds) {
    const question = questionMap.get(questionId);
    if (!question) throw new Error(`Không tìm thấy câu hỏi ${questionId} của ${quiz.id}.`);

    const selectedOptionIds = [...(answerMap.get(question.id) ?? [])];
    const correctOptionIds = [...getCorrectOptionIds(question)];
    questionResults.push({
      questionId: question.id,
      selectedOptionIds,
      correctOptionIds,
      isCorrect: sameOptionSet(selectedOptionIds, correctOptionIds),
    });
  }

  const correctCount = questionResults.filter((result) => result.isCorrect).length;
  const totalQuestions = questionResults.length;
  const score = totalQuestions === 0 ? 0 : correctCount / totalQuestions;

  return {
    score,
    percentage: Math.round(score * 100),
    correctCount,
    totalQuestions,
    questionResults,
  };
}
