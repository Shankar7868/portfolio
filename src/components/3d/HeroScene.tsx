import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingIconProps {
  position: [number, number, number];
  color: string;
  text: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ position, color, text }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle self-rotation and floating bounce
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.15;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
      </mesh>
      {/* Outer bounding wireframe sphere for hover feel */}
      <mesh>
        <sphereGeometry args={[0.45, 8, 8]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
      </mesh>
      <Html center distanceFactor={10}>
        <div 
          className="text-white font-extrabold text-[10px] md:text-xs bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border select-none transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-default"
          style={{ borderColor: `${color}40`, boxShadow: `0 0 10px ${color}20` }}
        >
          {text}
        </div>
      </Html>
    </group>
  );
};

export default function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth parallax following mouse position
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.mouse.x * Math.PI) / 8, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (state.mouse.y * Math.PI) / 8, 0.05);
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.35;
      coreRef.current.rotation.x += delta * 0.15;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y -= delta * 0.15;
      ringsRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0.3, 0, 0]} scale={1.05}>
      {/* Ambient Lights inside canvas */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[0, 0, 2]} intensity={1.2} color="#ec4899" />

      {/* Central Neural Grid Core */}
      <group ref={coreRef}>
        {/* Core Sphere */}
        <mesh>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshBasicMaterial 
            color="#8b5cf6" 
            wireframe 
            transparent 
            opacity={0.4}
          />
        </mesh>
        <mesh scale={0.97}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial 
            color="#ec4899" 
            wireframe 
            transparent 
            opacity={0.15}
          />
        </mesh>
        
        {/* Inner Solid Core */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Outer Orbiting Holographic Rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.4, 0.02, 16, 100]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
        </mesh>
        
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.8, 0.015, 16, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
        </mesh>

        <mesh rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
          <torusGeometry args={[3.2, 0.015, 16, 100]} />
          <meshBasicMaterial color="#ec4899" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Starry Dust Particles */}
      <Sparkles 
        count={60} 
        scale={6} 
        size={2.5} 
        speed={0.4} 
        color="#8b5cf6" 
      />
      <Sparkles 
        count={40} 
        scale={7} 
        size={1.8} 
        speed={0.6} 
        color="#06b6d4" 
      />

      {/* Floating Tech Badges with Coordinate Alignment */}
      <FloatingIcon position={[-2.4, 1.6, 0.8]} color="#61DAFB" text="React" />
      <FloatingIcon position={[2.4, 2.0, -0.8]} color="#FFD43B" text="Python" />
      <FloatingIcon position={[-2.8, -1.0, 0.2]} color="#0db7ed" text="Docker" />
      <FloatingIcon position={[2.2, -1.5, 1.2]} color="#EA2845" text="n8n" />
      <FloatingIcon position={[0, 2.6, -1.2]} color="#FF9900" text="AWS" />
      <FloatingIcon position={[0.6, -2.4, 0.8]} color="#10B981" text="ML/DL" />
    </group>
  );
}
