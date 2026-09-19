'use client';

import { Html } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { MUSEUM_ZONE_ACCENTS } from '../data/spatial-zones';
import {
  MUSEUM_PHYSICAL_STRUCTURES,
  MUSEUM_PHYSICAL_OCCLUDERS,
  type MuseumLayoutStructure,
} from '../data/museum-layout-v2';

const DEBUG_QUERY = 'museumDebug';

function useMuseumDebugFlag() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEnabled(params.get(DEBUG_QUERY) === '1');
  }, []);
  return enabled;
}

function StructureMesh({
  structure,
  geometry,
  materials,
}: {
  structure: MuseumLayoutStructure;
  geometry: THREE.BoxGeometry;
  materials: Map<string, THREE.MeshStandardMaterial>;
}) {
  const materialKey = structure.accent === 'zone' && structure.zoneId ? structure.zoneId : structure.accent ?? 'shell';
  const material = materials.get(materialKey) ?? materials.get('shell');
  return (
    <mesh
      name={`museum-structure-${structure.id}`}
      position={structure.position}
      scale={structure.size}
      geometry={geometry}
      material={material}
      userData={{ museumCollider: structure.collidable, museumOccluder: structure.occluder, museumStructureId: structure.id }}
      dispose={null}
    />
  );
}

function DebugStructure({ structure, geometry }: { structure: MuseumLayoutStructure; geometry: THREE.BoxGeometry }) {
  return (
    <mesh position={structure.position} scale={structure.size} geometry={geometry} dispose={null}>
      <meshBasicMaterial color={structure.occluder ? '#f0aa77' : '#8ea1c5'} wireframe transparent opacity={0.65} />
    </mesh>
  );
}

function LobbyOrientation() {
  return (
    <Html center position={[0, 2.55, 3.0]} distanceFactor={5} style={{ pointerEvents: 'none' }}>
      <div className="museum-motion w-64 select-none border border-white/20 bg-[#101425]/92 px-4 py-3 text-center text-white shadow-xl backdrop-blur-sm">
        <p className="text-[10px] tracking-[0.3em] text-[#d3a06d]">SOCIALISM 360</p>
        <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/60">Explore · Interact · Understand</p>
        <div className="mt-3 grid grid-cols-7 gap-1 text-[10px] text-white/80" aria-label="Bảy khu vực học tập">
          {Array.from({ length: 7 }, (_, index) => <span key={index} className="border border-white/15 px-1 py-1">{String(index + 1).padStart(2, '0')}</span>)}
        </div>
      </div>
    </Html>
  );
}

export default function MuseumArchitectureLayer() {
  const debug = useMuseumDebugFlag();
  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const materials = useMemo(() => {
    const map = new Map<string, THREE.MeshStandardMaterial>();
    map.set('shell', new THREE.MeshStandardMaterial({ color: '#30394c', roughness: 0.82, metalness: 0.05 }));
    map.set('alliance', new THREE.MeshStandardMaterial({ color: '#81463f', roughness: 0.76, metalness: 0.08 }));
    for (const [zoneId, accent] of Object.entries(MUSEUM_ZONE_ACCENTS)) {
      map.set(zoneId, new THREE.MeshStandardMaterial({ color: accent, roughness: 0.8, metalness: 0.04 }));
    }
    return map;
  }, []);

  useEffect(() => () => {
    geometry.dispose();
    materials.forEach((material) => material.dispose());
  }, [geometry, materials]);

  return (
    <group name="museum-physical-architecture" userData={{ museumArchitectureLayer: true }}>
      {MUSEUM_PHYSICAL_STRUCTURES.map((structure) => (
        <StructureMesh key={structure.id} structure={structure} geometry={geometry} materials={materials} />
      ))}
      <LobbyOrientation />
      {debug && (
        <group name="museum-layout-debug">
          {MUSEUM_PHYSICAL_OCCLUDERS.map((structure) => <DebugStructure key={structure.id} structure={structure} geometry={geometry} />)}
          <Html position={[-3.7, 3.1, 3.6]} distanceFactor={8} style={{ pointerEvents: 'none' }}>
            <div className="rounded border border-[#d3a06d]/50 bg-[#101425]/90 px-3 py-2 text-[10px] text-white/80 shadow-lg">
              <strong className="block text-[#d3a06d]">MUSEUM DEBUG</strong>
              <span>{MUSEUM_PHYSICAL_STRUCTURES.length} structures · {MUSEUM_PHYSICAL_OCCLUDERS.length} occluders</span>
              <span className="block">?museumDebug=1</span>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}
