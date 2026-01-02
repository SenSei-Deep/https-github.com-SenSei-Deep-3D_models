
import React, { useEffect, useState } from 'react';
import { X, ShoppingCart, Sparkles, ChevronRight, ArrowLeft } from 'lucide-react';
import { Product } from '../../types';
import { getAIProductInsights } from '../../services/geminiService';

interface ProductDrawerProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({ product, onClose, onAddToCart }) => {
  const [aiInsight, setAiInsight] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setLoading(true);
      getAIProductInsights(product).then((insight) => {
        setAiInsight(insight);
        setLoading(false);
      });
    } else {
      setAiInsight("");
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#FDFBF7] shadow-2xl z-[60] transition-transform duration-500 transform ${product ? 'translate-x-0' : 'translate-x-full'} border-l border-neutral-200 overflow-y-auto`}>
      <div className="p-8">
        {/* Navigation Back Button */}
        <button 
          onClick={onClose} 
          className="mb-10 flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Back to Gallery</span>
        </button>

        <div className="space-y-8">
          <div>
            <span className="text-amber-700 text-xs font-bold uppercase tracking-widest">{product.category}</span>
            <h2 className="text-4xl font-bold text-neutral-900 mt-2 mb-4 leading-tight">{product.name}</h2>
            <p className="text-3xl font-light text-neutral-800">${product.price.toLocaleString()}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
            <h3 className="font-semibold text-neutral-800 flex items-center gap-2">
              <Sparkles className="text-amber-500" size={18} />
              AI Design Insight
            </h3>
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-neutral-100 rounded w-full"></div>
                <div className="h-4 bg-neutral-100 rounded w-3/4"></div>
              </div>
            ) : (
              <p className="text-neutral-600 leading-relaxed italic">
                "{aiInsight}"
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-neutral-900">Description</h3>
            <p className="text-neutral-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full border-2 border-neutral-300" style={{ backgroundColor: product.color }}></div>
               <span className="text-sm font-medium text-neutral-500 uppercase tracking-widest">Natural Finish</span>
            </div>
            
            <button 
              onClick={() => onAddToCart(product)}
              className="w-full bg-neutral-900 text-white py-5 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all shadow-xl hover:shadow-2xl group"
            >
              <ShoppingCart size={20} />
              Add to Cart
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-center text-xs text-neutral-400">Secure checkout with White Glove delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};
