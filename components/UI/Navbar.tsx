
import React from 'react';
import { ShoppingBag, LayoutGrid, Sofa, Laptop, PenTool } from 'lucide-react';
import { SceneType } from '../../types';

interface NavbarProps {
  currentScene: SceneType;
  onSceneChange: (scene: SceneType) => void;
  onCartToggle: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentScene, 
  onSceneChange, 
  onCartToggle,
  cartCount 
}) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
      <div className="pointer-events-auto">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-800 uppercase">Aura<span className="font-light">Home</span></h1>
      </div>

      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-full px-2 py-1 flex gap-1 shadow-sm border border-neutral-100">
          <button 
            onClick={() => onSceneChange(SceneType.HOME)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${currentScene === SceneType.HOME ? 'bg-neutral-800 text-white' : 'hover:bg-neutral-100 text-neutral-600'}`}
          >
            <Sofa size={18} />
            <span className="text-sm font-medium hidden sm:block">Home</span>
          </button>
          <button 
            onClick={() => onSceneChange(SceneType.OFFICE)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${currentScene === SceneType.OFFICE ? 'bg-neutral-800 text-white' : 'hover:bg-neutral-100 text-neutral-600'}`}
          >
            <Laptop size={18} />
            <span className="text-sm font-medium hidden sm:block">Office</span>
          </button>
          <button 
            onClick={() => onSceneChange(SceneType.STUDIO)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${currentScene === SceneType.STUDIO ? 'bg-neutral-800 text-white' : 'hover:bg-neutral-100 text-neutral-600'}`}
          >
            <PenTool size={18} />
            <span className="text-sm font-medium hidden sm:block">Studio</span>
          </button>
        </div>

        <button 
          onClick={onCartToggle}
          className="relative bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all text-neutral-700 border border-neutral-100"
        >
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
