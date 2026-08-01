'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Search, Filter } from 'lucide-react';
import { AddToCartButton } from '@/components/AddToCartButton';

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
}

interface ShopCatalogProps {
  initialProducts: Product[];
}

const CATEGORY_NAMES: Record<string, string> = {
  All: 'All Products',
  flower: 'Premium Flower',
  vapes: 'Disposables & Vapes',
  shake: 'THCa Shake',
  trim: 'THCa Trim',
};

function ShopCatalogContent({ initialProducts }: ShopCatalogProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams ? searchParams.get('category') : null;

  const [products] = useState<Product[]>(initialProducts);

  // Compute selected category derived from searchParam if present, otherwise user selection
  const [userSelectedCategory, setUserSelectedCategory] = useState<string | null>(null);

  const activeCategory = useMemo(() => {
    if (userSelectedCategory) return userSelectedCategory;
    if (categoryParam) {
      const normalizedParam = categoryParam.toLowerCase();
      if (normalizedParam.includes('vape') || normalizedParam.includes('disposable')) {
        return 'vapes';
      } else if (normalizedParam.includes('flower')) {
        return 'flower';
      } else if (normalizedParam.includes('shake')) {
        return 'shake';
      } else if (normalizedParam.includes('trim')) {
        return 'trim';
      } else if (products.some(p => p.category.toLowerCase() === normalizedParam)) {
        return categoryParam;
      }
    }
    return 'All';
  }, [userSelectedCategory, categoryParam, products]);

  const setActiveCategory = (cat: string) => {
    setUserSelectedCategory(cat);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const rawCategories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    // Sort
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => (a.discountPrice || a.basePrice) - (b.discountPrice || b.basePrice));
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => (b.discountPrice || b.basePrice) - (a.discountPrice || a.basePrice));
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className="flex flex-col lg:flex-row gap-12 relative z-10">
      {/* Sidebar Filters */}
      <div className="w-full lg:w-64 flex-shrink-0 space-y-10">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <h3 className="text-neutral-900 font-bold tracking-tight mb-6 flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#dc2626]" /> Categories
          </h3>
          <ul className="space-y-3">
            {rawCategories.map(category => {
              const displayName = CATEGORY_NAMES[category] || category;
              const isSelected = activeCategory.toLowerCase() === category.toLowerCase();
              const count = category === 'All' 
                ? products.length 
                : products.filter(p => p.category.toLowerCase() === category.toLowerCase()).length;

              return (
                <li key={category}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className={`text-sm transition-all w-full text-left flex justify-between items-center py-1 px-2 rounded-lg ${
                      isSelected 
                        ? 'text-[#dc2626] font-black bg-red-50/80 border-l-2 border-[#dc2626]' 
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{displayName}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isSelected ? 'bg-red-100 text-[#dc2626] font-bold' : 'bg-neutral-100 text-neutral-500'}`}>
                      {count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search flower, vapes, strain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 pl-11 pr-4 py-3 outline-none focus:border-[#dc2626] transition-colors rounded-xl text-sm shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-sm text-neutral-500 whitespace-nowrap font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto bg-white border border-neutral-200 text-neutral-900 px-4 py-3 outline-none focus:border-[#dc2626] transition-colors rounded-xl text-sm appearance-none font-medium shadow-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Header Badge if filtered */}
        {activeCategory !== 'All' && (
          <div className="mb-6 flex items-center justify-between bg-neutral-50 p-4 rounded-xl border border-neutral-200">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">Showing Category:</span>
              <span className="text-sm font-black text-[#dc2626] uppercase">{CATEGORY_NAMES[activeCategory] || activeCategory}</span>
              <span className="text-xs text-neutral-500">({filteredProducts.length} items)</span>
            </div>
            <button 
              onClick={() => setActiveCategory('All')} 
              className="text-xs text-neutral-500 hover:text-[#dc2626] underline font-medium"
            >
              Show All Products
            </button>
          </div>
        )}

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="group bg-white border border-neutral-200 rounded-2xl p-4 flex flex-col hover:border-[#dc2626] hover:shadow-md transition-all">
                <Link href={`/product/${product.slug}`} className="relative aspect-square bg-neutral-900 rounded-xl mb-4 overflow-hidden block">
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
                
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'text-amber-500 fill-amber-500' : 'text-neutral-200'}`} />
                    ))}
                    <span className="text-xs text-neutral-500 ml-1 font-medium">({product.reviews || 0})</span>
                  </div>
                  
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className="font-bold text-base text-neutral-900 leading-tight group-hover:text-[#dc2626] transition-colors line-clamp-2">
                      <Link href={`/product/${product.slug}`}>{product.title}</Link>
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4 mt-1">
                    {product.discountPrice ? (
                      <>
                        <span className="text-[#dc2626] font-mono font-bold text-lg">${product.discountPrice.toFixed(2)}</span>
                        <span className="text-neutral-400 line-through text-xs font-mono">${product.basePrice.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-[#dc2626] font-mono font-bold text-lg">${product.basePrice.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <AddToCartButton product={product} className="mt-auto w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white border border-neutral-200 rounded-2xl">
            <p className="text-neutral-500 mb-4 font-medium">No products found matching your criteria.</p>
            <button 
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="text-[#dc2626] font-bold uppercase tracking-wider text-sm hover:text-neutral-900 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ShopCatalog(props: ShopCatalogProps) {
  return (
    <Suspense fallback={<div className="py-20 text-center text-neutral-400">Loading catalog...</div>}>
      <ShopCatalogContent {...props} />
    </Suspense>
  );
}

