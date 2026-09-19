# Assessment architecture (Phases 5A–5E)

Phase 5 establishes the assessment and anonymous-progress foundation through
Phase 5D. The canonical quiz bank, learner player, local attempts, and practice
dashboard are now implemented and frozen by the Phase 5E audit.

## Phase 5B quiz-bank policy

The canonical bank now contains exactly eight verified questions per chapter
(56 total). Every item is single-choice with exactly four stable-ID options and
one correct option. Each question covers a narrow audited textbook range,
includes a concise source-grounded explanation, and is distributed across all
three lessons of its chapter. Distractors use adjacent concept confusions rather
than inflammatory, stereotyped, or fabricated current facts. No item depends on
2026 statistics, current officials, elections, or post-2021 policy updates.

The bank remains separate from the 30 `ReviewQuestion` records. Review
questions are not converted, answered, scored, or persisted as quiz attempts.

## Two different question domains

`ReviewQuestion` is the textbook's self-study material. The 30 existing review
questions remain inside their `LearningSection`s, retain their textbook wording
and citations, and have no answer key, score, or progress state.

`QuizQuestion` is a separate assessment record. The current bank contains 56
verified single-choice questions with explicit option IDs, type-safe correct
answers, source-grounded explanations, and resolved `ScopedSourceReference`s.

## Canonical data flow

```text
Textbook source
  ↓
ScopedSourceReference
  ↓
QuizQuestion
  ↓
Quiz
  ↓
QuizAttempt
  ↓
Pure grading
  ↓
Versioned local progress
```

Seven available quiz metadata records (`quiz-ch01` through `quiz-ch07`) each
resolve eight verified questions. A quiz remains available only while its
question IDs, answer structures, lesson ownership, and source references pass
assessment validation.

## Attempts and grading

`QuizAttempt` stores only user-generated IDs, selected option IDs, timestamps,
and result values. `gradeQuiz` is a deterministic pure function. Answers may be
edited before submission; the local progress provider will not replace a
submitted attempt, and a retake creates another attempt. The client must
eventually receive answer keys,
so this is a learning application rather than a secure examination system.

## Local progress

Anonymous progress uses the single `localStorage` key `socialism360-progress`
with envelope version `1`:

```json
{
  "version": 1,
  "attempts": [],
  "chapterProgress": []
}
```

Only assessment IDs, selected answers, timestamps, and result summaries are
stored. Course text, source text, prompts, and personal data are never copied
to storage. Access is client-only and malformed, unavailable, blocked, or newer
storage falls back to an empty state.

Progress is deliberately conservative: `not-attempted`, `attempted`, or
`passed` remains an internal future-compatible state only when a quiz explicitly
defines an application `passingScore`; it is not an official university grade.
The current v1 quizzes leave `passingScore` unset, so learner-facing progress is
limited to `not-attempted` and `attempted`.

## Future backend boundary

`ProgressRepository` (`load`, `save`, `clear`) isolates persistence from React
components. A future authenticated/backend implementation can replace the local
repository without changing quiz content or grading semantics. No account,
database, synchronization, leaderboard, timer, randomization, or AI grading is
included in the frozen Phase 5 scope.

The canonical route is `/chapters/[chapterId]/quiz`. Phase 5B provides seven
available metadata records with eight verified single-choice questions each (56
total). Each question has four stable-ID options, one correct option, a
source-grounded explanation, and narrow canonical textbook references. All three
lessons in every chapter are represented. Distractors avoid “all of the above”,
stereotypes, and current-affairs claims. The Phase 5C client `QuizPlayer`
keeps draft answers in session state, guards submission, grades through
`gradeQuiz`, persists submitted attempts anonymously, and renders canonical
explanations and sources after submission. Phase 5D exposes latest/best practice
history at `/progress`; it remains descriptive and shows no pass/fail threshold
while `passingScore` is unset.

## Frozen v1 policy (Phase 5E)

- Seven quizzes, eight questions each, 56 total.
- Single-choice only, four options per question, one correct option.
- No timer, randomization, analytics, account, cloud sync, or official grade.
- Attempts store lightweight IDs, answers, timestamps, and result metadata only.
- Current learner-facing progress is `Chưa luyện tập` / `Đã luyện tập`.
- Changes to this policy require a new explicit phase.
