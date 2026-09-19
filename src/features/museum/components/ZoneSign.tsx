'use client';

import { Html } from '@react-three/drei';
import type { MuseumZone } from '@/data/course';
import { getMuseumZoneAccent } from '../data/spatial-zones';
import type { MuseumWorldPosition } from '../data/spatial-zones';
import { MUSEUM_VISUAL_THEME } from '../theme/museum-visual-theme';

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
        <meshStandardMaterial color={MUSEUM_VISUAL_THEME.colors.architecture} emissive={accent} emissiveIntensity={0.1} roughness={0.82} metalness={0.04} />
      </mesh>
      <Html center position={[0, 0, 0.08]} distanceFactor={5} style={{ pointerEvents: 'none' }}>
        <div
          aria-label={`Zone ${zone.order}: ${zone.shortTitle}`}
          className="museum-motion w-44 select-none border border-white/25 border-t-2 px-3 py-2 text-center text-white shadow-xl backdrop-blur-sm"
          style={{ borderTopColor: accent, backgroundColor: 'rgba(11, 16, 32, 0.96)' }}
        >
          <span className="block text-[10px] tracking-[0.28em]" style={{ color: accent }}>ZONE {zone.order.toString().padStart(2, '0')}</span>
          <strong className="mt-1 block text-xs font-medium tracking-[0.12em]">{zone.shortTitle}</strong>
        </div>
      </Html>
    </group>
  );
}
