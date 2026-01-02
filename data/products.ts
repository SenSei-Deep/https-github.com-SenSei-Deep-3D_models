
import { Product, SceneType } from '../types';

export const SCENE_PRODUCTS: Record<SceneType, Product[]> = {
  [SceneType.HOME]: [
    {
      id: 'custom-1',
      name: 'Designer Lounge Chair',
      category: 'Furniture',
      price: 2850,
      description: 'A masterpiece of ergonomics and style, featuring advanced sheen materials. (Note: To use your own .glb file, place it in the project root and update the modelUrl below to your filename).',
      position: [-2, 0, -1],
      rotation: [0, Math.PI / 4, 0],
      scale: [2.5, 2.5, 2.5], 
      color: '#FFFFFF',
      type: 'chair',
      modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb'
    },
    {
      id: 'h1',
      name: 'Verdant Bay Sofa',
      category: 'Seating',
      price: 3200,
      description: 'A custom low-profile sofa with olive green velvet base and eclectic patterned back cushions, designed for bay window integration.',
      position: [1.5, 0, -3.5],
      color: '#6B8E23',
      type: 'sofa',
      scale: [1.3, 1, 1]
    },
    {
      id: 'h2',
      name: 'Midnight Drum Table',
      category: 'Tables',
      price: 1150,
      description: 'A chunky, sculptural coffee table in charcoal stained oak with three robust pillar legs.',
      position: [0, 0, 0],
      color: '#1A1A1A',
      type: 'table',
      scale: [1.1, 1, 1.1]
    },
    {
      id: 'h3',
      name: 'Teal Ceramic Lamp',
      category: 'Lighting',
      price: 420,
      description: 'A hand-crafted ceramic table lamp with a vibrant teal finish and a linen drum shade.',
      // Raised Y from 0.56 to 0.68 to account for the model's internal origin and the table's thickness
      position: [0.4, 1.00, 0.4],
      color: '#008080',
      type: 'lamp',
      scale: [1.2, 1.2, 1.2],
      modelUrl: 'https://lamp-red.vercel.app/models/teal_ceramic_lamp.glb'
    },
    {
      id: 'h4',
      name: 'Cloud Bouclé Lounge',
      category: 'Seating',
      price: 1450,
      description: 'A plush armchair upholstered in premium white bouclé with a warm walnut wood frame.',
      position: [-2.8, 0, 1.8],
      color: '#F3F4F6',
      type: 'chair'
    },
    {
      id: 'h6',
      name: 'Mustard Velvet Rug',
      category: 'Floor Decor',
      price: 890,
      description: 'A heavy-weight plush rug in deep mustard yellow that adds warmth and acoustic dampening.',
      position: [0, 0.01, 0.5],
      color: '#CA8A04',
      type: 'rug'
    }
  ],
  [SceneType.OFFICE]: [
    {
      id: 'o1',
      name: 'Executive Walnut Desk',
      category: 'Desks',
      price: 950,
      description: 'A spacious walnut desk with built-in cable management.',
      position: [0, 0, -1],
      color: '#5D4037',
      type: 'desk',
      scale: [1.5, 1, 1]
    },
    {
      id: 'o2',
      name: 'Ergo-Pro Chair',
      category: 'Seating',
      price: 520,
      description: 'Fully adjustable ergonomic chair with lumbar support.',
      position: [0, 0, 1],
      color: '#374151',
      type: 'chair'
    },
    {
      id: 'o3',
      name: 'Task Light',
      category: 'Lighting',
      price: 120,
      description: 'Dimmable LED task light with adjustable arm.',
      position: [1.2, 0.8, -1],
      color: '#1F2937',
      type: 'lamp',
      scale: [0.5, 0.5, 0.5]
    }
  ],
  [SceneType.STUDIO]: [
    {
      id: 's1',
      name: 'Artist Easel',
      category: 'Furniture',
      price: 180,
      description: 'Professional grade H-frame studio easel.',
      position: [0, 0, 0],
      color: '#A0522D',
      type: 'easel'
    },
    {
      id: 's2',
      name: 'Drafting Stool',
      category: 'Seating',
      price: 140,
      description: 'Height-adjustable swivel stool with footrest.',
      position: [1.5, 0, 0],
      color: '#262626',
      type: 'chair'
    },
    {
      id: 's3',
      name: 'Gallery Shelf',
      category: 'Storage',
      price: 210,
      description: 'Minimalist wall-mounted shelf for art supplies.',
      position: [-2, 1.5, -2.5],
      color: '#F9FAFB',
      type: 'shelf',
      scale: [2, 0.1, 0.4]
    }
  ]
};
