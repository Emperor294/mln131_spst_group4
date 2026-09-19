'use client';

import { Sky } from '@react-three/drei';
import { MUSEUM_VISUAL_THEME } from '../theme/museum-visual-theme';

export default function MuseumLighting() {
  const { lighting } = MUSEUM_VISUAL_THEME;

  return (
    <>
      <Sky {...lighting.sky} />
      <ambientLight intensity={lighting.ambient.intensity} color={lighting.ambient.color} />
      <directionalLight
        position={lighting.key.position}
        intensity={lighting.key.intensity}
        color={lighting.key.color}
      />
      <directionalLight
        position={lighting.fill.position}
        intensity={lighting.fill.intensity}
        color={lighting.fill.color}
      />
    </>
  );
}
