import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Truck, Star } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[640px] flex items-center justify-center overflow-hidden bg-neutral-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://drive.google.com/uc?export=view&id=1rVkEqfSLShLjuw_-Z_njoIYKJia-N9z8"
          alt="JK Distro Shop - Top Shelf THCa Flower and Disposable Vapes"
          fill
          priority
          quality={100}
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12 flex flex-col items-center">
        {/* Trust Badges Bar */}
        <div className="mb-4 inline-flex items-center gap-2 bg-red-950/80 border border-red-800/60 px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Official JK Distro Online Shop — 100% Lab Tested</span>
        </div>

        {/* Primary H1 Tag incorporating focus keyword "JK Distro" */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-tight uppercase drop-shadow-xl">
          <span className="text-red-600">JK Distro</span> — Premier THCa Flower & Vapes
        </h1>

        <p className="text-lg md:text-xl text-neutral-200 mb-10 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
          Welcome to <strong>JK Distro</strong>, your trusted source for top-shelf THCa indoor flower, high-potency disposable vapes, shake, and concentrates. Enjoy 100% discreet, vacuum-sealed nationwide shipping directly to your door.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8">
          <Link 
            href="/shop" 
            className="w-full sm:w-auto bg-red-600 text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-red-700 shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
          >
            Shop JK Distro Collection <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/about" 
            className="w-full sm:w-auto bg-black/60 border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all rounded-xl text-center backdrop-blur-md"
          >
            Why Choose JK Distro
          </Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-neutral-300 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-red-500" /> Fast & Discreet Shipping
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Farm Bill Compliant (&lt;0.3% D9 THC)
          </span>
        </div>
      </div>
    </section>
  );
}
