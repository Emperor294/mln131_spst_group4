# Quiz player QA checklist (Phase 5C)

The quiz player is a client-side formative practice flow. Draft answers live
in component state until submission; refreshing before submission may reset the
draft. Submitted attempts are stored anonymously in the versioned
`socialism360-progress` local storage envelope. No official pass/fail rule is
used.

## Core flow

1. Open `/chapters/chapter-01` and select **Luyện tập chương**.
2. Select **Bắt đầu luyện tập**.
3. Answer question 1, then move forward without answering question 2.
4. Use the numbered navigator to return to question 2.
5. Change an earlier answer before submission.
6. Select **Nộp bài** while unanswered questions remain.
7. Confirm the warning and either return to complete the quiz or deliberately submit incomplete.
8. Complete all questions and submit.
9. Verify the objective score, percentage, unanswered handling, and neutral wording.
10. Review a correct answer and an incorrect/unanswered answer.
11. Confirm the canonical explanation and printed-book source are visible for every question.
12. Select **Làm lại**, complete a second attempt, and confirm the earlier attempt remains preserved.
13. Reload after submission and verify the pre-quiz attempt count/best score note.
14. Repeat spot checks in Chapters 5, 6, and 7 for sensitive academic wording.

## Device and accessibility matrix

| Target | Checks |
| --- | --- |
| 1440px desktop | Intro, one-question layout, navigator, score, review density, chapter CTA |
| 1024px tablet/desktop | No excessive width, readable options, stable Previous/Next controls |
| 768px | Navigator wrapping, review cards, source list and CTA remain usable |
| 390px mobile | No horizontal overflow, full-width options, reachable submit controls, wrapping sources |
| Keyboard-only | Tab order, native radio selection, arrow/Space behavior, visible focus, heading focus after navigation |
| Screen reader | Fieldset/legend, question position, answered/unanswered navigator labels, result status |
| Reduced motion | No meaningful content depends on transitions; reduced-motion media rule is honored |

## Persistence failure scenarios

- Disable or block `localStorage`: the visible result must still render and show a concise save notice.
- Corrupt `socialism360-progress`: the provider should recover with empty progress and allow a new attempt.
- Submit twice or retake: each completed attempt must have a distinct ID; previous attempts must remain available to selectors.
- Rapid double-click on the final confirmation must produce one graded/persisted attempt; a retake then produces a new ID.

## Academic and sensitive-content checks

- ReviewQuestion sections remain self-study questions without answer keys.
- Chapter 4–6 wording remains neutral course comprehension.
- Chapter 6 contains no religious judgments, stereotypes, or current statistics.
- Chapter 7 contains no personalized family advice or prescriptive imagery.
- No quiz screen uses “Đạt”, “Không đạt”, “Qua môn”, or “Trượt”.
