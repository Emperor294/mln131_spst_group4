# Progress dashboard

Phase 5D adds `/progress` as a descriptive self-study view. It reads the canonical quiz registry and the anonymous attempts stored by `AssessmentProgressProvider`; it does not create a second score database or recalculate answers in the UI.

## Meaning of progress

The dashboard has two learner-facing states:

- **Chưa luyện tập** (`not-attempted`): no submitted attempt exists for the chapter quiz.
- **Đã luyện tập** (`attempted`): one or more submitted attempts exist.

Current quizzes do not define `passingScore`, so the dashboard never presents pass/fail, mastery, completion, or an official grade. Scores are shown as the objective result of a practice attempt (`correct / total` and a rounded integer percentage). The percentage formatting policy is centralized in `formatPracticePercentage` and rounds to the nearest whole percent.

## Data flow

```text
QuizAttempt
  ↓
local progress repository (socialism360-progress, version 1)
  ↓
progress selectors
  ↓
CoursePracticeSummary
  ↓
/progress
```

`getCoursePracticeSummary` iterates canonical chapter order, ignores orphaned quiz IDs, counts only submitted attempts, and delegates latest/best selection to the assessment selectors. The best attempt is the highest score; ties resolve to the most recent submitted attempt. Recent activity is sorted by submitted timestamp descending and limited to five records.

## Storage and privacy boundary

Only user-generated attempt IDs, answer IDs, timestamps, and result metadata are stored. Question text, option labels, explanations, sources, and course content remain canonical TypeScript data. The storage key is `socialism360-progress` and the envelope version is `1`.

Progress is local to the current browser/device. There is no account, cloud sync, personal profile, or backend adapter in this phase. Malformed or unavailable storage recovers to an empty in-memory state; a non-blocking notice explains when a result could not be persisted.

## Reset behavior

`Xóa lịch sử luyện tập` opens an accessible confirmation dialog. Confirmation calls the provider's `clearProgress()` method, which clears only the assessment progress envelope. Academic content and museum state are unaffected, and the action cannot be undone on the current browser.

## Integration boundaries

Chapter cards and the chapter quiz result screen link to the dashboard. The `/progress` route does not import Three.js, React Three Fiber, the museum runtime, or `museum.glb`. It is intentionally a normal React/Next UI layer.

## Future backend boundary

The provider already isolates persistence behind repository-style storage helpers. A future authenticated backend can replace that repository without changing canonical quiz data or the dashboard's summary selectors. A future explicit `passingScore` remains supported by the internal type model, but no threshold is configured or shown today.
