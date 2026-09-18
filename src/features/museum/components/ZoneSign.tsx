'use client';

import { Html } from '@react-three/drei';
import type { MuseumZone } from '@/data/course';
import type { MuseumWorldPosition } from '../data/spatial-zones';

interface ZoneSignProps {
  zone: MuseumZone;
  position: MuseumWorldPosition;
}

export default function ZoneSign({ zone, position }: ZoneSignProps) {
  return (
    <group position={position}>
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[1.25, 1.8, 0.08]} />
        <meshStandardMaterial color="#171b2b" emissive="#220e17" emissiveIntensity={0.22} roughness={0.62} />
      </mesh>
      <Html center position={[0, 0, 0.08]} distanceFactor={5} style={{ pointerEvents: 'none' }}>
        <div
          aria-label={`Zone ${zone.order}: ${zone.shortTitle}`}
          className="w-44 select-none border border-white/20 bg-[#101425]/90 px-3 py-2 text-center text-white shadow-xl backdrop-blur-sm"
        >
          <span className="block text-[10px] tracking-[0.28em] text-[#d3a06d]">ZONE {zone.order.toString().padStart(2, '0')}</span>
          <strong className="mt-1 block text-xs font-medium tracking-[0.12em]">{zone.shortTitle}</strong>
        </div>
      </Html>
    </group>
  );
}
