'use client';

import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    basePrice: number;
    discountPrice?: number | null;
    images: string[];
    slug: string;
  };
  variantTitle?: string;
  price?: number;
  className?: string;
  showText?: boolean;
}

export function AddToCartButton({
  product,
  variantTitle,
  price,
  className = '',
  showText = true,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const finalPrice = price ?? product.discountPrice ?? product.basePrice;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      title: product.title,
      price: finalPrice,
      image: product.images[0] || 'https://picsum.photos/seed/placeholder/800/800',
      variantTitle,
      slug: product.slug,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      onClick={handleClick}
      className={`py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
        added
          ? 'bg-emerald-600 text-white shadow-md'
          : 'bg-neutral-900 text-white hover:bg-[#dc2626] shadow-sm'
      } ${className}`}
    >
      {added ? (
        <>
          <Check className="w-4 h-4" />
          {showText && 'Added to Cart'}
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          {showText && 'Add to Cart'}
        </>
      )}
    </button>
  );
}
