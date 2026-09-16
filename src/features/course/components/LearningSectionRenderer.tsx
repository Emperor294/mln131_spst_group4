import type { LearningSection } from "@/data/course";
import ComparisonSection from "../sections/ComparisonSection";
import DefinitionSection from "../sections/DefinitionSection";
import DiagramSection from "../sections/DiagramSection";
import KeyIdeaSection from "../sections/KeyIdeaSection";
import MediaSection from "../sections/MediaSection";
import PrinciplesSection from "../sections/PrinciplesSection";
import ReviewQuestionSection from "../sections/ReviewQuestionSection";
import TextSection from "../sections/TextSection";
import TimelineSection from "../sections/TimelineSection";

export default function LearningSectionRenderer({ section }: { section: LearningSection }) {
  switch (section.type) {
    case "text":
      return <TextSection section={section} />;
    case "key-idea":
      return <KeyIdeaSection section={section} />;
    case "definition":
      return <DefinitionSection section={section} />;
    case "principles":
      return <PrinciplesSection section={section} />;
    case "comparison":
      return <ComparisonSection section={section} />;
    case "timeline":
      return <TimelineSection section={section} />;
    case "diagram":
      return <DiagramSection section={section} />;
    case "media":
      return <MediaSection section={section} />;
    case "review-question":
      return <ReviewQuestionSection section={section} />;
    default: {
      const exhaustiveCheck: never = section;
      return exhaustiveCheck;
    }
  }
}
