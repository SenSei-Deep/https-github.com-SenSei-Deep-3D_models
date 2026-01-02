
import React from 'react';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[70] transition-opacity"
          onClick={onClose}
        />
      )}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-white z-[80] transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-neutral-900">Your Selection</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-300">
                <Trash2 size={40} />
              </div>
              <p className="text-neutral-500">Your cart is as minimalist as our design.</p>
              <button onClick={onClose} className="text-amber-700 font-semibold underline">Continue Exploring</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + '22' }}>
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: item.color }}></div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-neutral-800">{item.name}</h3>
                    <button onClick={() => onRemove(item.id)} className="text-neutral-300 hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-neutral-500">{item.category}</p>
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-3 bg-neutral-50 px-2 py-1 rounded-md">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:text-amber-700 disabled:opacity-30" disabled={item.quantity <= 1}>
                        <Minus size={14} />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:text-amber-700">
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-bold text-neutral-800">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 bg-neutral-50 border-t border-neutral-100 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-neutral-500 text-sm">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-neutral-900">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
            </div>
            <button className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 shadow-lg group">
              Complete Order
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
