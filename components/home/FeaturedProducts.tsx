import fs from 'fs';
import path from 'path';
import { ProductCard } from '@/components/ProductCard';

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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
