import Link from 'next/link';
import Image from 'next/image';

const LOGO_IMAGE_URL = 'https://drive.google.com/uc?export=view&id=15bOczt3Ci9gK010raoWXGTPAVrAabBbx';

const posts = [
  {
    id: 1,
    title: 'The Science of Terpenes: Why Smell Matters',
    excerpt: 'Understanding the compounds that give flower its unique aroma and effects.',
    image: LOGO_IMAGE_URL,
    date: 'Oct 12, 2023',
    slug: 'science-of-terpenes'
  },
  {
    id: 2,
    title: 'Indica vs. Sativa vs. Hybrid',
    excerpt: 'Demystifying the classifications of flower and how to choose what is right for you.',
    image: LOGO_IMAGE_URL,
    date: 'Sep 28, 2023',
    slug: 'indica-sativa-hybrid'
  },
  {
    id: 3,
    title: 'Vape Care 101',
    excerpt: 'How to store and maintain your disposable vapes for maximum longevity and flavor.',
    image: LOGO_IMAGE_URL,
    date: 'Sep 15, 2023',
    slug: 'vape-care-101'
  },
  {
    id: 4,
    title: 'The Rise of Live Resin',
    excerpt: 'What makes live resin vapes different from standard distillates?',
    image: LOGO_IMAGE_URL,
    date: 'Aug 30, 2023',
    slug: 'rise-of-live-resin'
  },
  {
    id: 5,
    title: 'Is JK Distro Legit? What You Need to Know',
    excerpt: 'Explore the facts about our products, licenses, and why thousands trust JK distro for their premium flower and vapes.',
    image: LOGO_IMAGE_URL,
    date: 'Nov 02, 2023',
    slug: 'is-jk-distro-legit'
  },
  {
    id: 6,
    title: 'How Long Does JK Distro Take to Ship?',
    excerpt: 'A complete guide to our shipping timelines, expedited options, and what to expect when you order from JK distro.',
    image: LOGO_IMAGE_URL,
    date: 'Nov 15, 2023',
    slug: 'how-long-jk-distro-ship'
  },
  {
    id: 7,
    title: 'Does JK Distro ID? Our Verification Process',
    excerpt: 'Understanding our age verification process to ensure legal compliance and secure deliveries.',
    image: LOGO_IMAGE_URL,
    date: 'Nov 21, 2023',
    slug: 'does-jk-distro-id'
  },
  {
    id: 8,
    title: 'Is JK Distro Sprayed? Pure & Clean Quality',
    excerpt: 'Learn about our sourcing standards and why our premium flower is never sprayed with artificial chemicals.',
    image: LOGO_IMAGE_URL,
    date: 'Dec 05, 2023',
    slug: 'is-jk-distro-sprayed'
  },
  {
    id: 9,
    title: 'Where Is JK Distro Located?',
    excerpt: 'Take a peek behind the scenes at our main distribution center in California and our fulfillment processes.',
    image: LOGO_IMAGE_URL,
    date: 'Dec 12, 2023',
    slug: 'where-is-jk-distro-located'
  },
  {
    id: 10,
    title: 'Does JK Distro Ship to Texas? Nationwide Delivery',
    excerpt: 'Details on our nationwide shipping capabilities, including state-specific regulations for Texas and beyond.',
    image: LOGO_IMAGE_URL,
    date: 'Dec 18, 2023',
    slug: 'does-jk-distro-ship-texas'
  },
  {
    id: 11,
    title: 'What Are JK Distros Wholesale Prices?',
    excerpt: 'A guide for businesses on how to access our wholesale pricing tiers and bulk order discounts.',
    image: LOGO_IMAGE_URL,
    date: 'Jan 04, 2024',
    slug: 'jk-distro-wholesale-prices'
  },
  {
    id: 12,
    title: 'Where Does JK Distro Ship From?',
    excerpt: 'Find out more about our shipping origins and how we ensure fresh, discreet delivery across the country.',
    image: LOGO_IMAGE_URL,
    date: 'Jan 10, 2024',
    slug: 'where-does-jk-distro-ship-from'
  }
];

export function BlogSection({ limit }: { limit?: number }) {
  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <section className="py-24 bg-white border-t border-neutral-100 relative">
      <div className="absolute right-1/4 bottom-0 w-[20%] h-[30%] bg-red-50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">The Journal</h2>
            <p className="text-neutral-500 font-medium text-sm">Insights, guides, and stories from our experts.</p>
          </div>
          {limit && (
            <Link href="/blog" className="hidden sm:block text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-red-700 transition-colors">
              Read All
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedPosts.map((post) => (
            <article key={post.id} className="group flex flex-col bg-white border border-neutral-200 p-4 rounded-2xl hover:border-red-600/50 hover:shadow-lg transition-all">
              <Link href={`/blog/${post.slug}`} className="relative aspect-[4/3] mb-6 overflow-hidden rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center p-6 block">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <div className="flex flex-col flex-grow">
                <p className="text-[10px] text-red-700 font-black uppercase tracking-widest mb-3">{post.date}</p>
                <h3 className="text-xl font-bold text-neutral-900 mb-3 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-neutral-600 font-medium leading-relaxed mb-6 text-sm">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="mt-auto text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-red-700 transition-colors flex items-center gap-2 w-max"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
