import type { MuseumZoneId } from '@/data/course';
import { getMuseumZoneAccent } from '../data/spatial-zones';

/**
 * Phase 6E is intentionally a small visual vocabulary, not a second app-wide
 * design system. Zone accents remain owned by spatial-zones.ts.
 */
export const MUSEUM_VISUAL_THEME = {
  colors: {
    architecture: '#283247',
    architectureSecondary: '#35425a',
    floor: '#202536',
    exhibitSurface: '#202b42',
    exhibitNeutral: '#c5b28f',
    exhibitLine: '#8ea4c7',
    interaction: '#f0c77b',
    legacyInteraction: '#a9c0dc',
    overlay: '#0b1020',
    labelBorder: 'rgba(240, 199, 123, 0.48)',
    labelText: '#f7f4ed',
  },
  materials: {
    architecture: { roughness: 0.86, metalness: 0.03 },
    architectureSecondary: { roughness: 0.82, metalness: 0.04 },
    exhibit: { roughness: 0.76, metalness: 0.04 },
    accent: { roughness: 0.78, metalness: 0.04 },
  },
  lighting: {
    ambient: { intensity: 0.44, color: '#b5c0d2' },
    key: { intensity: 1.14, color: '#d7b38e', position: [5, 10, 5] as const },
    fill: { intensity: 0.48, color: '#92a9ca', position: [-4, 5, -2] as const },
    sky: {
      distance: 450000,
      sunPosition: [0, 1, 0] as const,
      inclination: 0.49,
      azimuth: 0.25,
      turbidity: 20,
      rayleigh: 0.5,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.8,
    },
    exposure: 1.04,
  },
} as const;

export function getMuseumVisualAccent(zoneId: MuseumZoneId) {
  return getMuseumZoneAccent(zoneId);
}
