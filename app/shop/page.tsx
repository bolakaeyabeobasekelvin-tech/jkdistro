import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { Metadata } from 'next';
import { ShopCatalog } from '@/components/shop/ShopCatalog';
import { HeaderLogoBadge } from '@/components/HeaderLogoBadge';

const siteUrl = 'https://jkdistroshop.com';

export const metadata: Metadata = {
  title: 'JK Distro Shop | Buy THCa Flower, Disposable Vapes & 10g Gummies',
  description:
    'Browse the official JK Distro catalog for top-shelf THCa flower, disposable vapes, 10g gummies, and concentrates. Fast 100% discreet shipping.',
  keywords: [
    'JK Distro Shop',
    'JK Distro Catalog',
    'JK Distro THCa Flower',
    'JK Distro Disposable Vapes',
    'JK Distro Gummies',
    'Buy THCa Flower Online',
    'JK Distro Shake',
    'JK Distro Top Shelf',
  ],
  alternates: {
    canonical: `${siteUrl}/shop`,
  },
  openGraph: {
    title: 'JK Distro Shop | Buy THCa Flower, Disposable Vapes & 10g Gummies',
    description:
      'Browse the official JK Distro shop catalog for top-shelf THCa flower, vapes, 10g gummies, and 100% lab-tested hemp products shipped nationwide.',
    url: `${siteUrl}/shop`,
    siteName: 'JK Distro Shop',
    type: 'website',
  },
};

async function getProducts() {
  const filePath = path.join(process.cwd(), 'data', 'scraped-products.json');
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load products:', error);
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop Catalog',
        item: `${siteUrl}/shop`,
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Shop Header Banner Image with Designed Text Logo */}
      <section className="relative py-20 lg:py-24 bg-neutral-900 overflow-hidden mb-12">
        <Image
          src="https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8"
          alt="JK Distro Shop - Official Online Catalog"
          fill
          quality={100}
          className="object-cover object-center opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <div className="mb-4">
            <HeaderLogoBadge size="lg" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mb-4">
            JK Distro <span className="text-red-600">Shop Catalog</span>
          </h1>
          <p className="text-neutral-300 font-medium text-base sm:text-lg max-w-2xl leading-relaxed">
            Discover our carefully curated selection of top-tier THCa flower, disposable vapes, and hemp products. Every batch is third-party lab tested for maximum purity and potency.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShopCatalog initialProducts={products} />
      </div>
    </div>
  );
}
