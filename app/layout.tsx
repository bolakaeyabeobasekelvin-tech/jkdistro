import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { StickyCartWidget } from '@/components/StickyCartWidget';
import { SalesNotification } from '@/components/SalesNotification';

const siteUrl = 'https://jkdistroshop.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'JK Distro | Premium THCa Flower, Disposable Vapes & Hemp Shop',
    template: '%s | JK Distro Shop',
  },
  description:
    'JK Distro is your #1 source for top-shelf THCa flower, disposable vapes, and lab-tested hemp. Fast 100% discreet nationwide delivery.',
  keywords: [
    'JK Distro',
    'JK Distro Shop',
    'JK Distro THCa',
    'JK Distro Flower',
    'JK Distro Vapes',
    'JK Distro Shake',
    'JK Distro Reviews',
    'JK Distro Wholesale',
    'Buy THCa Online',
    'THCa Hemp Flower',
    'Disposable Vapes',
    'THCa Concentrates',
    'Discreet Hemp Shipping',
  ],
  authors: [{ name: 'JK Distro', url: siteUrl }],
  creator: 'JK Distro',
  publisher: 'JK Distro Shop',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'JK Distro | Premium THCa Flower, Disposable Vapes & Hemp Shop',
    description:
      'JK Distro is your #1 source for top-shelf THCa flower, disposable vapes, and lab-tested hemp. Fast 100% discreet nationwide delivery.',
    siteName: 'JK Distro Shop',
    images: [
      {
        url: 'https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8',
        width: 1200,
        height: 630,
        alt: 'JK Distro - Premium THCa Flower and Vapes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JK Distro | Premium THCa Flower, Disposable Vapes & Hemp Shop',
    description:
      'Discover top-shelf THCa flower, disposable vapes, and hemp products at JK Distro. 100% lab-tested with discreet nationwide delivery.',
    images: ['https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8'],
    creator: '@jkdistro',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  verification: {
    google: 'kzy5pDHDNNd8Ww7dxVP56PU_UiU9R-_2cktbZJKGrEs',
    other: {
      'msvalidate.01': 'CCB4AF44321543F2BCED8895FF28FB40',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD Structured Data Schema for Organization & Store
  const storeSchema = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: 'JK Distro',
    alternateName: ['JK Distro Shop', 'JK Distro Hemp', 'JK Distro Online'],
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    image: 'https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8',
    description:
      'JK Distro is a premier online distributor of top-shelf THCa flower, disposable vapes, shake, and hemp products with 100% lab testing transparency and nationwide discreet shipping.',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-555-0199',
      contactType: 'customer service',
      email: 'contact@jkdistroshop.com',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://instagram.com/jkdistro',
      'https://twitter.com/jkdistro',
      'https://facebook.com/jkdistro',
    ],
  };

  // JSON-LD Structured Data Schema for WebSite with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'JK Distro',
    alternateName: 'JK Distro Shop',
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

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="kzy5pDHDNNd8Ww7dxVP56PU_UiU9R-_2cktbZJKGrEs" />
        <meta name="msvalidate.01" content="CCB4AF44321543F2BCED8895FF28FB40" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className="bg-white text-neutral-900 min-h-screen flex flex-col antialiased selection:bg-red-200 selection:text-neutral-900 relative overflow-x-hidden"
        suppressHydrationWarning
      >
        <CartProvider>
          <Header />
          <main className="flex-grow flex flex-col z-0 relative">{children}</main>
          <Footer />
          <StickyCartWidget />
          <SalesNotification />
        </CartProvider>
        <Script
          id="smartsupp-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _smartsupp = _smartsupp || {};
              _smartsupp.key = '617b86d73077ea755c2932a80177b9e1025f9067';
              window.smartsupp||(function(d) {
                var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                c.type='text/javascript';c.charset='utf-8';c.async=true;
                c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
              })(document);
            `,
          }}
        />
        <noscript>
          Powered by <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">Smartsupp</a>
        </noscript>
      </body>
    </html>
  );
}
