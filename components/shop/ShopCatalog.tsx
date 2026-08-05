'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard, Product } from '@/components/ProductCard';

interface ShopCatalogProps {
  initialProducts: Product[];
}

const CATEGORY_NAMES: Record<string, string> = {
  All: 'All Products',
  flower: 'Premium Flower',
  gummies: 'THCa Gummies & Edibles',
  vapes: 'Disposables & Vapes',
  shake: 'THCa Shake',
  trim: 'THCa Trim',
};

const ITEMS_PER_PAGE = 16;

function ShopCatalogContent({ initialProducts }: ShopCatalogProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams ? searchParams.get('category') : null;
  const urlSearchParam = searchParams ? (searchParams.get('search') || searchParams.get('q')) : null;

  const [products] = useState<Product[]>(initialProducts);

  // Compute selected category derived from searchParam if present, otherwise user selection
  const [userSelectedCategory, setUserSelectedCategory] = useState<string | null>(null);

  const activeCategory = useMemo(() => {
    if (userSelectedCategory) return userSelectedCategory;
    if (categoryParam) {
      const normalizedParam = categoryParam.toLowerCase();
      if (normalizedParam.includes('vape') || normalizedParam.includes('disposable')) {
        return 'vapes';
      } else if (normalizedParam.includes('gummy') || normalizedParam.includes('gummies') || normalizedParam.includes('edible')) {
        return 'gummies';
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
    setCurrentPage(1);
  };

  const [searchQuery, setSearchQuery] = useState(urlSearchParam || '');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  const rawCategories = ['All', 'flower', 'gummies', 'vapes', 'shake', 'trim'];

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleSortChange = (s: string) => {
    setSortBy(s);
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        (p as any).description?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => (a.discountPrice || a.basePrice) - (b.discountPrice || b.basePrice));
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => (b.discountPrice || b.basePrice) - (a.discountPrice || a.basePrice));
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-8 relative z-10">
      {/* Category Horizontal Quick Filters (Mobile & Desktop) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-100">
        {rawCategories.map(category => {
          const displayName = CATEGORY_NAMES[category] || category;
          const isSelected = activeCategory.toLowerCase() === category.toLowerCase();
          const count = category === 'All' 
            ? products.length 
            : products.filter(p => p.category.toLowerCase() === category.toLowerCase()).length;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-red-600 text-white border-red-600 shadow-sm'
                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <span>{displayName}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isSelected ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="hidden lg:block w-56 flex-shrink-0 space-y-10">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
            <h3 className="text-neutral-900 font-bold tracking-tight mb-4 flex items-center gap-2 text-sm uppercase">
              <Filter className="w-4 h-4 text-[#dc2626]" /> Categories
            </h3>
            <ul className="space-y-2">
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
                      className={`text-xs transition-all w-full text-left flex justify-between items-center py-2 px-3 rounded-xl ${
                        isSelected 
                          ? 'text-[#dc2626] font-black bg-red-50/80 border-l-4 border-[#dc2626]' 
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="font-semibold">{displayName}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-red-100 text-[#dc2626] font-bold' : 'bg-neutral-100 text-neutral-500'}`}>
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
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search flower, vapes, strain..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 pl-11 pr-4 py-3 outline-none focus:border-[#dc2626] transition-colors rounded-xl text-sm shadow-sm"
              />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm text-neutral-500 whitespace-nowrap font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
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
            <div className="mb-6 flex items-center justify-between bg-red-50/50 p-4 rounded-xl border border-red-200/60">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-500">Filtered Category:</span>
                <span className="text-sm font-black text-[#dc2626] uppercase">{CATEGORY_NAMES[activeCategory] || activeCategory}</span>
                <span className="text-xs text-neutral-600 font-bold">({filteredProducts.length} items)</span>
              </div>
              <button 
                onClick={() => setActiveCategory('All')} 
                className="text-xs text-neutral-600 hover:text-[#dc2626] underline font-bold"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Grid - 4 per row on lg/xl screens */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Bar (16 per page) */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 pt-6">
                <div className="text-xs sm:text-sm text-neutral-600 font-medium">
                  Showing <span className="font-bold text-neutral-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                  <span className="font-bold text-neutral-900">{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}</span> of{' '}
                  <span className="font-bold text-neutral-900">{filteredProducts.length}</span> products
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 bg-white shadow-xs"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" /> Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-black transition-all border ${
                          currentPage === page
                            ? 'bg-[#dc2626] text-white border-[#dc2626] shadow-md scale-105'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100 shadow-xs'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 bg-white shadow-xs"
                      aria-label="Next page"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </>
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


