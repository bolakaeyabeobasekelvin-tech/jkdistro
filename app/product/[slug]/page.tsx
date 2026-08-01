import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ProductDetail } from './ProductDetail';

const siteUrl = 'https://jkdistroshop.com';

async function getProduct(slug: string) {
  const filePath = path.join(process.cwd(), 'data', 'scraped-products.json');
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data);
    return products.find((p: any) => p.slug === slug) || null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    return {
      title: 'Product Not Found | JK Distro Shop',
    };
  }

  const title = `${product.title} - JK Distro | Buy THCa Online`;
  const description = `${product.description ? product.description.slice(0, 150) : product.title}. Buy ${product.title} online at JK Distro Shop. 100% lab-tested, top-shelf quality with fast, discreet shipping.`;
  const canonicalUrl = `${siteUrl}/product/${product.slug}`;
  const imageUrl = product.images?.[0] || 'https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8';

  return {
    title,
    description,
    keywords: [
      product.title,
      'JK Distro',
      'JK Distro Shop',
      `JK Distro ${product.title}`,
      product.category,
      'THCa Flower',
      'Buy THCa Online',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'JK Distro Shop',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${product.title} - JK Distro`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const currentPrice = product.discountPrice || product.basePrice;

  // Product Schema Markup
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images,
    description: product.description,
    sku: `JKD-${product.id}`,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: 'JK Distro',
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/product/${product.slug}`,
      priceCurrency: 'USD',
      price: currentPrice.toFixed(2),
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'JK Distro Shop',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 5,
      reviewCount: product.reviews || 12,
      bestRating: 5,
      worstRating: 1,
    },
  };

  // Breadcrumb Schema Markup
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
        name: 'Shop',
        item: `${siteUrl}/shop`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: `${siteUrl}/product/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="bg-white min-h-screen pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductDetail product={product} />
        </div>
      </div>
    </>
  );
}
