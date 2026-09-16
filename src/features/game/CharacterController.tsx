'use client';

import { useRef, useEffect, useState } from 'react';
import type { ComponentRef } from 'react';
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

export default function CharacterController({ enabled = true, spawnLocation }: Props) {
  const { camera, scene } = useThree();
  const controlsRef = useRef<ComponentRef<typeof PointerLockControls>>(null);
  const velocityRef = useRef(new THREE.Vector3());
  const [isLocked, setIsLocked] = useState(false);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;
  
  // References to collision meshes
  const collisionMeshesRef = useRef<THREE.Mesh[]>([]);
  const raycasterRef = useRef(new THREE.Raycaster());

  // Movement speed
  const MOVEMENT_SPEED = 3;
  const JUMP_SPEED = 6;
  const GRAVITY = 20;

  // Key states
  const keysRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  // Physics state
  const physicsRef = useRef({
    onGround: true,
    verticalVelocity: 0,
    groundLevel: 1.7,
  });

  // Find collision meshes in the scene
  const findCollisionMeshes = () => {
    const collisionMeshNames = ['Plane042_Material_0', 'Plane057_Material_0', 'Plane059_Material_0', 'Plane058_Material_0'];
    const meshes: THREE.Mesh[] = [];
    
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && collisionMeshNames.includes(child.name)) {
        meshes.push(child);
        console.log(`Found collision mesh: ${child.name}`, child.position);
      }
    });
    
    collisionMeshesRef.current = meshes;
    console.log(`Total collision meshes found: ${meshes.length}`);
  };

  // Mesh-based collision detection using raycasting
  const checkCollision = (newX: number, newZ: number) => {
    if (collisionMeshesRef.current.length === 0) return false;
    
    const currentPos = camera.position.clone();
    const newPos = new THREE.Vector3(newX, currentPos.y, newZ);
    
    // Create a ray from current position to new position
    const direction = newPos.sub(currentPos).normalize();
    const distance = currentPos.distanceTo(newPos);
    
    raycasterRef.current.set(currentPos, direction);
    const intersects = raycasterRef.current.intersectObjects(collisionMeshesRef.current, true);
    
    // Check if any intersection is closer than our movement distance
    for (const intersect of intersects) {
      if (intersect.distance < distance) { // Add small buffer
        return true; // Collision detected
      }
    }
    
    return false; // No collision
  };

  // Initialize spawn location
  useEffect(() => {
    if (spawnLocation) {
      camera.position.set(
        spawnLocation.x ?? 0,
        spawnLocation.y ?? physicsRef.current.groundLevel,
        spawnLocation.z ?? 0
      );
    }
  }, [spawnLocation, camera]);

  // Find collision meshes when scene is loaded
  useEffect(() => {
    // Wait a bit for the scene to load, then find collision meshes
    const timer = setTimeout(() => {
      findCollisionMeshes();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [scene]);

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
          if (physicsRef.current.onGround) {
            keysRef.current.jump = true;
            physicsRef.current.verticalVelocity = JUMP_SPEED;
            physicsRef.current.onGround = false;
          }
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!enabledRef.current) return;
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
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };

    
  }, []);

  useEffect(() => {
    if (!enabled) {
      try {
        controlsRef.current?.unlock?.();
      } catch {}
      setIsLocked(false);
    }
  }, [enabled]);

  useFrame((_, delta) => {
    if (!isLocked || !enabledRef.current) return;

    const keys = keysRef.current;
    const velocity = velocityRef.current;
    const physics = physicsRef.current;

    // Reset horizontal velocity only
    velocity.x = 0;
    velocity.z = 0;

    // Get camera direction vectors
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    
    // Create right vector (perpendicular to camera direction)
    const cameraRight = new THREE.Vector3();
    cameraRight.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();

    // Calculate horizontal movement direction relative to camera
    if (keys.forward) {
      velocity.add(cameraDirection.clone().multiplyScalar(MOVEMENT_SPEED));
    }
    if (keys.backward) {
      velocity.add(cameraDirection.clone().multiplyScalar(-MOVEMENT_SPEED));
    }
    if (keys.right) {
      velocity.add(cameraRight.clone().multiplyScalar(MOVEMENT_SPEED));
    }
    if (keys.left) {
      velocity.add(cameraRight.clone().multiplyScalar(-MOVEMENT_SPEED));
    }

    // Check for collisions before applying movement
    const newX = camera.position.x + velocity.x * delta;
    const newZ = camera.position.z + velocity.z * delta;
    
    // Only apply movement if no collision is detected
    if (!checkCollision(newX, camera.position.z)) {
      camera.position.x = newX;
    }
    if (!checkCollision(camera.position.x, newZ)) {
      camera.position.z = newZ;
    }

    // Apply gravity and jumping physics (vertical only)
    if (!physics.onGround) {
      physics.verticalVelocity -= GRAVITY * delta;
      camera.position.y += physics.verticalVelocity * delta;
    }

    // Check if landed on ground
    if (camera.position.y <= physics.groundLevel) {
      camera.position.y = physics.groundLevel;
      physics.verticalVelocity = 0;
      physics.onGround = true;
    }
  });

  const handleLock = () => {
    setIsLocked(true);
  };

  const handleUnlock = () => {
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
