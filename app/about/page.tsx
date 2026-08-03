import Image from 'next/image';
import { Metadata } from 'next';
import { HeaderLogoBadge } from '@/components/HeaderLogoBadge';

const siteUrl = 'https://jkdistroshop.com';

export const metadata: Metadata = {
  title: 'About JK Distro | Premier Online Hemp & THCa Distributor',
  description:
    'Learn why JK Distro is the trusted distributor for top-shelf THCa flower, vapes, and gummies with lab-tested purity and discreet delivery.',
  keywords: [
    'About JK Distro',
    'JK Distro Shop',
    'JK Distro Legit',
    'JK Distro California',
    'Discreet Shipping Hemp',
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: 'About JK Distro | Premier Online Hemp & THCa Distributor',
    description:
      'Learn why thousands trust JK Distro for top-shelf THCa flower, disposable vapes, and 100% lab-tested hemp products shipped nationwide.',
    url: `${siteUrl}/about`,
    siteName: 'JK Distro Shop',
    type: 'website',
  },
};

export default function AboutPage() {
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
        name: 'About JK Distro',
        item: `${siteUrl}/about`,
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero Header Section with Image and Designed Text Logo */}
      <section className="relative py-24 lg:py-32 bg-neutral-900 border-b border-neutral-800 overflow-hidden">
        <Image
          src="https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8"
          alt="JK Distro Shop Header"
          fill
          quality={100}
          className="object-cover object-center opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <div className="mb-6">
            <HeaderLogoBadge size="lg" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 uppercase">
            Why <span className="text-red-600">JK Distro</span> Is The Best
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-medium">
            We deliver top-shelf THCa flower, concentrates, and vapes directly to your doorstep in 100% discreet, odor-proof packaging across eligible states nationwide.
          </p>
        </div>
      </section>

      {/* Why We Are The Best Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black uppercase text-neutral-900 tracking-tight mb-4">The JK Distro Standard</h2>
            <p className="text-neutral-500 font-medium text-base">Setting the bar for quality, privacy, and speed in every package.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-200 hover:border-red-600/40 transition-all shadow-sm">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 uppercase tracking-wide">Discreet Nationwide Shipping</h3>
              <p className="text-neutral-600 leading-relaxed font-medium text-sm">
                Privacy is our top priority. Every shipment is vacuum-sealed in double odor-proof barrier bags and enclosed in plain, unbranded shipping boxes. No labels or logos hint at the contents inside.
              </p>
            </div>

            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-200 hover:border-red-600/40 transition-all shadow-sm">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 uppercase tracking-wide">100% Lab Tested & Compliant</h3>
              <p className="text-neutral-600 leading-relaxed font-medium text-sm">
                Every batch undergoes independent third-party laboratory analysis to verify cannabinoid profiles, potency, and purity. All products strictly contain less than 0.3% Delta-9 THC in accordance with federal regulations.
              </p>
            </div>

            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-200 hover:border-red-600/40 transition-all shadow-sm">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 uppercase tracking-wide">Fast Order Processing</h3>
              <p className="text-neutral-600 leading-relaxed font-medium text-sm">
                We know you expect speed. Orders are processed rapidly from our central facility and handed to logistics carriers within 24-48 business hours with tracking provided immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal & Regulatory Compliance Section */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-neutral-200 shadow-sm space-y-6 text-neutral-700 text-sm leading-relaxed">
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
              <span className="w-3 h-3 rounded-full bg-red-600 inline-block"></span>
              <h2 className="text-lg font-black uppercase text-neutral-900 tracking-wider">Important Legal & Regulatory Disclaimers</h2>
            </div>

            <p className="font-semibold text-neutral-900 bg-neutral-50 p-4 rounded-lg border border-neutral-200">
              These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure or prevent any disease.
            </p>

            <p>
              Products sold on this website may include THC-A and Delta-8. Please be advised that the sale, possession, and use of these products are subject to varying state regulations. It is your responsibility to ensure that you are in compliance with all applicable laws in your jurisdiction before making a purchase or using these products.
            </p>

            <p className="text-neutral-500 text-xs pt-2 border-t border-neutral-100">
              By using this website, you agree to comply with all relevant local, state, and federal regulations. We do not assume any responsibility for any legal consequences that may result from your purchase or use of these products. For legal advice or further clarification, please consult with a qualified legal professional.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
