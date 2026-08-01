import Image from 'next/image';
import { Metadata } from 'next';
import { BlogSection } from '@/components/home/BlogSection';
import { HeaderLogoBadge } from '@/components/HeaderLogoBadge';

const siteUrl = 'https://jkdistroshop.com';

export const metadata: Metadata = {
  title: 'JK Distro Journal | Guides, Reviews & Shipping Info',
  description:
    'Read expert articles, guides, and FAQs about JK Distro legit reviews, shipping speeds, state legal compliance, terpenes, and THCa product insights.',
  keywords: [
    'JK Distro Blog',
    'JK Distro Journal',
    'Is JK Distro Legit',
    'JK Distro Shipping Time',
    'JK Distro Texas Delivery',
    'JK Distro Wholesale',
  ],
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'JK Distro Journal | Guides, Reviews & Shipping Info',
    description:
      'Learn about JK Distro product standards, lab testing, shipping times, and comprehensive guides to THCa flower and disposable vapes.',
    url: `${siteUrl}/blog`,
    siteName: 'JK Distro Shop',
    type: 'website',
  },
};

export default function BlogPage() {
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
        name: 'Journal & Blog',
        item: `${siteUrl}/blog`,
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Blog Header Banner Image with Designed Text Logo */}
      <section className="relative py-20 lg:py-24 bg-neutral-900 overflow-hidden">
        <Image
          src="https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8"
          alt="JK Distro Shop Journal Header"
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
            JK Distro <span className="text-red-600">Journal</span>
          </h1>
          <p className="text-neutral-300 font-medium text-base sm:text-lg max-w-2xl leading-relaxed">
            Insights, educational guides, shipping details, and official announcements directly from the team at JK Distro.
          </p>
        </div>
      </section>

      <BlogSection />
    </div>
  );
}
