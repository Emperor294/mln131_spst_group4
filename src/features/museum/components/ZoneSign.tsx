'use client';

import { Html } from '@react-three/drei';
import type { MuseumZone } from '@/data/course';
import { getMuseumZoneAccent } from '../data/spatial-zones';
import type { MuseumWorldPosition } from '../data/spatial-zones';

interface ZoneSignProps {
  zone: MuseumZone;
  position: MuseumWorldPosition;
}

export default function ZoneSign({ zone, position }: ZoneSignProps) {
  const accent = getMuseumZoneAccent(zone.id);

  return (
    <group position={position}>
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[1.25, 1.8, 0.08]} />
        <meshStandardMaterial color="#171b2b" emissive={accent} emissiveIntensity={0.16} roughness={0.62} />
      </mesh>
      <Html center position={[0, 0, 0.08]} distanceFactor={5} style={{ pointerEvents: 'none' }}>
        <div
          aria-label={`Zone ${zone.order}: ${zone.shortTitle}`}
          className="museum-motion w-44 select-none border border-white/20 border-t-2 bg-[#101425]/90 px-3 py-2 text-center text-white shadow-xl backdrop-blur-sm"
          style={{ borderTopColor: accent }}
        >
          <span className="block text-[10px] tracking-[0.28em]" style={{ color: accent }}>ZONE {zone.order.toString().padStart(2, '0')}</span>
          <strong className="mt-1 block text-xs font-medium tracking-[0.12em]">{zone.shortTitle}</strong>
        </div>
      </Html>
    </group>
  );
}
