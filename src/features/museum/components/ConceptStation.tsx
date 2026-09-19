'use client';

import { Html } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { MuseumConceptStation } from '../data/concept-stations';
import { getMuseumZoneAccent } from '../data/spatial-zones';
import type { MuseumInteractionRegistry, MuseumInteractionTarget } from '../runtime/interaction-registry';
import { ACADEMIC_STATION_INTERACTION_DISTANCE } from '../runtime/museum-geometry';
import AcademicExhibitLayer from './AcademicExhibitLayer';

interface ConceptStationProps {
  station: MuseumConceptStation;
  zoneNumber: number;
  registry: MuseumInteractionRegistry;
}

export default function ConceptStation({ station, zoneNumber, registry }: ConceptStationProps) {
  const rootRef = useRef<THREE.Group>(null);
  const highlightMeshRef = useRef<THREE.Mesh>(null);
  const targetRef = useRef<MuseumInteractionTarget | null>(null);
  const isAlliance = station.variant === 'alliance';
  const accent = isAlliance ? '#c76c53' : getMuseumZoneAccent(station.zoneId);

  useEffect(() => {
    const root = rootRef.current;
    const highlightMesh = highlightMeshRef.current;
    if (!root || !highlightMesh) return;

    const target: MuseumInteractionTarget = {
      kind: 'concept-station',
      stationId: station.id,
      root,
      highlightMesh,
      maxInteractionDistance: ACADEMIC_STATION_INTERACTION_DISTANCE,
    };
    targetRef.current = target;
    registry.register(target);

    return () => {
      registry.unregister(root, target);
      targetRef.current = null;
    };
  }, [registry, station.id]);

  return (
    <group ref={rootRef} position={station.position}>
      <AcademicExhibitLayer station={station} />
      <mesh ref={highlightMeshRef} position={[0, 0.58, 0]}>
        <boxGeometry args={[0.68, 0.96, 0.18]} />
        <meshStandardMaterial color="#283043" emissive={accent} emissiveIntensity={0.12} roughness={0.5} metalness={0.18} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.46, 0.58, 0.16, 20]} />
        <meshStandardMaterial color="#101425" roughness={0.72} metalness={0.22} />
      </mesh>
      <mesh position={[0, 1.09, 0]}>
        <boxGeometry args={[0.3, 0.04, 0.04]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} />
      </mesh>
      {isAlliance && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.18, 0]}>
          <torusGeometry args={[0.56, 0.025, 8, 32]} />
          <meshBasicMaterial color={accent} transparent opacity={0.72} />
        </mesh>
      )}
      <Html center position={[0, 1.48, 0]} distanceFactor={5} style={{ pointerEvents: 'none' }}>
        <div
          aria-label={`${station.label}. Nhấn để khám phá.`}
          className="museum-motion w-36 select-none border border-white/15 bg-[#101425]/88 px-2 py-1.5 text-center text-white shadow-lg backdrop-blur-sm"
        >
          <span className="block text-[9px] tracking-[0.2em] text-[#d3a06d]">{zoneNumber.toString().padStart(2, '0')}</span>
          <strong className="mt-0.5 block text-[10px] font-medium tracking-[0.08em]">{station.label}</strong>
          <span className="mt-1 block text-[9px] text-white/60">Nhấn để khám phá</span>
        </div>
      </Html>
    </group>
  );
}
