
import React, { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, PerspectiveCamera, Environment, ContactShadows, Float } from '@react-three/drei';
import { SceneType, Product, CartItem } from './types';
import { Navbar } from './components/UI/Navbar';
import { ProductDrawer } from './components/UI/ProductDrawer';
import { CartDrawer } from './components/UI/CartDrawer';
import { Room } from './components/3D/Room';
import * as THREE from 'three';

const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneType>(SceneType.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const cameraControlsRef = useRef<CameraControls>(null);

  // Smoothly move camera when a product is selected
  useEffect(() => {
    if (selectedProduct && cameraControlsRef.current) {
      const { position } = selectedProduct;
      cameraControlsRef.current.setLookAt(
        position[0] + 5, position[1] + 3, position[2] + 5, 
        position[0], position[1], position[2],             
        true                                               
      );
    } else if (!selectedProduct && cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(7, 5, 10, 0, 1, 0, true);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(7, 5, 10, 0, 1, 0, true);
    }
    setSelectedProduct(null);
  }, [currentScene]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="relative h-screen w-full bg-[#FDFBF7] overflow-hidden">
      <Navbar 
        currentScene={currentScene} 
        onSceneChange={setCurrentScene} 
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
      />

      {/* 3D Scene */}
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
        <Canvas 
          shadows="soft" 
          gl={{ 
            antialias: true, 
            preserveDrawingBuffer: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace 
          }}
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[7, 5, 10]} fov={35} />
            
            <CameraControls 
              ref={cameraControlsRef}
              minPolarAngle={Math.PI / 6} 
              maxPolarAngle={Math.PI / 2.1} 
              makeDefault
              dollyToCursor={true}
              infinityDolly={false}
              minDistance={4}
              maxDistance={20}
            />
            
            <Environment preset="apartment" background={false} blur={0.5} environmentIntensity={0.8} />
            
            <Float speed={1.2} rotationIntensity={0.02} floatIntensity={0.05}>
              <Room sceneType={currentScene} onProductClick={handleProductClick} />
            </Float>

            {/* Enhancing contact shadows for grounding the furniture */}
            <ContactShadows 
              opacity={0.6} 
              scale={25} 
              blur={2} 
              far={10} 
              resolution={1024} 
              color="#221100" 
            />
          </Suspense>
        </Canvas>
      </div>

      <ProductDrawer 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-400 text-[10px] font-bold tracking-widest uppercase animate-pulse pointer-events-none">
        {selectedProduct ? 'Click Back to Gallery to reset view' : 'Scroll to Zoom • Drag to Rotate • Click items to inspect'}
      </div>
    </div>
  );
};

export default App;
