'use client';

import { MUSEUM_ZONES, getMuseumZoneById } from '@/data/course';
import { MUSEUM_CONCEPT_STATIONS } from '../data/concept-stations';
import type { MuseumInteractionRegistry } from '../runtime/interaction-registry';
import ConceptStation from './ConceptStation';
import { AcademicExhibitProvider } from './AcademicExhibitLayer';

interface ConceptStationLayerProps {
  registry: MuseumInteractionRegistry;
}

export default function ConceptStationLayer({ registry }: ConceptStationLayerProps) {
  return (
    <AcademicExhibitProvider>
      {MUSEUM_CONCEPT_STATIONS.map((station) => {
        const zone = getMuseumZoneById(station.zoneId);
        if (!zone) return null;

        return (
          <ConceptStation
            key={station.id}
            registry={registry}
            station={station}
            zoneNumber={MUSEUM_ZONES.find((item) => item.id === zone.id)?.order ?? 0}
          />
        );
      })}
    </AcademicExhibitProvider>
  );
}
