import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vantablack = new THREE.Color(0x000000);

// Expanded food emojis array
const foodEmojis = ['🍔', '🍕', '🌮', '🍗', '🥘', '🍲'];

const FoodParticle = ({ position }: { position: [number, number, number] }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const emoji = useMemo(() => foodEmojis[Math.floor(Math.random() * foodEmojis.length)], []);

  // Oscillating and moving effect
  useFrame((state) => {
    const { elapsedTime } = state.clock;
    const { x, y, z } = mesh.current.position;

    // Increase vertical oscillating motion for greater effect
    mesh.current.position.y = y + Math.sin(elapsedTime * 2 + x) * 0.03;

    // Add horizontal oscillation for dynamic movement in x and z directions
    mesh.current.position.x = x + Math.sin(elapsedTime + z) * 0.02;
    mesh.current.position.z = z + Math.cos(elapsedTime + x) * 0.02;

    // Billboard effect to make emojis always face the camera
    mesh.current.lookAt(state.camera.position);
  });

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[1.5, 1.5]} />
      <meshStandardMaterial transparent>
        <canvasTexture
          attach="map"
          image={(() => {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d')!;
            ctx.font = '48px serif';
            ctx.fillText(emoji, 8, 52);
            return canvas;
          })()}
        />
      </meshStandardMaterial>
    </mesh>
  );
};

interface FoodDoodleProps {
  className?: string;
}

const FoodDoodle: React.FC<FoodDoodleProps> = ({ className }) => {
  // Function to evenly distribute particles using a grid layout
  const particles = useMemo(() => {
    const particlesArray = [];
    const gridSize = 10; // Adjust grid size to control spread across screen

    for (let x = -gridSize; x <= gridSize; x += 2) {
      for (let y = -gridSize; y <= gridSize; y += 2) {
        const z = Math.random() * 15 - 7.5; // Random depth for more realism
        particlesArray.push({ position: [x, y, z] as [number, number, number] });
      }
    }
    return particlesArray;
  }, []);

  return (
    <Canvas 
      camera={{ position: [0, 0, 25], fov: 60 }}
      style={{ background: vantablack.getStyle() }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 10]} intensity={0.6} />
      
      {/* Render each particle with increased motion and even distribution */}
      {particles.map((props, i) => (
        <FoodParticle key={i} {...props} />
      ))}
    </Canvas>
  );
};

export default FoodDoodle;
