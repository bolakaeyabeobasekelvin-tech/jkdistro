import Image from 'next/image';
import { Metadata } from 'next';
import { HeaderLogoBadge } from '@/components/HeaderLogoBadge';

const siteUrl = 'https://jkdistroshop.com';

export const metadata: Metadata = {
  title: 'Terms of Service | JK Distro Shop',
  description: 'Terms of Service and purchasing agreement for JK Distro Shop customers.',
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen pb-32">
      <section className="relative py-20 lg:py-24 bg-neutral-900 overflow-hidden mb-16">
        <Image
          src="https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8"
          alt="JK Distro Terms of Service Header"
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
            Terms of Service
          </h1>
          <p className="text-neutral-300 font-medium text-base sm:text-lg max-w-2xl leading-relaxed">
            Agreement guidelines for purchasing from JK Distro Shop.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-neutral-700 font-medium">
        <h2 className="text-2xl font-black uppercase text-neutral-900">1. Age Requirement</h2>
        <p>
          You must be at least 21 years of age to purchase products from JK Distro Shop. By placing an order, you confirm that you meet age eligibility requirements in your jurisdiction.
        </p>

        <h2 className="text-2xl font-black uppercase text-neutral-900">2. Compliance with Laws</h2>
        <p>
          All products sold on JK Distro comply with the 2018 Federal Farm Bill containing less than 0.3% Delta-9 THC. Customers are responsible for verifying local and state regulations before purchasing.
        </p>

        <h2 className="text-2xl font-black uppercase text-neutral-900">3. Orders & Payment</h2>
        <p>
          Orders are confirmed upon receipt. Our sales team provides exact transfer details for preferred payment methods (Apple Pay, Bitcoin, Cash App, Chime, Zelle).
        </p>
      </div>
    </div>
  );
}
