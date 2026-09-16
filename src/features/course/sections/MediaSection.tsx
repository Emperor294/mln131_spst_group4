import Image from "next/image";
import type { MediaLearningSection } from "@/data/course";
import SourceList from "../components/SourceList";

export default function MediaSection({ section }: { section: MediaLearningSection }) {
  const media = section.media;
  return (
    <figure className="learning-block learning-block--media">
      {section.title && <h3>{section.title}</h3>}
      {media.type === "image" && (
        <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 768px) 100vw, 760px" />
      )}
      {media.type === "video" && <video controls preload="metadata" src={media.src} aria-label={media.title} />}
      {media.type === "audio" && <audio controls preload="metadata" src={media.src} aria-label={media.title} />}
      {section.caption && <figcaption>{section.caption}</figcaption>}
      <SourceList sourceRefs={section.sourceRefs} headingLevel="h4" />
    </figure>
  );
}
