# Assessment architecture (Phase 5A)

Phase 5A establishes the assessment and anonymous-progress foundation. It does
not author the seven quiz banks; those belong to Phase 5B.

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

`QuizQuestion` is a separate assessment record. A future verified question will
have explicit option IDs, a type-safe correct answer, a source-grounded
explanation, and resolved `ScopedSourceReference`s. No canonical quiz questions
exist yet.

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

Seven planned quiz metadata records (`quiz-ch01` through `quiz-ch07`) are
registered with empty `questionIds`. A quiz becomes available only after its
questions are authored, verified, and validated.

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
`passed`. `passed` is available only when a quiz later defines an explicit
application `passingScore`; it is not an official university grade.

## Future backend boundary

`ProgressRepository` (`load`, `save`, `clear`) isolates persistence from React
components. A future authenticated/backend implementation can replace the local
repository without changing quiz content or grading semantics. No account,
database, synchronization, leaderboard, timer, randomization, or AI grading is
introduced in Phase 5A.

The future route foundation is `/chapters/[chapterId]/quiz`. Phase 5B now
provides seven available metadata records with eight verified single-choice
questions each (56 total). Each question has four stable-ID options, one
correct option, a source-grounded explanation, and narrow canonical textbook
references. All three lessons in every chapter are represented. Distractors
avoid “all of the above”, stereotypes, and current-affairs claims. The route
shell reports question availability but does not expose the interactive player;
that player and submission UX are implemented in Phase 5C through the client
`QuizPlayer`. Draft answers remain in session state until submission; submitted
attempts are graded by `gradeQuiz`, persisted anonymously, and rendered with
canonical explanations and source references. No pass/fail threshold is shown
while `passingScore` remains unset.
