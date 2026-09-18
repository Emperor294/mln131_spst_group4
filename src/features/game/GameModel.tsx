'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, Sky, Html } from '@react-three/drei';
import { Suspense, useCallback, useRef, useState } from 'react';
import { getMuseumZoneById } from '@/data/course';
import type { MuseumZoneId } from '@/data/course';
import CharacterController from './CharacterController';
import ObjectHighlighter from './ObjectHighlighter';
import Crosshair from './Crosshair';
import MuseumObjectDialog from '../../components/ui/museum-object-dialog';
import ConceptDialog from '@/features/museum/components/ConceptDialog';
import MuseumZoneRuntime from '@/features/museum/components/MuseumZoneRuntime';
import { getConceptStationById } from '@/features/museum/data/concept-stations';
import { createMuseumInteractionRegistry } from '@/features/museum/runtime/interaction-registry';
import type { MuseumInteractionRegistry, MuseumInteractionTarget } from '@/features/museum/runtime/interaction-registry';

const SPAWN_LOCATION = {
  x: 0,
  y: 1.7,
  z: 3,
} as const;

function MuseumModel() {
  const { scene } = useGLTF('/museum.glb');

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
    />
  );
}

function LoaderOverlayCanvas() {
  return (
    <Html center>
      <div className="flex w-80 flex-col items-center justify-center rounded-xl bg-white/90 px-8 py-6 text-center shadow-xl ring-1 ring-black/10 md:w-96">
        <div className="mb-3 h-10 w-10 animate-spin rounded-full border-3 border-red-900 border-t-transparent" />
        <div className="text-sm font-sub text-black/80">Đang tải bảo tàng 3D…</div>
      </div>
    </Html>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.1} />
    </mesh>
  );
}

function ZoneHud({ zoneId }: { zoneId: MuseumZoneId | null }) {
  const zone = zoneId ? getMuseumZoneById(zoneId) : undefined;
  if (!zone) return null;

  return (
    <div className="pointer-events-none absolute left-4 top-28 z-10 border-l-2 border-[#b23a48] bg-black/45 px-3 py-2 text-white backdrop-blur-sm">
      <span className="block text-[10px] tracking-[0.2em] text-[#d3a06d]">ZONE {zone.order.toString().padStart(2, '0')}</span>
      <strong className="mt-0.5 block text-xs font-medium tracking-[0.12em]">{zone.shortTitle}</strong>
    </div>
  );
}

function InteractionPrompt({ target }: { target: MuseumInteractionTarget | null }) {
  if (!target) return null;

  const label = target.kind === 'concept-station' ? 'Nhấn để khám phá' : 'Nhấn để xem hiện vật';
  return (
    <div aria-live="polite" className="pointer-events-none fixed left-1/2 top-[56%] z-20 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-xs text-white/85 backdrop-blur-sm">
      {label}
    </div>
  );
}

export default function MuseumExplorerScene() {
  const interactionRegistryRef = useRef<MuseumInteractionRegistry>(createMuseumInteractionRegistry());
  const [selectedObject, setSelectedObject] = useState('');
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [hoveredTarget, setHoveredTarget] = useState<MuseumInteractionTarget | null>(null);
  const [activeZoneId, setActiveZoneId] = useState<MuseumZoneId | null>(null);
  const selectedStation = selectedStationId ? getConceptStationById(selectedStationId) ?? null : null;
  const dialogOpen = Boolean(selectedObject || selectedStation);

  const handleTargetClick = useCallback((target: MuseumInteractionTarget) => {
    if (target.kind === 'concept-station') {
      setSelectedObject('');
      setSelectedStationId(target.stationId);
    } else {
      setSelectedStationId(null);
      setSelectedObject(target.meshName);
    }
  }, []);

  const handleDialogClose = useCallback(() => {
    setSelectedObject('');
    setSelectedStationId(null);
  }, []);

  const handleHoverChange = useCallback((target: MuseumInteractionTarget | null) => {
    setHoveredTarget(target);
  }, []);

  const handleZoneChange = useCallback((zoneId: MuseumZoneId | null) => {
    setActiveZoneId(zoneId);
  }, []);

  return (
    <div className="relative h-screen w-full">
      <div className="absolute left-4 top-4 z-10 rounded bg-black/50 p-3 text-white">
        <h3 className="mb-2 text-lg font-bold">Museum Explorer</h3>
        <p className="mb-1 text-sm">Click to start exploring</p>
        <p className="mb-1 text-sm">WASD - Move</p>
        <p className="mb-1 text-sm">Space - Jump</p>
        <p className="mb-1 text-sm">Mouse - Look around</p>
        <p className="text-sm">ESC - Exit</p>
      </div>

      <ZoneHud zoneId={activeZoneId} />
      <InteractionPrompt target={dialogOpen ? null : hoveredTarget} />
      <Crosshair isHoveringObject={Boolean(hoveredTarget)} />

      <Canvas
        dpr={[1, 1.5]}
        shadows={false}
        style={{ pointerEvents: dialogOpen ? 'none' : 'auto' }}
      >
        <Suspense fallback={<LoaderOverlayCanvas />}>
          <Sky
            distance={450000}
            sunPosition={[0, 1, 0]}
            inclination={0.49}
            azimuth={0.25}
            turbidity={20}
            rayleigh={0.5}
            mieCoefficient={0.005}
            mieDirectionalG={0.8}
          />

          <ambientLight intensity={0.4} color="#ff6b35" />
          <directionalLight position={[5, 10, 5]} intensity={2.0} color="#ff8c42" />
          <directionalLight position={[-3, 5, 3]} intensity={0.8} color="#ffa500" />
          <directionalLight position={[0, 2, -8]} intensity={0.6} color="#ff4500" />
          <pointLight position={[0, 3, 0]} intensity={1.2} color="#ff6b35" distance={20} decay={2} />

          <Floor />
          <MuseumModel />

          <CharacterController
            enabled={!dialogOpen}
            spawnLocation={SPAWN_LOCATION}
          />

          <MuseumZoneRuntime
            registry={interactionRegistryRef.current}
            onZoneChange={handleZoneChange}
          />

          <ObjectHighlighter
            inputEnabled={!dialogOpen}
            interactionRegistry={interactionRegistryRef.current}
            onHoverChange={handleHoverChange}
            onTargetClick={handleTargetClick}
          />
        </Suspense>
      </Canvas>

      <MuseumObjectDialog
        isOpen={Boolean(selectedObject)}
        onClose={handleDialogClose}
        objectName={selectedObject}
      />
      <ConceptDialog
        isOpen={Boolean(selectedStation)}
        onClose={handleDialogClose}
        station={selectedStation}
      />
    </div>
  );
}
