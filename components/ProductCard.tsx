'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { AddToCartButton } from '@/components/AddToCartButton';

export interface Variant {
  id: string;
  title: string;
  price: number;
  sku?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  basePrice: number;
  discountPrice?: number | null;
  images: string[];
  category: string;
  rating?: number;
  reviews?: number;
  variants?: Variant[];
  seoKeywords?: string[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasMultipleVariants =
    Boolean(product.variants) &&
    product.variants!.length > 0 &&
    !(product.variants!.length === 1 && product.variants![0].title === 'Default Title');

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    hasMultipleVariants ? product.variants![0] : null
  );

  // Determine current price based on selected variant or standard product pricing
  const currentPrice = selectedVariant
    ? selectedVariant.price
    : product.discountPrice ?? product.basePrice;

  // Format short display title for variant buttons if helpful
  const formatVariantLabel = (title: string) => {
    return title
      .replace(/ Grams?/i, 'g')
      .replace(/ Ounce/i, 'oz')
      .replace(/ Quarter Pound/i, ' QP');
  };

  return (
    <div className="group bg-white border border-neutral-200 rounded-2xl p-4 flex flex-col hover:border-[#dc2626] hover:shadow-md transition-all h-full">
      {/* Product Image & Badges */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square bg-neutral-900 rounded-xl mb-3 overflow-hidden block"
      >
        {product.category === 'vapes' ? (
          <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
            Disposable Vape
          </div>
        ) : product.discountPrice ? (
          <div className="absolute top-3 left-3 z-10 bg-amber-500 text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
            Sale
          </div>
        ) : (
          <div className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20 shadow">
            Top Shelf
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 z-0 pointer-events-none">
          <div className="w-24 h-24 bg-red-600/10 rounded-full blur-2xl"></div>
        </div>

        <Image
          src={product.images[0] || 'https://picsum.photos/seed/placeholder/800/800'}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 relative z-10"
          referrerPolicy="no-referrer"
        />
      </Link>

      {/* Card Content */}
      <div className="flex flex-col flex-grow">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(product.rating || 5)
                  ? 'text-amber-500 fill-amber-500'
                  : 'text-neutral-200'
              }`}
            />
          ))}
          <span className="text-xs text-neutral-500 ml-1 font-medium">({product.reviews || 0})</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-neutral-900 leading-tight group-hover:text-[#dc2626] transition-colors line-clamp-2 mb-2.5 min-h-[2.5rem]">
          <Link href={`/product/${product.slug}`}>{product.title}</Link>
        </h3>

        {/* Variables / Variant Selector */}
        {hasMultipleVariants && (
          <div className="mb-3.5 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 mb-1.5 uppercase tracking-wider">
              <span>Option / Weight:</span>
              <span className="text-[#dc2626] font-extrabold">{selectedVariant?.title}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.variants!.map((variant) => {
                const isSelected = selectedVariant?.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedVariant(variant);
                    }}
                    title={variant.title}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-black transition-all ${
                      isSelected
                        ? 'bg-[#dc2626] text-white border-[#dc2626] shadow-sm scale-105'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-100'
                    }`}
                  >
                    {formatVariantLabel(variant.title)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-3.5 mt-auto pt-2 border-t border-neutral-100">
          <span className="text-[#dc2626] font-mono font-extrabold text-xl">
            ${currentPrice.toFixed(2)}
          </span>
          {!selectedVariant && product.discountPrice && (
            <span className="text-neutral-400 line-through text-xs font-mono">
              ${product.basePrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add To Cart */}
        <AddToCartButton
          product={product}
          variantTitle={selectedVariant?.title}
          price={currentPrice}
          className="w-full"
        />
      </div>
    </div>
  );
}
