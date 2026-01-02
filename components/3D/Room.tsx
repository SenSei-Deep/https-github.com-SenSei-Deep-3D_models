
import React from 'react';
import { MeshReflectorMaterial, Environment } from '@react-three/drei';
import { Furniture } from './Furniture';
import { Product, SceneType } from '../../types';
import { SCENE_PRODUCTS } from '../../data/products';

interface RoomProps {
  sceneType: SceneType;
  onProductClick: (product: Product) => void;
}

export const Room: React.FC<RoomProps> = ({ sceneType, onProductClick }) => {
  const products = SCENE_PRODUCTS[sceneType];

  return (
    <group>
      {/* High-fidelity Reflection Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#121212"
          metalness={0.6}
        />
      </mesh>
      
      {/* Soft Architectural Walls */}
      <mesh position={[0, 5, -12]}>
        <planeGeometry args={[40, 12]} />
        <meshPhysicalMaterial color="#E6DFE1" roughness={1} metalness={0} />
      </mesh>
      
      <mesh position={[12, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[40, 12]} />
        <meshPhysicalMaterial color="#EBE4E6" roughness={1} metalness={0} />
      </mesh>

      {/* Render High-Detail Furniture */}
      {products.map((product) => (
        <Furniture key={product.id} product={product} onClick={onProductClick} />
      ))}

      {/* Lighting Suite */}
      <ambientLight intensity={0.4} />
      
      {/* Main Studio Spotlight */}
      <spotLight
        position={[20, 25, 20]}
        angle={0.25}
        penumbra={1}
        intensity={3}
        castShadow
        shadow-bias={-0.00005}
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Warm Side Light */}
      <pointLight position={[-10, 8, 10]} intensity={1.5} color="#fff1cc" />
      
      {/* Fill Light for Shadows */}
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#dbeafe" />

      {/* Professional environment for realistic PBR reflections */}
      <Environment preset="apartment" environmentIntensity={1.5} />
    </group>
  );
};
