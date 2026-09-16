import { generateSEOMetadata } from "@/lib/seo";
import ChapterJourney from "@/features/homepage/components/ChapterJourney";
import CourseIntroduction from "@/features/homepage/components/CourseIntroduction";
import FinalCallToAction from "@/features/homepage/components/FinalCallToAction";
import HomeHero from "@/features/homepage/components/HomeHero";
import LearningExperience from "@/features/homepage/components/LearningExperience";
import MuseumFeature from "@/features/homepage/components/MuseumFeature";
import ResourcesSection from "@/features/homepage/components/ResourcesSection";
import "@/features/homepage/homepage.css";

export const metadata = generateSEOMetadata({ canonical: "/" });

export default function Homepage() {
  return (
    <div className="home-page">
      <HomeHero />
      <CourseIntroduction />
      <ChapterJourney />
      <MuseumFeature />
      <LearningExperience />
      <ResourcesSection />
      <FinalCallToAction />
    </div>
  );
}
