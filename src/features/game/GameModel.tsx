'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, Html, useProgress } from '@react-three/drei';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { getMuseumZoneById } from '@/data/course';
import type { MuseumZoneId } from '@/data/course';
import CharacterController from './CharacterController';
import ObjectHighlighter from './ObjectHighlighter';
import Crosshair from './Crosshair';
import MuseumObjectDialog from '../../components/ui/museum-object-dialog';
import ConceptDialog from '@/features/museum/components/ConceptDialog';
import MuseumArchitectureLayer from '@/features/museum/components/MuseumArchitectureLayer';
import MuseumLighting from '@/features/museum/components/MuseumLighting';
import MuseumZoneRuntime from '@/features/museum/components/MuseumZoneRuntime';
import { MUSEUM_VISUAL_THEME } from '@/features/museum/theme/museum-visual-theme';
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
  const { progress } = useProgress();
  const percent = Math.round(progress);

  return (
    <Html center>
      <div className="w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-white/15 bg-[#101425]/95 px-6 py-6 text-white shadow-2xl backdrop-blur-sm">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#d3a06d]">SOCIALISM 360</p>
        <p className="mt-2 text-sm text-white/80">Đang chuẩn bị không gian bảo tàng…</p>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
          <div className="h-full bg-[#c76c53] transition-[width] duration-200" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-2 text-right text-xs tabular-nums text-white/55" role="status" aria-live="polite">{percent}%</p>
      </div>
    </Html>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial
        color={MUSEUM_VISUAL_THEME.colors.floor}
        roughness={0.9}
        metalness={0.04}
      />
    </mesh>
  );
}

function ZoneHud({ zoneId }: { zoneId: MuseumZoneId | null }) {
  const zone = zoneId ? getMuseumZoneById(zoneId) : undefined;
  if (!zone) return null;

  return (
    <div
      className="museum-motion pointer-events-none absolute left-4 top-28 z-10 border-l-2 px-3 py-2 text-white shadow-lg backdrop-blur-sm transition-opacity duration-300"
      style={{ backgroundColor: 'rgba(11, 16, 32, 0.9)', borderLeftColor: MUSEUM_VISUAL_THEME.colors.interaction }}
    >
      <span className="block text-[10px] tracking-[0.2em]" style={{ color: MUSEUM_VISUAL_THEME.colors.interaction }}>ZONE {zone.order.toString().padStart(2, '0')}</span>
      <strong className="mt-0.5 block text-xs font-medium tracking-[0.12em]">{zone.shortTitle}</strong>
    </div>
  );
}

function ZoneEntryToast({ zoneId, visible }: { zoneId: MuseumZoneId | null; visible: boolean }) {
  const zone = zoneId ? getMuseumZoneById(zoneId) : undefined;
  if (!zone) return null;

  return (
    <div
      className={`museum-motion pointer-events-none fixed left-1/2 top-24 z-20 -translate-x-1/2 border border-white/20 px-4 py-2 text-center text-white shadow-xl backdrop-blur-sm transition-[opacity,transform] duration-300 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'}`}
      style={{ backgroundColor: 'rgba(11, 16, 32, 0.94)' }}
      role="status"
      aria-live="polite"
    >
      <span className="block text-[10px] tracking-[0.24em]" style={{ color: MUSEUM_VISUAL_THEME.colors.interaction }}>ZONE {zone.order.toString().padStart(2, '0')}</span>
      <strong className="mt-0.5 block text-xs font-medium tracking-[0.12em]">{zone.shortTitle}</strong>
    </div>
  );
}

function InteractionPrompt({ target }: { target: MuseumInteractionTarget | null }) {
  if (!target) return null;

  const label = target.kind === 'concept-station' ? 'Khám phá' : 'Xem hiện vật';
  return (
    <div aria-live="polite" className="museum-motion pointer-events-none fixed left-1/2 top-[56%] z-20 -translate-x-1/2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur-sm transition-transform duration-150" style={{ backgroundColor: 'rgba(11, 16, 32, 0.94)', borderColor: MUSEUM_VISUAL_THEME.colors.interaction, color: MUSEUM_VISUAL_THEME.colors.labelText }}>
      {label}
    </div>
  );
}

function MuseumOnboarding({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="absolute left-4 top-4 z-30 w-[min(19rem,calc(100vw-2rem))] border border-white/20 p-4 text-white shadow-2xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(11, 16, 32, 0.96)' }} role="dialog" aria-label="Hướng dẫn khám phá bảo tàng">
      <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: MUSEUM_VISUAL_THEME.colors.interaction }}>SOCIALISM 360</p>
      <h1 className="mt-2 text-lg font-medium tracking-tight">Bước vào không gian học tập</h1>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/75">
        <span><strong className="text-white">WASD</strong><br />Di chuyển</span>
        <span><strong className="text-white">Space</strong><br />Nhảy</span>
        <span><strong className="text-white">Chuột</strong><br />Quan sát / tương tác</span>
        <span><strong className="text-white">Esc</strong><br />Thoát con trỏ</span>
      </div>
      <p className="mt-3 text-xs leading-5 text-white/75">Nhấn vào không gian để bắt đầu khám phá.</p>
      <button
        type="button"
        onClick={onDismiss}
        className="mt-3 rounded-full border px-3 py-1.5 text-xs text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2"
        style={{ borderColor: MUSEUM_VISUAL_THEME.colors.interaction, outlineColor: MUSEUM_VISUAL_THEME.colors.interaction }}
      >
        Đã hiểu
      </button>
    </div>
  );
}

export default function MuseumExplorerScene() {
  const interactionRegistryRef = useRef<MuseumInteractionRegistry>(createMuseumInteractionRegistry());
  const [selectedObject, setSelectedObject] = useState('');
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [hoveredTarget, setHoveredTarget] = useState<MuseumInteractionTarget | null>(null);
  const [activeZoneId, setActiveZoneId] = useState<MuseumZoneId | null>(null);
  const [zoneToastId, setZoneToastId] = useState<MuseumZoneId | null>(null);
  const [zoneToastVisible, setZoneToastVisible] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const zoneToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const zoneToastRemoveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedStation = selectedStationId ? getConceptStationById(selectedStationId) ?? null : null;
  const dialogOpen = Boolean(selectedObject || selectedStation);

  useEffect(() => () => {
    if (zoneToastTimerRef.current) clearTimeout(zoneToastTimerRef.current);
    if (zoneToastRemoveTimerRef.current) clearTimeout(zoneToastRemoveTimerRef.current);
  }, []);

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
    if (zoneToastTimerRef.current) clearTimeout(zoneToastTimerRef.current);
    if (zoneToastRemoveTimerRef.current) clearTimeout(zoneToastRemoveTimerRef.current);
    if (!zoneId) {
      setZoneToastVisible(false);
      setZoneToastId(null);
      return;
    }

    setZoneToastId(zoneId);
    setZoneToastVisible(true);
    zoneToastTimerRef.current = setTimeout(() => setZoneToastVisible(false), 1500);
    zoneToastRemoveTimerRef.current = setTimeout(() => setZoneToastId(null), 1900);
  }, []);

  return (
    <div className="relative h-screen w-full">
      {showOnboarding && !dialogOpen && <MuseumOnboarding onDismiss={() => setShowOnboarding(false)} />}

      {!dialogOpen && <ZoneHud zoneId={activeZoneId} />}
      {!dialogOpen && <ZoneEntryToast zoneId={zoneToastId} visible={zoneToastVisible} />}
      <InteractionPrompt target={dialogOpen ? null : hoveredTarget} />
      {!dialogOpen && <Crosshair interactionKind={hoveredTarget?.kind ?? null} />}

      <Canvas
        dpr={[1, 1.5]}
        shadows={false}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = MUSEUM_VISUAL_THEME.lighting.exposure;
        }}
        style={{ pointerEvents: dialogOpen ? 'none' : 'auto' }}
      >
        <Suspense fallback={<LoaderOverlayCanvas />}>
          <MuseumLighting />

          <Floor />
          <MuseumModel />
          <MuseumArchitectureLayer />

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
