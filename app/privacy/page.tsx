import Image from 'next/image';
import { Metadata } from 'next';
import { HeaderLogoBadge } from '@/components/HeaderLogoBadge';

const siteUrl = 'https://jkdistroshop.com';

export const metadata: Metadata = {
  title: 'Privacy Policy | JK Distro Shop',
  description: 'JK Distro Shop privacy policy details how we handle customer data, order confidentiality, and secure transactions.',
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen pb-32">
      <section className="relative py-20 lg:py-24 bg-neutral-900 overflow-hidden mb-16">
        <Image
          src="https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8"
          alt="JK Distro Privacy Policy Header"
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
            Privacy Policy
          </h1>
          <p className="text-neutral-300 font-medium text-base sm:text-lg max-w-2xl leading-relaxed">
            Your privacy and order discretion are our top priority at JK Distro.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-neutral">
        <h2 className="text-2xl font-black uppercase text-neutral-900">1. Data Confidentiality</h2>
        <p className="text-neutral-600 font-medium">
          At JK Distro, we strictly safeguard all customer information. We do not sell, rent, or trade personal data to third parties. All shipping information is utilized solely to deliver your orders in discreet packaging.
        </p>

        <h2 className="text-2xl font-black uppercase text-neutral-900 mt-8">2. Secure Transactions</h2>
        <p className="text-neutral-600 font-medium">
          All order requests and payment confirmations are handled through private, encrypted communication channels to protect buyer identity and payment confidentiality.
        </p>

        <h2 className="text-2xl font-black uppercase text-neutral-900 mt-8">3. Cookies & Analytics</h2>
        <p className="text-neutral-600 font-medium">
          We use standard cookies to maintain your shopping cart state and optimize site navigation. You can adjust your browser settings to disable cookies if desired.
        </p>
      </div>
    </div>
  );
}
