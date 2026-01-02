
export enum SceneType {
  HOME = 'HOME',
  OFFICE = 'OFFICE',
  STUDIO = 'STUDIO'
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  position: [number, number, number];
  color: string;
  scale?: [number, number, number];
  rotation?: [number, number, number];
  modelUrl?: string; // Path to .glb or .gltf file
  type: 'chair' | 'table' | 'lamp' | 'plant' | 'rug' | 'shelf' | 'sofa' | 'easel' | 'desk' | 'art';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AppState {
  currentScene: SceneType;
  cart: CartItem[];
  selectedProduct: Product | null;
  isCartOpen: boolean;
}
