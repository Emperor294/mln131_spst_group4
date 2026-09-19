# Progress dashboard QA

This checklist separates automated checks from browser checks that still require a real device.

## Empty state

1. Clear browser-local progress (or use **Xóa lịch sử luyện tập** after creating a test attempt).
2. Open `/progress`.
3. Confirm `0 / 7`, `0` total attempts, the empty-state message, and seven chapter cards labeled `Chưa luyện tập`.
4. Confirm the cards link to the matching chapter quiz and chapter pages.

## Multiple attempts and latest/best semantics

1. Open Chapter 1's quiz and submit a deliberately chosen 5/8 result.
2. Open `/progress`: Chapter 1 should show one attempt and latest/best `5 / 8`.
3. Retake and submit 7/8. Confirm two attempts, latest 7/8, best 7/8.
4. Retake and submit 6/8. Confirm three attempts, latest 6/8, best remains 7/8.
5. Complete Chapter 5 and confirm the practiced count becomes `2 / 7`.
6. Reload `/progress` and confirm the history remains.

## Recent activity

Confirm the recent list is ordered by submitted time descending, displays at most five records, and uses Vietnamese-friendly date/time formatting.

## Reset

1. Open **Xóa lịch sử luyện tập** with keyboard and mouse.
2. Confirm focus enters the dialog, Escape/cancel closes it, and focus returns to the trigger.
3. Confirm the destructive action explains local scope and irreversibility.
4. Confirm reset returns the dashboard to `0 / 7` without changing chapter content.

## Storage failure and malformed data

With localStorage blocked, corrupted, or unavailable, open a quiz and submit. The result must remain visible; `/progress` must render an empty or current in-memory view with a non-blocking persistence notice and no crash.

## Keyboard and responsive checks

- Keyboard-only: reach all seven chapter cards, quiz links, reset dialog controls, and cancel/confirm actions.
- Verify visible focus and meaningful link/button labels.
- At 390px: metrics stack, cards are full width, Vietnamese titles wrap, recent activity remains readable, and there is no horizontal scrolling.
- At tablet and desktop widths: cards use a restrained two/three-column grid without becoming tiny.

## Cross-tab behavior

Cross-tab synchronization is not required for Phase 5D. If the browser sends a storage event, refresh the page before treating another tab's changes as authoritative.
