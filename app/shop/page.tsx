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
    'albanese gummy bears',
    'camino gummies',
    'cbn gummies',
    'dye free m&ms',
    'gummy candy edibles',
    'gummy sharks',
    'haribo gummies',
    'jolly rancher gummies',
    'red 40',
    'shaq gummies',
    'sour gummies',
    'trolli gummy pop',
    'alaskan thunder fuck',
    'animal face strain',
    'apple fritter strain',
    'biscotti strain',
    'black ice strain',
    'black maple strain',
    'black runtz strain',
    'blue cookies strain',
    'blue lobster strain',
    'blue nerds strain',
    'blue zushi strain',
    'blueberry muffin strain',
    'bubblegum strain',
    'candy gas strain',
    'cap junky strain',
    'cereal milk strain',
    'cherry bomb strain',
    'cherry pie strain',
    'cookies and cream strain',
    'donny burger strain',
    'fruity pebbles strain',
    'gelato strain',
    'gelonade strain',
    'gg4 strain',
    'glitter bomb strain',
    'gorilla glue strain',
    'grape gas strain',
    'grease monkey strain',
    'green crack strain',
    'gsc strain',
    'gushers strain',
    'horchata strain',
    'jelly donut strain',
    'jet fuel strain',
    'king louis strain',
    'king louis xiii strain',
    'la kush cake strain',
    'lemon cherry gelato',
    'london pound cake strain',
    'monkey glue strain',
    'obama runtz',
    'og kush',
    'peanut butter breath strain',
    'pineapple express strain',
    'pink lemonade strain',
    'purple haze strain',
    'rainbow belts',
    'romulan strain',
    'runtz strain',
    'skywalker og strain',
    'slurricane strain',
    'sour tangie strain',
    'space candy strain',
    'strawberry shortcake strain',
    'super boof strain',
    'super boot strain',
    'tangie strain',
    'trainwreck strain',
    'white truffle strain',
    'widow white',
    'zoap strain',
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
