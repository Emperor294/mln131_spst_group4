'use client';

import { Html } from '@react-three/drei';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import { MUSEUM_ZONE_ACCENTS } from '../data/spatial-zones';
import {
  getAcademicExhibitByStationId,
  type AcademicExhibitDefinition,
  type AcademicExhibitVariant,
} from '../data/academic-exhibits';
import type { MuseumConceptStation } from '../data/concept-stations';
import { MUSEUM_VISUAL_THEME, getMuseumVisualAccent } from '../theme/museum-visual-theme';

const DEBUG_QUERY = 'museumDebug';

interface AcademicExhibitResources {
  box: THREE.BoxGeometry;
  cylinder: THREE.CylinderGeometry;
  torus: THREE.TorusGeometry;
  materials: Map<string, THREE.MeshStandardMaterial>;
  debug: boolean;
}

const ResourcesContext = createContext<AcademicExhibitResources | null>(null);

function useMuseumDebugFlag() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEnabled(params.get(DEBUG_QUERY) === '1');
  }, []);
  return enabled;
}

function createMaterial(color: string, roughness = 0.78, metalness = 0.04) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

export function AcademicExhibitProvider({ children }: { children: ReactNode }) {
  const debug = useMuseumDebugFlag();
  const resources = useMemo<AcademicExhibitResources>(() => {
    const materials = new Map<string, THREE.MeshStandardMaterial>();
    materials.set('surface', createMaterial(MUSEUM_VISUAL_THEME.colors.exhibitSurface, MUSEUM_VISUAL_THEME.materials.exhibit.roughness, MUSEUM_VISUAL_THEME.materials.exhibit.metalness));
    materials.set('neutral', createMaterial(MUSEUM_VISUAL_THEME.colors.exhibitNeutral, MUSEUM_VISUAL_THEME.materials.exhibit.roughness, MUSEUM_VISUAL_THEME.materials.exhibit.metalness));
    materials.set('line', createMaterial(MUSEUM_VISUAL_THEME.colors.exhibitLine, MUSEUM_VISUAL_THEME.materials.exhibit.roughness, MUSEUM_VISUAL_THEME.materials.exhibit.metalness));
    materials.set('alliance', createMaterial('#c76c53', 0.76, 0.06));
    for (const zoneId of Object.keys(MUSEUM_ZONE_ACCENTS)) {
      materials.set(`accent:${zoneId}`, createMaterial(getMuseumVisualAccent(zoneId as keyof typeof MUSEUM_ZONE_ACCENTS), MUSEUM_VISUAL_THEME.materials.accent.roughness, MUSEUM_VISUAL_THEME.materials.accent.metalness));
    }

    return {
      box: new THREE.BoxGeometry(1, 1, 1),
      cylinder: new THREE.CylinderGeometry(1, 1, 1, 12),
      torus: new THREE.TorusGeometry(1, 0.08, 8, 24),
      materials,
      debug,
    };
  }, [debug]);

  useEffect(() => () => {
    resources.box.dispose();
    resources.cylinder.dispose();
    resources.torus.dispose();
    resources.materials.forEach((material) => material.dispose());
  }, [resources]);

  return <ResourcesContext.Provider value={resources}>{children}</ResourcesContext.Provider>;
}

function useAcademicExhibitResources() {
  const resources = useContext(ResourcesContext);
  if (!resources) throw new Error('AcademicExhibitLayer must be rendered inside AcademicExhibitProvider.');
  return resources;
}

type MaterialRole = 'surface' | 'neutral' | 'line' | 'alliance' | 'accent';

function getMaterial(resources: AcademicExhibitResources, zoneId: string, role: MaterialRole) {
  return resources.materials.get(role === 'accent' ? `accent:${zoneId}` : role) ?? resources.materials.get('surface')!;
}

function Block({
  geometry,
  material,
  position,
  scale,
  rotation = [0, 0, 0],
}: {
  geometry: THREE.BoxGeometry;
  material: THREE.MeshStandardMaterial;
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
}) {
  return <mesh geometry={geometry} material={material} position={position} scale={scale} rotation={rotation} dispose={null} />;
}

function Node({
  geometry,
  material,
  position,
  scale = [0.12, 0.2, 0.12],
}: {
  geometry: THREE.CylinderGeometry;
  material: THREE.MeshStandardMaterial;
  position: [number, number, number];
  scale?: [number, number, number];
}) {
  return <mesh geometry={geometry} material={material} position={position} scale={scale} dispose={null} />;
}

function Connector({
  geometry,
  material,
  start,
  end,
  thickness = 0.035,
}: {
  geometry: THREE.BoxGeometry;
  material: THREE.MeshStandardMaterial;
  start: [number, number, number];
  end: [number, number, number];
  thickness?: number;
}) {
  const dx = end[0] - start[0];
  const dz = end[2] - start[2];
  const length = Math.hypot(dx, dz);
  return (
    <Block
      geometry={geometry}
      material={material}
      position={[(start[0] + end[0]) / 2, (start[1] + end[1]) / 2, (start[2] + end[2]) / 2]}
      scale={[length, thickness, thickness]}
      rotation={[0, -Math.atan2(dz, dx), 0]}
    />
  );
}

function Ring({
  geometry,
  material,
  position,
  scale,
}: {
  geometry: THREE.TorusGeometry;
  material: THREE.MeshStandardMaterial;
  position: [number, number, number];
  scale: [number, number, number];
}) {
  return <mesh geometry={geometry} material={material} position={position} rotation={[Math.PI / 2, 0, 0]} scale={scale} dispose={null} />;
}

const LABEL_POSITIONS: Readonly<Record<AcademicExhibitVariant, readonly [number, number, number][]>> = {
  timeline: [[-0.35, 1.22, 0], [0.35, 1.22, 0]],
  foundation: [[-0.28, 1.32, 0], [0.28, 1.32, 0], [0, 1.62, 0]],
  cluster: [[0, 1.42, 0], [-0.42, 1.2, 0], [0.42, 1.2, 0]],
  layers: [[0, 1.38, 0], [0, 1.06, 0], [0, 0.74, 0]],
  framework: [[0, 1.5, 0]],
  sequence: [[-0.35, 1.28, 0], [0.35, 1.28, 0]],
  comparison: [[-0.3, 1.28, 0], [0.3, 1.28, 0]],
  relationship: [[-0.3, 1.26, 0], [0.3, 1.26, 0]],
  bridge: [[0, 1.34, 0]],
  network: [[-0.34, 1.25, 0], [0.34, 1.25, 0], [0, 1.62, 0]],
  parallel: [[0, 1.42, 0], [0, 1.68, 0]],
};

function ExhibitLabels({ exhibit, debug }: { exhibit: AcademicExhibitDefinition; debug: boolean }) {
  const labels = exhibit.worldLabels ?? [];
  const positions = LABEL_POSITIONS[exhibit.variant];
  return (
    <>
      {labels.slice(0, positions.length).map((label, index) => (
        <Html key={`${exhibit.id}-label-${index}`} center position={positions[index]} distanceFactor={5} style={{ pointerEvents: 'none' }}>
          <span className="museum-motion block max-w-28 select-none border px-1.5 py-1 text-center text-[8px] tracking-[0.08em] shadow-sm backdrop-blur-sm" style={{ backgroundColor: 'rgba(11, 16, 32, 0.94)', borderColor: MUSEUM_VISUAL_THEME.colors.labelBorder, color: MUSEUM_VISUAL_THEME.colors.labelText }}>
            {label}
          </span>
        </Html>
      ))}
      {exhibit.secondaryLabels?.map((label, index) => (
        <Html key={`${exhibit.id}-secondary-${index}`} center position={[-0.42 + index * 0.42, 0.36, 0.2]} distanceFactor={5} style={{ pointerEvents: 'none' }}>
          <span className="block max-w-20 select-none text-center text-[7px] tracking-[0.05em] text-white/75">{label}</span>
        </Html>
      ))}
      {debug && (
        <Html position={[-0.65, 1.8, 0]} distanceFactor={7} style={{ pointerEvents: 'none' }}>
          <div className="rounded border px-2 py-1 text-[8px] leading-4 text-white/85 shadow-lg" style={{ backgroundColor: 'rgba(11, 16, 32, 0.97)', borderColor: MUSEUM_VISUAL_THEME.colors.labelBorder }}>
            <strong className="block" style={{ color: MUSEUM_VISUAL_THEME.colors.interaction }}>{exhibit.id}</strong>
            <span className="block">{exhibit.stationId}</span>
            <span className="block">{exhibit.visualization} · {exhibit.conceptIds.length} concepts</span>
          </div>
        </Html>
      )}
    </>
  );
}

function RenderExhibit({ exhibit, resources, accent }: { exhibit: AcademicExhibitDefinition; resources: AcademicExhibitResources; accent: THREE.MeshStandardMaterial }) {
  const surface = getMaterial(resources, exhibit.zoneId, 'surface');
  const line = getMaterial(resources, exhibit.zoneId, 'line');
  const neutral = getMaterial(resources, exhibit.zoneId, 'neutral');
  const alliance = exhibit.zoneId === 'museum-zone-05' ? getMaterial(resources, exhibit.zoneId, 'alliance') : accent;
  const box = resources.box;
  const cylinder = resources.cylinder;
  const torus = resources.torus;

  switch (exhibit.variant) {
    case 'timeline': {
      const points: [number, number, number][] = [[-0.36, 0.58, 0], [0.36, 0.82, 0]];
      return <>
        <Connector geometry={box} material={line} start={[-0.28, 0.68, 0]} end={[0.28, 0.72, 0]} />
        {points.map((point, index) => <Node key={index} geometry={cylinder} material={index === 0 ? accent : neutral} position={point} scale={[0.14, 0.26, 0.14]} />)}
        <Block geometry={box} material={surface} position={[-0.36, 0.34, 0]} scale={[0.12, 0.26, 0.24]} />
        <Block geometry={box} material={surface} position={[0.36, 0.34, 0]} scale={[0.12, 0.26, 0.24]} />
      </>;
    }
    case 'foundation':
      return <>
        <Block geometry={box} material={accent} position={[-0.3, 0.73, 0]} scale={[0.18, 0.95, 0.18]} />
        <Block geometry={box} material={neutral} position={[0.3, 0.73, 0]} scale={[0.18, 0.95, 0.18]} />
        <Block geometry={box} material={line} position={[0, 1.2, 0]} scale={[0.78, 0.08, 0.1]} />
        <Block geometry={box} material={surface} position={[0, 0.25, 0]} scale={[0.9, 0.08, 0.42]} />
      </>;
    case 'cluster':
      return <>
        <Node geometry={cylinder} material={accent} position={[0, 0.82, 0]} scale={[0.2, 0.34, 0.2]} />
        {([[-0.42, 0.52, 0], [0.42, 0.52, 0], [0, 0.52, 0.36]] as [number, number, number][]).map((point, index) => <group key={index}><Connector geometry={box} material={line} start={[0, 0.7, 0]} end={point} /><Node geometry={cylinder} material={index === 1 ? neutral : accent} position={point} /></group>)}
      </>;
    case 'layers':
      return <>
        <Block geometry={box} material={accent} position={[0, 0.45, 0]} scale={[0.92, 0.12, 0.34]} />
        <Block geometry={box} material={neutral} position={[0, 0.76, 0]} scale={[0.78, 0.12, 0.3]} />
        <Block geometry={box} material={line} position={[0, 1.07, 0]} scale={[0.62, 0.12, 0.26]} />
      </>;
    case 'framework':
      return <>
        <Block geometry={box} material={accent} position={[0, 0.8, 0]} scale={[0.34, 1.08, 0.2]} />
        <Block geometry={box} material={line} position={[-0.34, 0.8, 0]} scale={[0.08, 1.28, 0.08]} />
        <Block geometry={box} material={line} position={[0.34, 0.8, 0]} scale={[0.08, 1.28, 0.08]} />
        <Block geometry={box} material={surface} position={[0, 1.42, 0]} scale={[0.82, 0.08, 0.12]} />
      </>;
    case 'sequence': {
      const xs = [-0.38, 0, 0.38];
      return <>{xs.map((x, index) => <group key={x}><Block geometry={box} material={index === 1 ? neutral : accent} position={[x, 0.52, 0]} scale={[0.24, 0.52, 0.26]} />{index < xs.length - 1 && <Connector geometry={box} material={line} start={[x + 0.13, 0.52, 0]} end={[xs[index + 1] - 0.13, 0.52, 0]} />}</group>)}</>;
    }
    case 'comparison':
      return <>
        <Block geometry={box} material={accent} position={[-0.3, 0.73, 0]} scale={[0.42, 0.92, 0.28]} />
        <Block geometry={box} material={neutral} position={[0.3, 0.73, 0]} scale={[0.42, 0.92, 0.28]} />
        <Block geometry={box} material={line} position={[0, 0.7, 0]} scale={[0.06, 1.12, 0.12]} />
      </>;
    case 'relationship':
      return <>
        <Node geometry={cylinder} material={accent} position={[-0.32, 0.72, 0]} scale={[0.18, 0.3, 0.18]} />
        <Node geometry={cylinder} material={neutral} position={[0.32, 0.72, 0]} scale={[0.18, 0.3, 0.18]} />
        <Connector geometry={box} material={line} start={[-0.16, 0.72, 0]} end={[0.16, 0.72, 0]} thickness={0.05} />
        <Ring geometry={torus} material={surface} position={[0, 0.72, 0]} scale={[0.32, 0.32, 0.32]} />
      </>;
    case 'bridge':
      return <>
        <Block geometry={box} material={accent} position={[-0.34, 0.65, 0]} scale={[0.18, 0.72, 0.24]} />
        <Block geometry={box} material={neutral} position={[0.34, 0.65, 0]} scale={[0.18, 0.72, 0.24]} />
        <Block geometry={box} material={line} position={[0, 0.95, 0]} scale={[0.6, 0.08, 0.12]} />
        <Ring geometry={torus} material={surface} position={[0, 0.56, 0]} scale={[0.25, 0.25, 0.25]} />
      </>;
    case 'network': {
      const points: [number, number, number][] = [[-0.34, 0.7, 0.12], [0.34, 0.7, 0.12], [0, 0.7, -0.3]];
      return <>
        <Node geometry={cylinder} material={alliance} position={[0, 0.8, 0]} scale={[0.22, 0.36, 0.22]} />
        {points.map((point, index) => <group key={index}><Connector geometry={box} material={line} start={[0, 0.76, 0]} end={point} /><Node geometry={cylinder} material={index === 1 ? neutral : accent} position={point} scale={[0.14, 0.24, 0.14]} /></group>)}
        <Ring geometry={torus} material={alliance} position={[0, 0.36, 0]} scale={[0.48, 0.48, 0.48]} />
      </>;
    }
    case 'parallel':
      return <>{[-0.42, -0.14, 0.14, 0.42].map((x, index) => <Block key={x} geometry={box} material={index % 2 === 0 ? accent : neutral} position={[x, 0.68, 0]} scale={[0.16, 0.88, 0.22]} />)}</>;
    default:
      return <Block geometry={box} material={accent} position={[0, 0.72, 0]} scale={[0.42, 0.9, 0.24]} />;
  }
}

export default function AcademicExhibitLayer({ station }: { station: MuseumConceptStation }) {
  const exhibit = getAcademicExhibitByStationId(station.id);
  const resources = useAcademicExhibitResources();
  if (!exhibit) return null;
  const accent = getMaterial(resources, exhibit.zoneId, 'accent');

  return (
    <group name={`academic-exhibit-${exhibit.id}`} userData={{ academicExhibitId: exhibit.id, stationId: station.id }}>
      <RenderExhibit exhibit={exhibit} resources={resources} accent={accent} />
      <ExhibitLabels exhibit={exhibit} debug={resources.debug} />
    </group>
  );
}
