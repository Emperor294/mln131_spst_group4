'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, Sky, Html } from '@react-three/drei';
import { Suspense, useCallback, useState } from 'react';
import CharacterController from './CharacterController';
import ObjectHighlighter from './ObjectHighlighter';
import Crosshair from './Crosshair';
import MuseumObjectDialog from '../../components/ui/museum-object-dialog';

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

export default function MuseumExplorerScene() {
  const [objectDialogOpen, setObjectDialogOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState('');
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);

  const handleObjectClick = useCallback((objectName: string) => {
    setSelectedObject(objectName);
    setObjectDialogOpen(true);
  }, []);

  const handleObjectDialogClose = useCallback(() => {
    setObjectDialogOpen(false);
    setSelectedObject('');
  }, []);

  const handleHoverChange = useCallback((objectName: string | null) => {
    setHoveredObject(objectName);
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

      <Crosshair isHoveringObject={Boolean(hoveredObject)} />

      <Canvas
        dpr={[1, 1.5]}
        shadows={false}
        style={{ pointerEvents: objectDialogOpen ? 'none' : 'auto' }}
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
            enabled={!objectDialogOpen}
            spawnLocation={SPAWN_LOCATION}
          />

          <ObjectHighlighter
            inputEnabled={!objectDialogOpen}
            onHoverChange={handleHoverChange}
            onObjectClick={handleObjectClick}
          />
        </Suspense>
      </Canvas>

      <MuseumObjectDialog
        isOpen={objectDialogOpen}
        onClose={handleObjectDialogClose}
        objectName={selectedObject}
      />
    </div>
  );
}
