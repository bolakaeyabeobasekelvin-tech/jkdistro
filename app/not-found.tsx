import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-white py-16">
      <div className="bg-red-50 text-red-700 font-mono font-black text-sm px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-red-200">
        404 Page Not Found
      </div>
      <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight mb-4">
        Looking for <span className="text-red-600">JK Distro</span>?
      </h1>
      <p className="text-neutral-600 font-medium max-w-md mx-auto mb-8 text-sm sm:text-base leading-relaxed">
        The page you are looking for doesn&apos;t exist or may have been moved. Browse our main catalog or contact support below.
      </p>

      <div className="flex flex-wrap justify-center items-center gap-4 max-w-lg w-full">
        <Link
          href="/"
          className="bg-neutral-900 text-white px-6 py-3.5 font-bold uppercase text-xs tracking-wider hover:bg-red-600 transition-colors rounded-xl shadow-md"
        >
          Return Home
        </Link>
        <Link
          href="/shop"
          className="bg-red-600 text-white px-6 py-3.5 font-bold uppercase text-xs tracking-wider hover:bg-red-700 transition-colors rounded-xl shadow-md"
        >
          Browse Shop Catalog
        </Link>
        <Link
          href="/faq"
          className="bg-neutral-100 border border-neutral-200 text-neutral-800 px-6 py-3.5 font-bold uppercase text-xs tracking-wider hover:bg-neutral-200 transition-colors rounded-xl"
        >
          Read FAQs
        </Link>
        <Link
          href="/contact"
          className="bg-neutral-100 border border-neutral-200 text-neutral-800 px-6 py-3.5 font-bold uppercase text-xs tracking-wider hover:bg-neutral-200 transition-colors rounded-xl"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}

