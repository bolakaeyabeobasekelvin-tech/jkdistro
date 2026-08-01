import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { AddToCartButton } from '@/components/AddToCartButton';

async function getFeaturedProducts() {
  const filePath = path.join(process.cwd(), 'data', 'scraped-products.json');
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data);
    return products.slice(0, 4); // Get top 4 products
  } catch (error) {
    console.error('Failed to load featured products:', error);
    return [];
  }
}

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-neutral-100 relative">
      <div className="absolute right-0 top-1/4 w-[20%] h-[30%] bg-red-50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">Featured Collection</h2>
            <p className="text-neutral-500 font-medium text-sm">Hand-selected for uncompromising quality.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div key={product.id} className="group bg-white border border-neutral-200 rounded-2xl p-4 flex flex-col hover:border-red-600/50 hover:shadow-lg transition-all">
              <Link href={`/product/${product.slug}`} className="relative aspect-square bg-neutral-100 rounded-xl mb-4 overflow-hidden block">
                {product.discountPrice ? (
                  <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Sale
                  </div>
                ) : (
                  <div className="absolute top-3 left-3 z-10 bg-red-700 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Top Shelf
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 z-0 pointer-events-none">
                  <div className="w-24 h-24 bg-red-100/50 rounded-full blur-2xl"></div>
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
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'text-red-600 fill-red-600' : 'text-neutral-300'}`} />
                  ))}
                  <span className="text-xs text-neutral-500 ml-1">({product.reviews || 0})</span>
                </div>
                
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h3 className="font-bold text-lg text-neutral-900 leading-tight group-hover:text-red-700 transition-colors line-clamp-1">
                    <Link href={`/product/${product.slug}`}>{product.title}</Link>
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  {product.discountPrice ? (
                    <>
                      <span className="text-red-700 font-mono font-bold">${product.discountPrice.toFixed(2)}</span>
                      <span className="text-neutral-400 line-through text-xs font-mono">${product.basePrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-red-700 font-mono font-bold">${product.basePrice.toFixed(2)}</span>
                  )}
                </div>
                
                <AddToCartButton product={product} className="mt-auto w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
