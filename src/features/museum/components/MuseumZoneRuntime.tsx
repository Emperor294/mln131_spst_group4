'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { getMuseumZoneById } from '@/data/course';
import { MUSEUM_SPATIAL_ZONES } from '../data/spatial-zones';
import { assertMuseumSpatialDataIntegrity } from '../data/spatial-validation';
import type { MuseumZoneId } from '@/data/course';
import type { MuseumInteractionRegistry } from '../runtime/interaction-registry';
import ConceptStationLayer from './ConceptStationLayer';
import ZoneSign from './ZoneSign';

interface MuseumZoneRuntimeProps {
  registry: MuseumInteractionRegistry;
  onZoneChange: (zoneId: MuseumZoneId | null) => void;
}

assertMuseumSpatialDataIntegrity();

export default function MuseumZoneRuntime({ registry, onZoneChange }: MuseumZoneRuntimeProps) {
  const currentZoneRef = useRef<MuseumZoneId | null>(null);

  useFrame(({ camera }) => {
    const currentZoneId = currentZoneRef.current;
    if (currentZoneId) {
      const currentZone = MUSEUM_SPATIAL_ZONES.find((zone) => zone.zoneId === currentZoneId);
      if (currentZone) {
        const currentDistance = Math.hypot(
          camera.position.x - currentZone.center[0],
          camera.position.z - currentZone.center[2],
        );
        // A small exit buffer prevents rapid A/B changes when activation
        // circles overlap at a zone boundary.
        if (currentDistance <= currentZone.activationRadius + 0.35) return;
      }
    }

    let nearestZone: MuseumZoneId | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const zone of MUSEUM_SPATIAL_ZONES) {
      const distance = Math.hypot(camera.position.x - zone.center[0], camera.position.z - zone.center[2]);
      if (distance <= zone.activationRadius && distance < nearestDistance) {
        nearestZone = zone.zoneId;
        nearestDistance = distance;
      }
    }

    if (nearestZone === currentZoneRef.current) return;
    currentZoneRef.current = nearestZone;
    onZoneChange(nearestZone);
  });

  return (
    <>
      {MUSEUM_SPATIAL_ZONES.map((spatialZone) => {
        const zone = getMuseumZoneById(spatialZone.zoneId);
        if (!zone) return null;
        return <ZoneSign key={spatialZone.zoneId} zone={zone} position={spatialZone.labelPosition} />;
      })}
      <ConceptStationLayer registry={registry} />
    </>
  );
}
