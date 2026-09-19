import { textbookReference } from "../../content/textbook-reference";
import type { SingleChoiceQuizQuestion } from "../types";

export function reference(
  id: Parameters<typeof textbookReference>[0],
  bookStart: number,
  bookEnd: number,
  pdfStart: number,
  pdfEnd: number,
) {
  return textbookReference(id, bookStart, bookEnd, pdfStart, pdfEnd);
}

export function singleChoiceQuestion(
  question: Omit<SingleChoiceQuizQuestion, "type" | "status">,
): SingleChoiceQuizQuestion {
  return { ...question, type: "single-choice", status: "verified" };
}
