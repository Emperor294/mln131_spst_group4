'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ComponentRef, MutableRefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

type Props = {
  enabled?: boolean;
  spawnLocation?: {
    x?: number;
    y?: number;
    z?: number;
  };
};

const COLLISION_MESH_NAMES = [
  'Plane042_Material_0',
  'Plane057_Material_0',
  'Plane059_Material_0',
  'Plane058_Material_0',
] as const;

const MOVEMENT_SPEED = 3;
const JUMP_SPEED = 6;
const GRAVITY = 20;
const COLLISION_BUFFER = 0.05;
const WORLD_UP = new THREE.Vector3(0, 1, 0);

export default function CharacterController({ enabled = true, spawnLocation }: Props) {
  const { camera, scene } = useThree();
  const controlsRef = useRef<ComponentRef<typeof PointerLockControls>>(null);
  const [isLocked, setIsLocked] = useState(false);
  const enabledRef = useRef(enabled);
  const collisionMeshesRef = useRef<THREE.Mesh[]>([]);
  const collisionIntersectionsRef = useRef<THREE.Intersection[]>([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const velocityRef = useRef(new THREE.Vector3());
  const movementDirectionRef = useRef(new THREE.Vector3());
  const cameraDirectionRef = useRef(new THREE.Vector3());
  const cameraRightRef = useRef(new THREE.Vector3());
  const currentPositionRef = useRef(new THREE.Vector3());
  const desiredPositionRef = useRef(new THREE.Vector3());
  const resolvedPositionRef = useRef(new THREE.Vector3());
  const collisionCandidateRef = useRef(new THREE.Vector3());
  const collisionDeltaRef = useRef(new THREE.Vector3());
  const collisionDirectionRef = useRef(new THREE.Vector3());

  const keysRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  const physicsRef = useRef({
    onGround: true,
    verticalVelocity: 0,
    groundLevel: 1.7,
  });

  enabledRef.current = enabled;

  const clearMovementKeys = useCallback(() => {
    keysRef.current.forward = false;
    keysRef.current.backward = false;
    keysRef.current.left = false;
    keysRef.current.right = false;
    keysRef.current.jump = false;
  }, []);

  const findCollisionMeshes = useCallback(() => {
    const meshes: THREE.Mesh[] = [];

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && COLLISION_MESH_NAMES.includes(child.name as (typeof COLLISION_MESH_NAMES)[number])) {
        meshes.push(child);
      }
    });

    collisionMeshesRef.current = meshes;
  }, [scene]);

  useEffect(() => {
    findCollisionMeshes();
  }, [findCollisionMeshes]);

  useEffect(() => {
    if (!spawnLocation) return;

    camera.position.set(
      spawnLocation.x ?? 0,
      spawnLocation.y ?? physicsRef.current.groundLevel,
      spawnLocation.z ?? 0,
    );
  }, [camera, spawnLocation]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!enabledRef.current) return;

      switch (event.code) {
        case 'KeyW':
          keysRef.current.forward = true;
          break;
        case 'KeyS':
          keysRef.current.backward = true;
          break;
        case 'KeyA':
          keysRef.current.left = true;
          break;
        case 'KeyD':
          keysRef.current.right = true;
          break;
        case 'Space':
          if (!event.repeat && physicsRef.current.onGround) {
            keysRef.current.jump = true;
            physicsRef.current.verticalVelocity = JUMP_SPEED;
            physicsRef.current.onGround = false;
          }
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          keysRef.current.forward = false;
          break;
        case 'KeyS':
          keysRef.current.backward = false;
          break;
        case 'KeyA':
          keysRef.current.left = false;
          break;
        case 'KeyD':
          keysRef.current.right = false;
          break;
        case 'Space':
          keysRef.current.jump = false;
          break;
        default:
          break;
      }
    };

    const handleWindowBlur = () => {
      clearMovementKeys();
      controlsRef.current?.unlock?.();
      setIsLocked(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') handleWindowBlur();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearMovementKeys();
    };
  }, [clearMovementKeys]);

  useEffect(() => {
    if (!enabled) {
      clearMovementKeys();
      controlsRef.current?.unlock?.();
      setIsLocked(false);
    }
  }, [clearMovementKeys, enabled]);

  useFrame((_, delta) => {
    if (!isLocked || !enabledRef.current) return;

    const frameDelta = Math.min(delta, 0.05);
    const keys = keysRef.current;
    const velocity = velocityRef.current;
    const movementDirection = movementDirectionRef.current;
    const physics = physicsRef.current;

    camera.getWorldDirection(cameraDirectionRef.current);
    const cameraDirection = cameraDirectionRef.current;
    cameraDirection.y = 0;
    if (cameraDirection.lengthSq() > 0) cameraDirection.normalize();

    const cameraRight = cameraRightRef.current;
    cameraRight.crossVectors(cameraDirection, WORLD_UP).normalize();

    movementDirection.set(0, 0, 0);
    if (keys.forward) movementDirection.add(cameraDirection);
    if (keys.backward) movementDirection.sub(cameraDirection);
    if (keys.right) movementDirection.add(cameraRight);
    if (keys.left) movementDirection.sub(cameraRight);

    if (movementDirection.lengthSq() > 0) movementDirection.normalize();
    velocity.copy(movementDirection).multiplyScalar(MOVEMENT_SPEED);

    const currentPosition = currentPositionRef.current.copy(camera.position);
    const desiredPosition = desiredPositionRef.current.copy(currentPosition);
    desiredPosition.x += velocity.x * frameDelta;
    desiredPosition.z += velocity.z * frameDelta;

    // Resolve horizontal movement on each axis from the latest resolved position.
    // Desired and resolved positions remain separate so collision checks never
    // mutate values used by subsequent distance calculations.
    const resolvedPosition = resolvedPositionRef.current.copy(currentPosition);
    const collisionCandidate = collisionCandidateRef.current.copy(resolvedPosition);

    collisionCandidate.x = desiredPosition.x;
    if (!isPathBlocked(
      resolvedPosition,
      collisionCandidate,
      collisionMeshesRef,
      raycasterRef,
      collisionIntersectionsRef,
      collisionDeltaRef,
      collisionDirectionRef,
    )) {
      resolvedPosition.x = desiredPosition.x;
    }

    collisionCandidate.copy(resolvedPosition);
    collisionCandidate.z = desiredPosition.z;
    if (!isPathBlocked(
      resolvedPosition,
      collisionCandidate,
      collisionMeshesRef,
      raycasterRef,
      collisionIntersectionsRef,
      collisionDeltaRef,
      collisionDirectionRef,
    )) {
      resolvedPosition.z = desiredPosition.z;
    }

    camera.position.x = resolvedPosition.x;
    camera.position.z = resolvedPosition.z;

    if (!physics.onGround) {
      physics.verticalVelocity -= GRAVITY * frameDelta;
      camera.position.y += physics.verticalVelocity * frameDelta;
    }

    if (camera.position.y <= physics.groundLevel) {
      camera.position.y = physics.groundLevel;
      physics.verticalVelocity = 0;
      physics.onGround = true;
    }
  });

  const handleLock = () => setIsLocked(true);
  const handleUnlock = () => {
    clearMovementKeys();
    setIsLocked(false);
  };

  return (
    <PointerLockControls
      ref={controlsRef}
      onLock={handleLock}
      onUnlock={handleUnlock}
      enabled={enabled}
    />
  );
}

function isPathBlocked(
  start: THREE.Vector3,
  end: THREE.Vector3,
  collisionMeshesRef: MutableRefObject<THREE.Mesh[]>,
  raycasterRef: MutableRefObject<THREE.Raycaster>,
  intersectionsRef: MutableRefObject<THREE.Intersection[]>,
  deltaRef: MutableRefObject<THREE.Vector3>,
  directionRef: MutableRefObject<THREE.Vector3>,
) {
  if (collisionMeshesRef.current.length === 0) return false;

  const delta = deltaRef.current.copy(end).sub(start);
  const distance = delta.length();
  if (distance <= Number.EPSILON) return false;

  const direction = directionRef.current.copy(delta).multiplyScalar(1 / distance);
  raycasterRef.current.set(start, direction);

  const intersections = intersectionsRef.current;
  intersections.length = 0;
  raycasterRef.current.intersectObjects(collisionMeshesRef.current, true, intersections);
  const blocked = intersections.some((intersection) => intersection.distance <= distance + COLLISION_BUFFER);
  intersections.length = 0;
  return blocked;
}
