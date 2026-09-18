import { ARTIFACTS } from "./artifacts";
import { COURSE_CHAPTERS } from "./chapters";
import { COURSE_LESSONS } from "./lessons";
import { MUSEUM_CONCEPTS } from "./museum-concepts";
import { MUSEUM_ZONES } from "./museum-zones";
import { ALLIANCE_EDGES, SOCIAL_GROUP_NODES } from "../../features/course/chapter-five/alliance-map-data";
import { ACADEMIC_SOURCES, MLN131_TEXTBOOK_SOURCE_ID } from "./sources";
import {
  CHAPTER_REVIEW_PAGE_MAP,
  getChapterReviewSourceRefs,
  getLessonTextbookPageMapping,
  LESSON_TEXTBOOK_PAGE_MAP,
} from "./lesson-page-map";
import { CHAPTER_TEXTBOOK_PAGE_MAP } from "./textbook-page-map";
import type {
  AcademicSourceId,
  ChapterId,
  LearningSection,
  LessonId,
  PageRange,
  ScopedSourceReference,
  ScopedSourceReferenceId,
} from "./types";

function validatePageRange(range: PageRange | undefined, label: string, issues: string[]) {
  if (!range) return;
  if (!Number.isInteger(range.start) || !Number.isInteger(range.end) || range.start <= 0 || range.end <= 0) {
    issues.push(`${label} phải dùng số trang nguyên dương.`);
  }
  if (range.start > range.end) issues.push(`${label} có trang bắt đầu lớn hơn trang kết thúc.`);
}

function validateScopedReference(
  reference: ScopedSourceReference,
  sourceIds: ReadonlySet<AcademicSourceId>,
  issues: string[],
  context: string,
) {
  if (!sourceIds.has(reference.sourceId)) {
    issues.push(`${context} tham chiếu source không tồn tại: ${reference.sourceId}`);
  }
  validatePageRange(reference.bookPages, `${context} (trang sách)`, issues);
  validatePageRange(reference.pdfPages, `${context} (trang PDF)`, issues);
}

function isContainedBy(inner: PageRange | undefined, outer: PageRange | undefined) {
  return Boolean(inner && outer && inner.start >= outer.start && inner.end <= outer.end);
}

function validateReferenceWithinLesson(
  reference: ScopedSourceReference,
  lessonId: LessonId,
  chapterId: ChapterId,
  isReviewReference: boolean,
  issues: string[],
  context: string,
) {
  const lessonMapping = getLessonTextbookPageMapping(lessonId);
  if (!lessonMapping?.sourceRef.bookPages || !lessonMapping.sourceRef.pdfPages) return;

  const reviewReferences = getChapterReviewSourceRefs(chapterId);
  const isWithinReviewPage = reviewReferences.some(
    (reviewReference) =>
      isContainedBy(reference.bookPages, reviewReference.bookPages)
      && isContainedBy(reference.pdfPages, reviewReference.pdfPages),
  );

  if (isReviewReference) {
    if (!isWithinReviewPage) {
      issues.push(`${context} phải nằm trong khoảng trang câu hỏi ôn tập của ${chapterId}.`);
    }
    return;
  }

  if (!isContainedBy(reference.bookPages, lessonMapping.sourceRef.bookPages)
    || !isContainedBy(reference.pdfPages, lessonMapping.sourceRef.pdfPages)) {
    issues.push(`${context} nằm ngoài khoảng trang bài học ${lessonId}.`);
  }
}

function validateSection(
  section: LearningSection,
  sourceIds: ReadonlySet<AcademicSourceId>,
  issues: string[],
  context: string,
  lessonId: LessonId,
  chapterId: ChapterId,
  sectionIds: Set<string>,
  reviewQuestionIds: Set<string>,
) {
  if (sectionIds.has(section.id)) issues.push(`Section ID bị trùng: ${section.id}`);
  sectionIds.add(section.id);

  for (const reference of section.sourceRefs ?? []) {
    validateScopedReference(reference, sourceIds, issues, `${context}, section ${section.id}`);
    validateReferenceWithinLesson(
      reference,
      lessonId,
      chapterId,
      section.type === "review-question",
      issues,
      `${context}, section ${section.id}`,
    );
  }

  if (section.type === "review-question") {
    const questionIds = new Set<string>();
    const questionOrders = new Set<number>();
    for (const question of section.questions) {
      if (reviewQuestionIds.has(question.id)) issues.push(`ReviewQuestion ID bị trùng: ${question.id}`);
      reviewQuestionIds.add(question.id);
      if (questionIds.has(question.id)) issues.push(`${context}, section ${section.id}: ReviewQuestion ID bị trùng: ${question.id}`);
      if (questionOrders.has(question.order)) issues.push(`${context}, section ${section.id}: thứ tự câu hỏi bị trùng: ${question.order}`);
      if (!Number.isInteger(question.order) || question.order <= 0) issues.push(`${context}, section ${section.id}: thứ tự câu hỏi phải là số nguyên dương.`);
      questionIds.add(question.id);
      questionOrders.add(question.order);
      for (const reference of question.sourceRefs) {
        validateScopedReference(reference, sourceIds, issues, `${context}, câu hỏi ${question.id}`);
        validateReferenceWithinLesson(
          reference,
          lessonId,
          chapterId,
          true,
          issues,
          `${context}, câu hỏi ${question.id}`,
        );
      }
    }
  }

  if (section.status === "verified") {
    const sectionReferences = [
      ...(section.sourceRefs ?? []),
      ...(section.type === "review-question" ? section.questions.flatMap((question) => question.sourceRefs) : []),
    ];
    const hasTraceableTextbookReference = sectionReferences.some(
      (reference) => reference.sourceId === MLN131_TEXTBOOK_SOURCE_ID && Boolean(reference.bookPages),
    );
    if (!hasTraceableTextbookReference) {
      issues.push(`${context}, section ${section.id} được đánh dấu verified nhưng chưa có trang sách giáo trình.`);
    }
  }
}

export function getCourseDataIntegrityIssues(): string[] {
  const issues: string[] = [];
  const chapterIds = new Set<ChapterId>();
  const lessonIds = new Set<LessonId>();
  const sourceIds = new Set<AcademicSourceId>();
  const sourceReferenceIds = new Set<ScopedSourceReferenceId>();
  const sectionIds = new Set<string>();
  const reviewQuestionIds = new Set<string>();
  const expectedReviewQuestionCounts: Readonly<Record<ChapterId, number>> = {
    "chapter-01": 4,
    "chapter-02": 5,
    "chapter-03": 3,
    "chapter-04": 5,
    "chapter-05": 4,
    "chapter-06": 5,
    "chapter-07": 4,
  };

  if (COURSE_CHAPTERS.length !== 7) issues.push("COURSE_CHAPTERS phải có đúng 7 chương.");
  for (const chapter of COURSE_CHAPTERS) {
    if (chapterIds.has(chapter.id)) issues.push(`Chapter ID bị trùng: ${chapter.id}`);
    chapterIds.add(chapter.id);
  }

  const chapterOrders = COURSE_CHAPTERS.map((chapter) => chapter.number).sort((left, right) => left - right);
  if (chapterOrders.some((order, index) => order !== index + 1)) issues.push("Thứ tự chương phải liên tục từ 1 đến 7.");

  for (const source of ACADEMIC_SOURCES) {
    if (sourceIds.has(source.id)) issues.push(`Academic source ID bị trùng: ${source.id}`);
    sourceIds.add(source.id);
    const hasPartialBookRange = (source.bookPageStart === undefined) !== (source.bookPageEnd === undefined);
    const hasPartialPdfRange = (source.pdfPageStart === undefined) !== (source.pdfPageEnd === undefined);
    if (hasPartialBookRange) issues.push(`Academic source ${source.id} có khoảng trang sách chưa đầy đủ.`);
    if (hasPartialPdfRange) issues.push(`Academic source ${source.id} có khoảng trang PDF chưa đầy đủ.`);
    if (source.bookPageStart !== undefined && source.bookPageEnd !== undefined) {
      validatePageRange({ start: source.bookPageStart, end: source.bookPageEnd }, `Academic source ${source.id} (trang sách)`, issues);
    }
    if (source.pdfPageStart !== undefined && source.pdfPageEnd !== undefined) {
      validatePageRange({ start: source.pdfPageStart, end: source.pdfPageEnd }, `Academic source ${source.id} (trang PDF)`, issues);
    }
  }

  if (CHAPTER_TEXTBOOK_PAGE_MAP.length !== 7) issues.push("CHAPTER_TEXTBOOK_PAGE_MAP phải có đúng 7 chapter mapping.");
  const mappedChapters = new Set<ChapterId>();
  const orderedMappings = [...CHAPTER_TEXTBOOK_PAGE_MAP].sort(
    (left, right) => (left.sourceRef.bookPages?.start ?? 0) - (right.sourceRef.bookPages?.start ?? 0),
  );

  for (const mapping of orderedMappings) {
    const { sourceRef } = mapping;
    if (!chapterIds.has(mapping.chapterId)) issues.push(`Page mapping tham chiếu chapter không tồn tại: ${mapping.chapterId}`);
    if (mappedChapters.has(mapping.chapterId)) issues.push(`Chapter có page mapping bị trùng: ${mapping.chapterId}`);
    mappedChapters.add(mapping.chapterId);
    if (sourceReferenceIds.has(sourceRef.id)) issues.push(`Scoped source reference ID bị trùng: ${sourceRef.id}`);
    sourceReferenceIds.add(sourceRef.id);
    validateScopedReference(sourceRef, sourceIds, issues, `Page mapping ${mapping.chapterId}`);

    if (!sourceRef.bookPages || !sourceRef.pdfPages) {
      issues.push(`Page mapping ${mapping.chapterId} phải có cả trang sách và trang PDF.`);
    } else if (
      sourceRef.bookPages.start !== sourceRef.pdfPages.start + 3
      || sourceRef.bookPages.end !== sourceRef.pdfPages.end + 3
    ) {
      issues.push(`Page mapping ${mapping.chapterId} không nhất quán với offset sách/PDF đã xác nhận.`);
    }
  }

  if (LESSON_TEXTBOOK_PAGE_MAP.length !== 21) {
    issues.push("LESSON_TEXTBOOK_PAGE_MAP phải có đúng 21 mapping bài học đã được rà soát.");
  }
  const mappedLessons = new Set<LessonId>();
  for (const mapping of LESSON_TEXTBOOK_PAGE_MAP) {
    if (mappedLessons.has(mapping.lessonId)) issues.push(`Lesson có page mapping bị trùng: ${mapping.lessonId}`);
    mappedLessons.add(mapping.lessonId);
    if (!chapterIds.has(mapping.chapterId)) issues.push(`Lesson page mapping tham chiếu chapter không tồn tại: ${mapping.chapterId}`);
    if (sourceReferenceIds.has(mapping.sourceRef.id)) issues.push(`Scoped source reference ID bị trùng: ${mapping.sourceRef.id}`);
    sourceReferenceIds.add(mapping.sourceRef.id);
    validateScopedReference(mapping.sourceRef, sourceIds, issues, `Lesson page mapping ${mapping.lessonId}`);
    const chapterMapping = CHAPTER_TEXTBOOK_PAGE_MAP.find((item) => item.chapterId === mapping.chapterId);
    if (!chapterMapping
      || !isContainedBy(mapping.sourceRef.bookPages, chapterMapping.sourceRef.bookPages)
      || !isContainedBy(mapping.sourceRef.pdfPages, chapterMapping.sourceRef.pdfPages)) {
      issues.push(`Lesson page mapping ${mapping.lessonId} nằm ngoài page mapping của chapter.`);
    }
    if (mapping.sourceRef.bookPages && mapping.sourceRef.pdfPages
      && (mapping.sourceRef.bookPages.start !== mapping.sourceRef.pdfPages.start + 3
        || mapping.sourceRef.bookPages.end !== mapping.sourceRef.pdfPages.end + 3)) {
      issues.push(`Lesson page mapping ${mapping.lessonId} không nhất quán với offset sách/PDF.`);
    }
  }

  for (const reviewMapping of CHAPTER_REVIEW_PAGE_MAP) {
    if (!chapterIds.has(reviewMapping.chapterId)) issues.push(`Review page mapping tham chiếu chapter không tồn tại: ${reviewMapping.chapterId}`);
    for (const reference of reviewMapping.sourceRefs) {
      if (sourceReferenceIds.has(reference.id)) issues.push(`Scoped source reference ID bị trùng: ${reference.id}`);
      sourceReferenceIds.add(reference.id);
      validateScopedReference(reference, sourceIds, issues, `Review page mapping ${reviewMapping.chapterId}`);
      if (reference.bookPages && reference.pdfPages
        && (reference.bookPages.start !== reference.pdfPages.start + 3
          || reference.bookPages.end !== reference.pdfPages.end + 3)) {
        issues.push(`Review page mapping ${reviewMapping.chapterId} không nhất quán với offset sách/PDF.`);
      }
    }
  }

  for (let index = 1; index < orderedMappings.length; index += 1) {
    const previous = orderedMappings[index - 1].sourceRef;
    const current = orderedMappings[index].sourceRef;
    if (previous.bookPages && current.bookPages && current.bookPages.start <= previous.bookPages.end) {
      issues.push(`Khoảng trang sách ${previous.id} và ${current.id} chồng lấn.`);
    }
    if (previous.pdfPages && current.pdfPages && current.pdfPages.start <= previous.pdfPages.end) {
      issues.push(`Khoảng trang PDF ${previous.id} và ${current.id} chồng lấn.`);
    }
  }

  for (const zone of MUSEUM_ZONES) {
    if (!chapterIds.has(zone.chapterId)) issues.push(`Museum zone ${zone.id} tham chiếu chapter không tồn tại: ${zone.chapterId}`);
  }

  if (COURSE_LESSONS.length !== 21) issues.push("COURSE_LESSONS phải có đúng 21 lesson.");
  for (const lesson of COURSE_LESSONS) {
    if (!chapterIds.has(lesson.chapterId)) issues.push(`Lesson ${lesson.id} tham chiếu chapter không tồn tại: ${lesson.chapterId}`);
    if (lessonIds.has(lesson.id)) issues.push(`Lesson ID bị trùng: ${lesson.id}`);
    lessonIds.add(lesson.id);
  }

  for (const chapter of COURSE_CHAPTERS) {
    if (chapter.lessons.length !== 3) issues.push(`${chapter.id} phải có đúng 3 lesson cấu trúc.`);
    for (const reference of chapter.sourceRefs ?? []) {
      validateScopedReference(reference, sourceIds, issues, `Chapter ${chapter.id}`);
    }

    const lessonOrders = new Set<number>();
    for (const lesson of chapter.lessons) {
      if (!chapterIds.has(lesson.chapterId) || lesson.chapterId !== chapter.id) {
        issues.push(`Lesson ${lesson.id} tham chiếu chapter không hợp lệ: ${lesson.chapterId}`);
      }
      if (!lessonIds.has(lesson.id)) issues.push(`Lesson ${lesson.id} không tồn tại trong COURSE_LESSONS.`);
      if (!Number.isInteger(lesson.order) || lesson.order < 1 || lesson.order > 3) {
        issues.push(`Lesson ${lesson.id} có order không hợp lệ: ${lesson.order}`);
      }
      if (lessonOrders.has(lesson.order)) issues.push(`${chapter.id} có lesson order bị trùng: ${lesson.order}`);
      lessonOrders.add(lesson.order);
      for (const reference of lesson.sourceRefs ?? []) validateScopedReference(reference, sourceIds, issues, `Lesson ${lesson.id}`);
      const sectionOrders = new Set<number>();
      for (const section of lesson.sections) {
        if (!Number.isInteger(section.order) || section.order <= 0) {
          issues.push(`Lesson ${lesson.id}, section ${section.id} có order không hợp lệ: ${section.order}`);
        }
        if (sectionOrders.has(section.order)) issues.push(`Lesson ${lesson.id} có section order bị trùng: ${section.order}`);
        sectionOrders.add(section.order);
        validateSection(section, sourceIds, issues, `Lesson ${lesson.id}`, lesson.id, chapter.id, sectionIds, reviewQuestionIds);
        if (section.status === "verified" && !["chapter-01", "chapter-02", "chapter-03", "chapter-04", "chapter-05", "chapter-06", "chapter-07"].includes(chapter.id)) {
          issues.push(`Section ${section.id} của ${chapter.id} không thuộc chapter hợp lệ để verified.`);
        }
      }
      const sortedSectionOrders = [...sectionOrders].sort((left, right) => left - right);
      if (sortedSectionOrders.some((order, index) => order !== index + 1)) {
        issues.push(`Lesson ${lesson.id} phải có section order liên tục từ 1.`);
      }
    }
    if ([1, 2, 3].some((order) => !lessonOrders.has(order))) issues.push(`${chapter.id} phải có lesson order liên tục từ 1 đến 3.`);

    const reviewQuestionCount = chapter.lessons.reduce(
      (total, lesson) => total + lesson.sections.reduce(
        (lessonTotal, section) => section.type === "review-question" ? lessonTotal + section.questions.length : lessonTotal,
        0,
      ),
      0,
    );
    if (reviewQuestionCount !== expectedReviewQuestionCounts[chapter.id]) {
      issues.push(`${chapter.id} phải có ${expectedReviewQuestionCounts[chapter.id]} câu hỏi ôn tập, hiện có ${reviewQuestionCount}.`);
    }
  }

  if (lessonIds.size !== 21) issues.push("Khung khóa học phải có đúng 21 lesson ID duy nhất.");
  if (reviewQuestionIds.size !== 30) issues.push(`Khóa học phải có đúng 30 câu hỏi ôn tập duy nhất, hiện có ${reviewQuestionIds.size}.`);

  for (const artifact of ARTIFACTS) {
    if (artifact.chapterId && !chapterIds.has(artifact.chapterId)) issues.push(`Artifact ${artifact.id} tham chiếu chapter không tồn tại: ${artifact.chapterId}`);
    if (artifact.lessonId && !lessonIds.has(artifact.lessonId)) issues.push(`Artifact ${artifact.id} tham chiếu lesson không tồn tại: ${artifact.lessonId}`);
    for (const reference of artifact.sourceRefs ?? []) validateScopedReference(reference, sourceIds, issues, `Artifact ${artifact.id}`);
  }

  if (MUSEUM_CONCEPTS.length !== 7) issues.push("MUSEUM_CONCEPTS phải có đúng 7 concept.");
  for (const concept of MUSEUM_CONCEPTS) {
    if (!chapterIds.has(concept.chapterId)) issues.push(`Museum concept ${concept.id} tham chiếu chapter không tồn tại: ${concept.chapterId}`);
    for (const reference of concept.sourceRefs) validateScopedReference(reference, sourceIds, issues, `Museum concept ${concept.id}`);
  }

  const allianceNodeIds = new Set<string>();
  for (const node of SOCIAL_GROUP_NODES) {
    if (allianceNodeIds.has(node.id)) issues.push(`AllianceMap node ID bị trùng: ${node.id}`);
    allianceNodeIds.add(node.id);
    for (const reference of node.sourceRefs ?? []) {
      validateScopedReference(reference, sourceIds, issues, `AllianceMap node ${node.id}`);
    }
    if (node.status === "verified" && (!node.summary || !(node.sourceRefs?.length))) {
      issues.push(`AllianceMap node ${node.id} verified phải có summary và sourceRefs.`);
    }
  }

  const allianceEdgeIds = new Set<string>();
  for (const edge of ALLIANCE_EDGES) {
    if (allianceEdgeIds.has(edge.id)) issues.push(`AllianceMap edge ID bị trùng: ${edge.id}`);
    allianceEdgeIds.add(edge.id);
    if (!allianceNodeIds.has(edge.from) || !allianceNodeIds.has(edge.to)) {
      issues.push(`AllianceMap edge ${edge.id} có endpoint không tồn tại.`);
    }
    for (const reference of edge.sourceRefs ?? []) {
      validateScopedReference(reference, sourceIds, issues, `AllianceMap edge ${edge.id}`);
    }
    if (edge.status === "verified" && (!edge.summary || !(edge.sourceRefs?.length))) {
      issues.push(`AllianceMap edge ${edge.id} verified phải có summary và sourceRefs.`);
    }
  }

  return issues;
}

export function assertCourseDataIntegrity(): void {
  const issues = getCourseDataIntegrityIssues();
  if (issues.length > 0) throw new Error(`Course data không hợp lệ:\n${issues.join("\n")}`);
}
