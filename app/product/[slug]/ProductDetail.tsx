'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, ShieldCheck, Truck, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '@/context/CartContext';

interface Variant {
  id: string;
  title: string;
  price: number;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  basePrice: number;
  discountPrice: number | null;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  variants: Variant[];
  seoKeywords?: string[];
}

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const currentPrice = selectedVariant ? selectedVariant.price : (product.discountPrice || product.basePrice);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: currentPrice,
      quantity: quantity,
      image: product.images[0] || 'https://picsum.photos/seed/placeholder/800/800',
      variantTitle: selectedVariant?.title,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-12 relative">
        <div className="w-full lg:w-1/2">
          <div className="relative aspect-square bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-neutral-100 text-neutral-600 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 mb-4">{product.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-red-500 fill-red-500' : 'text-neutral-300'}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-neutral-500">{product.reviews} Reviews</span>
            </div>
            <div className="text-3xl font-black text-neutral-900 mb-6">
              ${currentPrice.toFixed(2)}
            </div>
            <p className="text-neutral-600 leading-relaxed font-medium mb-6 whitespace-pre-line">
              {product.description}
            </p>

            {product.seoKeywords && product.seoKeywords.length > 0 && (
              <div className="mb-8 pt-4 border-t border-neutral-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">Related Strain Topics & Keywords</h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.seoKeywords.map((tag, idx) => (
                    <span key={idx} className="bg-neutral-100 text-neutral-600 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-neutral-200 hover:border-red-300 hover:text-red-600 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {product.variants && product.variants.length > 1 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-3">Select Option</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 border rounded-md font-medium text-sm transition-colors ${
                      selectedVariant?.id === v.id
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-neutral-200 text-neutral-600 hover:border-red-300'
                    }`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-3">Quantity</h3>
            <div className="flex items-center border border-neutral-200 rounded-md w-max">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-neutral-500 hover:text-neutral-900 transition-colors font-medium">-</button>
              <span className="px-4 py-2 text-neutral-900 font-bold border-x border-neutral-200 min-w-[3rem] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-neutral-500 hover:text-neutral-900 transition-colors font-medium">+</button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-md font-bold text-lg flex items-center justify-center gap-3 transition-all ${
              added ? 'bg-green-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
            }`}
          >
            {added ? <CheckCircle className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
            {added ? 'Added to Cart' : 'Add to Cart'}
          </button>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-8">
            <div className="flex items-center gap-3 text-neutral-600">
              <Truck className="w-5 h-5 text-neutral-400" />
              <span className="text-sm font-medium">Fast & Discreet Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-600">
              <ShieldCheck className="w-5 h-5 text-neutral-400" />
              <span className="text-sm font-medium">100% Lab Tested</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Add to Cart Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] transform-gpu"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <div className="w-12 h-12 relative rounded-md overflow-hidden bg-neutral-100 flex-shrink-0">
              <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 truncate max-w-xs">{product.title}</h4>
              <p className="text-red-600 font-bold">${currentPrice.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="hidden sm:flex items-center border border-neutral-200 rounded-md">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 text-neutral-500 hover:text-neutral-900 font-medium">-</button>
              <span className="px-3 py-1 text-neutral-900 font-bold border-x border-neutral-200 text-sm min-w-[2.5rem] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 text-neutral-500 hover:text-neutral-900 font-medium">+</button>
            </div>
            
            <button
              onClick={handleAddToCart}
              className={`flex-1 sm:flex-none px-8 py-3 rounded-md font-bold flex items-center justify-center gap-2 transition-all ${
                added ? 'bg-green-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white shadow-md'
              }`}
            >
              {added ? <CheckCircle className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
              {added ? 'Added' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
