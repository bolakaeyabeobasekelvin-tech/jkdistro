import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Truck, ShieldCheck, Clock, RefreshCw, AlertCircle, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { HeaderLogoBadge } from '@/components/HeaderLogoBadge';

const siteUrl = 'https://jkdistroshop.com';

export const metadata: Metadata = {
  title: 'JK Distro Shipping Modes & Returns | 3-5 Day, 2 Day & 24hr Priority',
  description:
    'JK Distro shipping modes: $15 standard (3-5 days), $25 2-day, and $50 24-hour priority. 100% stealth vacuum packaging and clear returns policy.',
  keywords: [
    'JK Distro Shipping',
    'JK Distro Shipping Modes',
    'JK Distro Delivery Time',
    'JK Distro Priority Shipping',
    'JK Distro Discreet Packaging',
  ],
  alternates: {
    canonical: `${siteUrl}/shipping`,
  },
  openGraph: {
    title: 'JK Distro Shipping Modes & Returns | 3-5 Day, 2 Day & 24hr Priority',
    description:
      'JK Distro shipping breakdown: 3-5 days standard ($15), 2 days advanced ($25), and 24 hours priority ($50). Stealth vacuum-sealed packaging.',
    url: `${siteUrl}/shipping`,
    siteName: 'JK Distro Shop',
    type: 'website',
  },
};

export default function ShippingPage() {
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
        name: 'Shipping & Returns Policy',
        item: `${siteUrl}/shipping`,
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Header Banner */}
      <section className="relative py-20 lg:py-24 bg-neutral-900 overflow-hidden mb-16">
        <Image
          src="https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8"
          alt="JK Distro Shipping Header"
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
            Shipping & <span className="text-red-600">Returns Policy</span>
          </h1>
          <p className="text-neutral-300 font-medium text-base sm:text-lg max-w-2xl leading-relaxed">
            Fast, stealth, and guaranteed delivery. Learn about our three shipping tiers, double vacuum sealing, and returns policy.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Shipping Modes Breakdown */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-red-600 text-white rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase text-neutral-900 tracking-tight">JK Distro Available Shipping Modes</h2>
              <p className="text-xs font-bold text-neutral-500 uppercase">Select your preferred delivery speed at checkout</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Standard */}
            <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-2xl flex flex-col justify-between hover:border-neutral-300 transition-all">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-black uppercase tracking-wider bg-neutral-200 text-neutral-800 px-3 py-1 rounded-md">
                    Mode 1
                  </span>
                  <span className="text-2xl font-black font-mono text-neutral-900">$15.00</span>
                </div>
                <h3 className="text-xl font-black uppercase text-neutral-900 mb-1">Standard Shipping</h3>
                <p className="text-xs font-bold text-red-600 uppercase mb-4 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 3-5 Business Days
                </p>
                <p className="text-neutral-600 text-sm font-medium leading-relaxed mb-6">
                  Our core ground shipping option. Items are packaged with triple-layer vacuum-sealed heat bags, 100% odor-proof stealth boxes, and dispatched within 24-48 hours.
                </p>
              </div>
              <ul className="text-xs text-neutral-600 font-medium space-y-2 border-t border-neutral-200 pt-4">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Tracking link included</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Odor-proof vacuum seal</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Standard warehouse sorting</li>
              </ul>
            </div>

            {/* Advanced */}
            <div className="bg-red-50/50 border-2 border-red-600 p-6 rounded-2xl flex flex-col justify-between shadow-sm relative">
              <span className="absolute -top-3 right-6 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                Most Popular
              </span>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-black uppercase tracking-wider bg-red-600 text-white px-3 py-1 rounded-md">
                    Mode 2
                  </span>
                  <span className="text-2xl font-black font-mono text-red-600">$25.00</span>
                </div>
                <h3 className="text-xl font-black uppercase text-neutral-900 mb-1">Advanced Shipping</h3>
                <p className="text-xs font-bold text-red-600 uppercase mb-4 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 2 Business Days
                </p>
                <p className="text-neutral-600 text-sm font-medium leading-relaxed mb-6">
                  Expedited air delivery for customers needing fast, reliable turnaround. Priority warehouse picking ensures your order bypasses standard fulfillment queues.
                </p>
              </div>
              <ul className="text-xs text-neutral-600 font-medium space-y-2 border-t border-red-200 pt-4">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-600" /> Express Air Routing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-600" /> Same-day priority dispatch</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-600" /> Double-reinforced stealth box</li>
              </ul>
            </div>

            {/* Priority */}
            <div className="bg-neutral-900 border border-neutral-800 text-white p-6 rounded-2xl flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-black uppercase tracking-wider bg-red-600 text-white px-3 py-1 rounded-md">
                    Mode 3
                  </span>
                  <span className="text-2xl font-black font-mono text-white">$50.00</span>
                </div>
                <h3 className="text-xl font-black uppercase text-white mb-1">Priority Shipping</h3>
                <p className="text-xs font-bold text-red-400 uppercase mb-4 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 24 Hours / Overnight
                </p>
                <p className="text-neutral-300 text-sm font-medium leading-relaxed mb-6">
                  Top-tier overnight rush shipping. Dedicated warehouse agent immediately pulls and packages your order for next-flight express departure.
                </p>
              </div>
              <ul className="text-xs text-neutral-300 font-medium space-y-2 border-t border-neutral-800 pt-4">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> Guaranteed 24-hour dispatch</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> Direct overnight express flight</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> Premium VIP handling</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Stealth Packaging & Discretion */}
        <section className="mb-20 bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-black uppercase text-red-600 tracking-wider">100% Privacy Protection</span>
              <h2 className="text-2xl font-black uppercase text-neutral-900 mb-4 mt-1">
                Discreet & Stealth Packaging
              </h2>
              <p className="text-neutral-600 text-sm font-medium leading-relaxed mb-4">
                Every single order from JK Distro Shop is shipped in completely unbranded, plain cardboard boxes or padded mailers. There are no mentions of flower, vapes, or cannabis anywhere on the outer box or shipping label.
              </p>
              <div className="space-y-3 text-xs font-bold text-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>Triple-layer heat-sealed Mylar bags to neutralize all scent</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span>Generic return address with no industry branding</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-4">
              <h3 className="font-black text-sm uppercase text-neutral-900 border-b border-neutral-100 pb-2">
                Order Processing & Sales Team Contact
              </h3>
              <p className="text-neutral-600 text-xs font-medium leading-relaxed">
                Once you place an order on JK Distro, our sales team confirms receipt and contacts you with exact payment details (Apple Pay, Bitcoin, Cash App, Chime, or Zelle). Upon payment verification, your order is dispatched immediately under your selected shipping tier.
              </p>
              <div className="p-3 bg-red-50 rounded-xl text-[11px] text-red-800 font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Tracking numbers are emailed as soon as the package is handed to the courier.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Returns & Exchange Policy */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-neutral-900 text-white rounded-xl">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase text-neutral-900 tracking-tight">Returns & Replacements</h2>
              <p className="text-xs font-bold text-neutral-500 uppercase">Customer satisfaction guarantee</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-neutral-200 rounded-2xl">
              <h3 className="font-bold text-base text-neutral-900 mb-2">Damaged or Defective Items</h3>
              <p className="text-neutral-600 text-xs font-medium leading-relaxed mb-4">
                If your package arrives damaged or an item is defective, contact our sales support within 48 hours of delivery with photo/video evidence. We will send a free replacement immediately.
              </p>
            </div>

            <div className="p-6 bg-white border border-neutral-200 rounded-2xl">
              <h3 className="font-bold text-base text-neutral-900 mb-2">Unopened Products Return</h3>
              <p className="text-neutral-600 text-xs font-medium leading-relaxed mb-4">
                Due to the consumable nature of THCa flower and disposables, we can only accept returns on unopened, factory-sealed products within 14 days of delivery.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center p-8 bg-neutral-900 text-white rounded-3xl">
          <h2 className="text-2xl font-black uppercase mb-2">Ready to place an order?</h2>
          <p className="text-neutral-400 text-xs font-medium mb-6">Explore our curated catalog of THCa flower, disposable vapes, and shake.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-red-600 text-white font-black uppercase px-8 py-3.5 rounded-xl text-xs hover:bg-red-700 transition-colors shadow-lg"
          >
            Shop JK Distro Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
