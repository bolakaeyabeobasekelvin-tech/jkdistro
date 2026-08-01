import { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Categories } from '@/components/home/Categories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Reviews } from '@/components/home/Reviews';
import { Faq } from '@/components/home/Faq';
import { BlogSection } from '@/components/home/BlogSection';

const siteUrl = 'https://jkdistroshop.com';

export const metadata: Metadata = {
  title: 'JK Distro Shop | Buy THCa Flower, Disposable Vapes & Shake Online',
  description:
    'JK Distro Shop is the premier online distributor for top-shelf THCa indoor flower, 21+ legal vapes, 7g shake, and concentrates. 100% lab tested with fast, discreet shipping.',
  keywords: [
    'JK Distro',
    'JK Distro Shop',
    'Buy THCa Flower Online',
    'JK Distro Vapes',
    'JK Distro Shake',
    'THCa Disposable Vapes',
    'JK Distro Legit',
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'JK Distro Shop | Buy THCa Flower, Disposable Vapes & Shake Online',
    description:
      'Premier online distributor of top-shelf THCa flower, disposable vapes, shake, and hemp products. 100% lab tested with discreet nationwide delivery.',
    url: siteUrl,
    siteName: 'JK Distro Shop',
    images: [
      {
        url: 'https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8',
        width: 1200,
        height: 630,
        alt: 'JK Distro Shop Official Store',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JK Distro Shop | Buy THCa Flower & Vapes Online',
    description:
      'Premier online distributor for top-shelf THCa flower, disposable vapes, and shake with 100% lab-tested quality.',
    images: ['https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8'],
  },
};

export default function Home() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'JK Distro Shop',
    alternateName: ['JK Distro', 'JK Distro Online'],
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Reviews />
      <Faq limit={4} />
      <BlogSection limit={4} />
    </>
  );
}

