import Image from 'next/image';
import { Metadata } from 'next';
import { HeaderLogoBadge } from '@/components/HeaderLogoBadge';
import { ContactForm } from './ContactForm';

const siteUrl = 'https://jkdistroshop.com';

export const metadata: Metadata = {
  title: 'Contact JK Distro | Customer Support & Wholesale Inquiries',
  description:
    'Get in touch with JK Distro customer support for order tracking, product questions, or wholesale inquiries. Fast response at contact@jkdistroshop.com.',
  keywords: [
    'Contact JK Distro',
    'JK Distro Support',
    'JK Distro Wholesale',
    'JK Distro Email',
    'JK Distro Customer Service',
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact JK Distro | Customer Support & Wholesale Inquiries',
    description:
      'Contact the official JK Distro support team for order tracking, product questions, or wholesale inquiries at contact@jkdistroshop.com.',
    url: `${siteUrl}/contact`,
    siteName: 'JK Distro Shop',
    type: 'website',
  },
};

export default function ContactPage() {
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
        name: 'Contact Support',
        item: `${siteUrl}/contact`,
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen pb-32 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Contact Header Banner Image with Designed Text Logo */}
      <section className="relative py-20 lg:py-24 bg-neutral-900 overflow-hidden mb-16">
        <Image
          src="https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8"
          alt="JK Distro Shop Contact Header"
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
            Contact <span className="text-red-600">JK Distro</span>
          </h1>
          <p className="text-neutral-300 font-medium text-base sm:text-lg max-w-2xl leading-relaxed">
            Our support team is available to answer your questions about orders, products, shipping, and wholesale opportunities.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Information */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-neutral-900 mb-6 uppercase">
              Get in Touch
            </h2>
            <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-medium max-w-lg">
              Whether you have questions about our premium flower strains, need assistance with a recent order, or are interested in our wholesale program, our dedicated support team is here to assist you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-lg mb-1">Email Support</h3>
                  <p className="text-neutral-500 font-medium text-sm mb-2">We aim to respond to all inquiries within 24 hours.</p>
                  <a href="mailto:contact@jkdistroshop.com" className="text-red-600 font-bold hover:text-red-700 transition-colors">contact@jkdistroshop.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-lg mb-1">Wholesale Inquiries</h3>
                  <p className="text-neutral-500 font-medium text-sm mb-2">Interested in stocking our premium products? Contact our sales team.</p>
                  <a href="mailto:contact@jkdistroshop.com" className="text-red-600 font-bold hover:text-red-700 transition-colors">contact@jkdistroshop.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-lg mb-1">Business Hours</h3>
                  <p className="text-neutral-500 font-medium text-sm">Monday - Friday: 9:00 AM - 5:00 PM (PST)<br/>Saturday & Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form Component */}
          <ContactForm />
          
        </div>
      </div>
    </div>
  );
}

