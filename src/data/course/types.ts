export type ContentStatus = "placeholder" | "draft" | "verified";

export type ChapterId = `chapter-${"01" | "02" | "03" | "04" | "05" | "06" | "07"}`;
export type MuseumZoneId = `zone-${"01" | "02" | "03" | "04" | "05" | "06" | "07"}`;
export type LessonId = `ch${"01" | "02" | "03" | "04" | "05" | "06" | "07"}-lesson-${"01" | "02" | "03"}`;
export type ArtifactId = `artifact-${string}`;
export type LearningSectionId = `section-${string}`;
export type AcademicSourceId = "mln131-textbook-2021" | `source-${string}`;
export type ScopedSourceReferenceId = `ref-${string}`;

export type SourceType =
  | "textbook"
  | "lecture-slide"
  | "lecturer-material"
  | "academic-reference"
  | "legal-policy-document"
  | "media"
  | "other";

export interface PageRange {
  start: number;
  end: number;
}

export interface SourceReference {
  id: AcademicSourceId;
  title: string;
  author?: string;
  institution?: string;
  publisher?: string;
  year?: number;
  sourceType: SourceType;
  reference: string;
  url?: string;
  bookPageStart?: number;
  bookPageEnd?: number;
  pdfPageStart?: number;
  pdfPageEnd?: number;
  notes?: string;
}

export type CanonicalSource = SourceReference;

export interface ScopedSourceReference {
  id: ScopedSourceReferenceId;
  sourceId: AcademicSourceId;
  bookPages?: PageRange;
  pdfPages?: PageRange;
  notes?: string;
}

export const LEARNING_SECTION_TYPES = [
  "text",
  "definition",
  "key-idea",
  "principles",
  "comparison",
  "timeline",
  "diagram",
  "media",
  "review-question",
] as const;

export type LearningSectionType = (typeof LEARNING_SECTION_TYPES)[number];

interface LearningSectionBase {
  id: LearningSectionId;
  type: LearningSectionType;
  title?: string;
  status: ContentStatus;
  sourceRefs?: readonly ScopedSourceReference[];
}

export interface TextLearningSection extends LearningSectionBase {
  type: "text";
  paragraphs: readonly string[];
}

export interface KeyIdeaLearningSection extends LearningSectionBase {
  type: "key-idea";
  content: string;
}

export interface DefinitionLearningSection extends LearningSectionBase {
  type: "definition";
  term: string;
  definition: string;
}

export interface PrincipleItem {
  id: string;
  label?: string;
  title?: string;
  content: string;
}

export interface PrinciplesLearningSection extends LearningSectionBase {
  type: "principles";
  intro?: string;
  items: readonly PrincipleItem[];
}

export interface ComparisonColumn {
  title: string;
}

export interface ComparisonRow {
  id: string;
  criterion: string;
  left: string;
  right: string;
}

export interface ComparisonLearningSection extends LearningSectionBase {
  type: "comparison";
  left: ComparisonColumn;
  right: ComparisonColumn;
  rows: readonly ComparisonRow[];
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  description: string;
}

export interface TimelineLearningSection extends LearningSectionBase {
  type: "timeline";
  items: readonly TimelineItem[];
}

export interface DiagramNode {
  id: string;
  label: string;
  description?: string;
}

export interface DiagramEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface DiagramLearningSection extends LearningSectionBase {
  type: "diagram";
  intro?: string;
  nodes: readonly DiagramNode[];
  edges: readonly DiagramEdge[];
}

export type LearningMedia =
  | { type: "image"; src: string; alt: string; width: number; height: number }
  | { type: "video" | "audio"; src: string; title: string };

export interface MediaLearningSection extends LearningSectionBase {
  type: "media";
  media: LearningMedia;
  caption?: string;
}

export interface ReviewQuestion {
  id: `review-question-${string}`;
  order: number;
  question: string;
  sourceRefs: readonly ScopedSourceReference[];
}

export interface ReviewQuestionLearningSection extends LearningSectionBase {
  type: "review-question";
  questions: readonly ReviewQuestion[];
}

export type LearningSection =
  | TextLearningSection
  | DefinitionLearningSection
  | KeyIdeaLearningSection
  | PrinciplesLearningSection
  | ComparisonLearningSection
  | TimelineLearningSection
  | DiagramLearningSection
  | MediaLearningSection
  | ReviewQuestionLearningSection;

export interface Lesson {
  id: LessonId;
  chapterId: ChapterId;
  order: number;
  title: string;
  summary: string;
  status: ContentStatus;
  sections: readonly LearningSection[];
  sourceRefs?: readonly ScopedSourceReference[];
}

export interface CourseChapter {
  id: ChapterId;
  number: number;
  title: string;
  shortTitle?: string;
  description: string;
  status: ContentStatus;
  museumZoneId: MuseumZoneId;
  lessons: readonly Lesson[];
  sourceRefs?: readonly ScopedSourceReference[];
}

export interface MuseumZone {
  id: MuseumZoneId;
  chapterId: ChapterId;
  order: number;
  title: string;
  description: string;
  status: ContentStatus;
}

export interface ArtifactImage {
  src: string;
  alt: string;
}

export interface Artifact {
  id: ArtifactId;
  title: string;
  description: string;
  status: ContentStatus;
  chapterId?: ChapterId;
  lessonId?: LessonId;
  museumZoneId?: MuseumZoneId;
  image?: ArtifactImage;
  learningConnection?: string;
  sourceRefs?: readonly ScopedSourceReference[];
  reviewNotes?: string;
}

export interface ChapterTextbookPageMapping {
  chapterId: ChapterId;
  sourceRef: ScopedSourceReference;
  status: "verified";
}

export interface MuseumConcept {
  id: `museum-concept-${string}`;
  chapterId: ChapterId;
  title: string;
  suggestedVisualization: string;
  sourceRefs: readonly ScopedSourceReference[];
  status: ContentStatus;
}
