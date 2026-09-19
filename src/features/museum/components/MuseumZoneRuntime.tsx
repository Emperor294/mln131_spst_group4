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

function isInsideZone(zone: (typeof MUSEUM_SPATIAL_ZONES)[number], x: number, z: number, margin = 0) {
  return x >= zone.volume.minX - margin && x <= zone.volume.maxX + margin
    && z >= zone.volume.minZ - margin && z <= zone.volume.maxZ + margin;
}

export default function MuseumZoneRuntime({ registry, onZoneChange }: MuseumZoneRuntimeProps) {
  const currentZoneRef = useRef<MuseumZoneId | null>(null);

  useFrame(({ camera }) => {
    const currentZoneId = currentZoneRef.current;
    if (currentZoneId) {
      const currentZone = MUSEUM_SPATIAL_ZONES.find((zone) => zone.zoneId === currentZoneId);
      if (currentZone) {
        // A small exit buffer prevents rapid changes at a physical bay boundary.
        if (isInsideZone(currentZone, camera.position.x, camera.position.z, 0.35)) return;
      }
    }

    let nearestZone: MuseumZoneId | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const zone of MUSEUM_SPATIAL_ZONES) {
      const distance = Math.hypot(camera.position.x - zone.center[0], camera.position.z - zone.center[2]);
      if (isInsideZone(zone, camera.position.x, camera.position.z) && distance < nearestDistance) {
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
