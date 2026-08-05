import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    name: 'Premium Flower',
    image: 'https://drive.google.com/uc?export=view&id=1kRIAD1q5YL40CyFXlurA_1rd9iXfufAQ',
    slug: 'flower',
    subcategories: [
      { name: 'Premium Ounce', href: '/shop?category=flower' },
      { name: '7G Special', href: '/shop?category=flower' }
    ]
  },
  {
    name: 'THCa Gummies & Edibles',
    image: 'https://lh3.googleusercontent.com/d/1ZgzMkHK_UISBMBkzohMoaH7gjOAjy6R2',
    slug: 'gummies',
    subcategories: [
      { name: 'Gummy Bears', href: '/shop?category=gummies' },
      { name: 'Sour Gummies', href: '/shop?category=gummies' }
    ]
  },
  {
    name: 'Disposables & Vapes',
    image: 'https://drive.google.com/uc?export=view&id=1w0qJY_ArnXj64wCT-9If5Fqpe4cO0RxM',
    slug: 'vapes',
    subcategories: []
  }
];

export function Categories() {
  return (
    <section className="py-24 bg-white border-t border-neutral-100 relative">
      <div className="absolute left-0 top-1/4 w-[20%] h-[30%] bg-red-50 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">Shop by Category</h2>
            <p className="text-neutral-500 font-medium text-sm">Explore our highly curated selections.</p>
          </div>
          <Link href="/shop" className="hidden sm:block text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-red-700 transition-colors">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
             <div key={category.slug} className="group relative aspect-[16/9] md:aspect-[3/2] overflow-hidden bg-neutral-100 border border-neutral-200 rounded-2xl hover:border-red-600/50 hover:shadow-lg transition-all flex flex-col justify-end">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              
              <div className="relative z-10 p-6 w-full flex flex-col">
                <Link href={`/shop?category=${category.slug}`} className="block mb-4">
                  <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">{category.name}</h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-red-400 block">
                    Explore Now
                  </span>
                </Link>
                
                {category.subcategories.length > 0 && (
                  <div className="flex gap-3 flex-wrap mt-2">
                    {category.subcategories.map((sub, i) => (
                      <Link 
                        key={i} 
                        href={sub.href}
                        className="text-xs font-bold uppercase tracking-wider text-white bg-black/50 hover:bg-red-600 border border-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
