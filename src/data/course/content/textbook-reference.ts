import { MLN131_TEXTBOOK_SOURCE_ID } from "../sources";
import type { ScopedSourceReference, ScopedSourceReferenceId } from "../types";

export function textbookReference(
  id: ScopedSourceReferenceId,
  bookStart: number,
  bookEnd: number,
  pdfStart: number,
  pdfEnd: number,
): ScopedSourceReference {
  return {
    id,
    sourceId: MLN131_TEXTBOOK_SOURCE_ID,
    bookPages: { start: bookStart, end: bookEnd },
    pdfPages: { start: pdfStart, end: pdfEnd },
  };
}
