
import React, { useRef, useState, useMemo, Suspense, Component, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, useGLTF, Clone } from '@react-three/drei';
import { Product } from '../../types';
import * as THREE from 'three';

/**
 * Simple Error Boundary to catch 3D loading errors
 */
class ModelErrorBoundary extends Component<{ fallback: ReactNode, children: ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any) { console.warn("3D Model load failed:", error); }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

interface FurnitureProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ExternalModel: React.FC<{ url: string }> = ({ url }) => {
  // useGLTF will throw an error if fetch fails, which is caught by ModelErrorBoundary
  const { scene } = useGLTF(url);
  
  useMemo(() => {
    if (scene) {
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          if (mesh.material) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((m) => {
              if (m && 'envMapIntensity' in m) {
                (m as any).envMapIntensity = 1.5;
              }
            });
          }
        }
      });
    }
  }, [scene]);

  return <Clone object={scene} castShadow receiveShadow />;
};

export const Furniture: React.FC<FurnitureProps> = ({ product, onClick }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (hovered && meshRef.current) {
      meshRef.current.position.y = product.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.01;
    }
  });

  const ceramicBasePath = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(0.12, 0));
    points.push(new THREE.Vector2(0.25, 0.1));
    points.push(new THREE.Vector2(0.28, 0.4));
    points.push(new THREE.Vector2(0.22, 0.7));
    points.push(new THREE.Vector2(0.1, 0.8));
    return new THREE.LatheGeometry(points, 64);
  }, []);

  const chairFramePath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.45, 0, 0.4),
      new THREE.Vector3(-0.45, 0.6, 0.4),
      new THREE.Vector3(-0.45, 0.6, -0.4),
      new THREE.Vector3(0.45, 0.6, -0.4),
      new THREE.Vector3(0.45, 0.6, 0.4),
      new THREE.Vector3(0.45, 0, 0.4),
    ]);
  }, []);

  const proceduralFallback = () => {
    switch (product.type) {
      case 'sofa':
        return (
          <group>
            <RoundedBox args={[4.5, 0.6, 1.8]} radius={0.12} smoothness={8} position={[0, 0.3, 0]} castShadow receiveShadow>
              <meshPhysicalMaterial color={product.color} roughness={1} sheen={1} sheenRoughness={0.5} sheenColor="#fff" />
            </RoundedBox>
            {[ -1.6, -0.55, 0.55, 1.6 ].map((x, i) => (
              <group key={i} position={[x, 1, -0.6]}>
                <RoundedBox args={[1.05, 0.95, 0.45]} radius={0.18} castShadow>
                   <meshPhysicalMaterial color={product.color} roughness={0.9} sheen={0.5} />
                </RoundedBox>
                <mesh position={[0, 0, 0.23]}>
                  <capsuleGeometry args={[0.015, 0.8, 4, 8]} />
                  <meshBasicMaterial color="#444" />
                </mesh>
              </group>
            ))}
          </group>
        );
      case 'table':
        return (
          <group>
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[1.2, 1.2, 0.22, 128]} />
              <meshPhysicalMaterial color={product.color} roughness={0.1} metalness={0.02} clearcoat={0.8} clearcoatRoughness={0.1} />
            </mesh>
            {[ [0.7, 0.4], [-0.7, 0.4], [0, -0.8] ].map((pos, i) => (
              <mesh key={i} position={[pos[0], 0.2, pos[1]]} castShadow>
                <cylinderGeometry args={[0.24, 0.24, 0.4, 64]} />
                <meshPhysicalMaterial color={product.color} roughness={0.3} />
              </mesh>
            ))}
          </group>
        );
      case 'chair':
        const isBoucle = product.id === 'h4';
        return (
          <group rotation={[0, isBoucle ? Math.PI / 4 : -Math.PI / 3.5, 0]}>
            <mesh castShadow>
              <tubeGeometry args={[chairFramePath, 64, 0.04, 12, false]} />
              <meshPhysicalMaterial color="#3D2B1F" roughness={0.2} clearcoat={0.5} />
            </mesh>
            <RoundedBox args={[0.85, 0.45, 0.85]} radius={0.2} position={[0, 0.4, 0]} castShadow>
              <meshPhysicalMaterial color={product.color} roughness={isBoucle ? 1.5 : 0.8} sheen={isBoucle ? 1 : 0.3} sheenColor="#ffffff" />
            </RoundedBox>
            <RoundedBox args={[0.85, 0.85, 0.25]} radius={0.25} position={[0, 0.85, -0.35]} rotation={[-0.15, 0, 0]} castShadow>
              <meshPhysicalMaterial color={product.color} roughness={1} sheen={1} />
            </RoundedBox>
          </group>
        );
      case 'lamp':
        const isTableLamp = product.id === 'h3';
        if (isTableLamp) {
          return (
            <group>
              <mesh geometry={ceramicBasePath} castShadow receiveShadow>
                <meshPhysicalMaterial color="#789B8D" roughness={1} flatShading={true} metalness={0.1} />
              </mesh>
              <group position={[0, 0.8, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.32, 0.42, 0.95, 48, 1, true]} />
                  <meshPhysicalMaterial color="#B9D1C3" roughness={1} side={THREE.DoubleSide} transparent opacity={0.98} />
                </mesh>
                <pointLight intensity={hovered ? 12 : 8} color="#fff1cc" distance={10} decay={2} castShadow position={[0, 0.2, 0]} />
              </group>
            </group>
          );
        }
        return (
          <group>
            <mesh position={[0, 2, 0]}>
              <cylinderGeometry args={[0.004, 0.004, 5]} />
              <meshPhysicalMaterial color="#111" />
            </mesh>
            <group position={[0, -0.3, 0]}>
              <mesh position={[0, -0.1, 0]}>
                <sphereGeometry args={[0.08, 32, 32]} />
                <meshStandardMaterial color="#fff" emissive="#EAB308" emissiveIntensity={10} />
              </mesh>
              <pointLight intensity={hovered ? 8 : 5} color="#fff1cc" distance={12} decay={1.8} castShadow />
            </group>
          </group>
        );
      case 'rug':
        return (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]} receiveShadow>
            <planeGeometry args={[8.5, 6.5]} />
            <meshPhysicalMaterial color={product.color} roughness={2} sheen={1} sheenColor={product.color} />
          </mesh>
        );
      default:
        return (
          <RoundedBox args={[1, 1, 1]} radius={0.1} castShadow>
            <meshPhysicalMaterial color={product.color} />
          </RoundedBox>
        );
    }
  };

  const renderGeometry = () => {
    if (product.modelUrl) {
      return (
        <ModelErrorBoundary fallback={proceduralFallback()}>
          <Suspense fallback={<RoundedBox args={[0.5, 0.5, 0.5]} radius={0.05}><meshStandardMaterial color="#ccc" transparent opacity={0.5} /></RoundedBox>}>
            <ExternalModel url={product.modelUrl} />
          </Suspense>
        </ModelErrorBoundary>
      );
    }
    return proceduralFallback();
  };

  return (
    <group
      ref={meshRef}
      position={product.position}
      scale={product.scale || [1, 1, 1]}
      rotation={product.rotation || [0, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick(product);
      }}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {renderGeometry()}
      {hovered && (
        <mesh position={[0, product.type === 'lamp' ? 1.8 : 2.5, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshBasicMaterial color="#EAB308" />
        </mesh>
      )}
    </group>
  );
};
