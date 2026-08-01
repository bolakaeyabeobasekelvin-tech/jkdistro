'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

const faqs = [
  {
    question: "Is JK distro legit?",
    answer: "Yes, absolutely! JK Distro is a licensed distributor providing premium quality, lab-tested THCa flower and vapes. Thousands of satisfied customers across the country trust JK Distro for top-shelf flower and disposable vapes."
  },
  {
    question: "How long does JK distro take to ship?",
    answer: "All JK Distro orders are processed within 24 hours. Standard shipping typically takes 3-5 business days ($15), Advanced takes 2 days ($25), and Priority takes 24 hours ($50)."
  },
  {
    question: "Does JK distro ID?",
    answer: "Yes. In accordance with federal and state regulations, JK Distro requires age verification to ensure all customers are 21+ of legal age to purchase hemp products."
  },
  {
    question: "Is JK distro sprayed?",
    answer: "No! JK Distro flower is 100% naturally grown and never sprayed with synthetic chemicals, artificial terpenes, or heavy metals. We pride ourselves on pure, clean, lab-tested quality."
  },
  {
    question: "Where is JK distro located?",
    answer: "JK Distro's main distribution center is based in California, giving us direct access to premier boutique farms and craft growers across the region."
  },
  {
    question: "Does JK distro ship to Texas?",
    answer: "Yes, JK Distro ships to Texas and nationwide across all eligible US states in full compliance with the 2018 Federal Farm Bill."
  },
  {
    question: "What are JK distros wholesale prices?",
    answer: "JK Distro offers highly competitive wholesale pricing tiers for verified business owners. Contact our sales team via our Contact page or email contact@jkdistroshop.com to unlock bulk wholesale catalogs."
  },
  {
    question: "Where does JK distro ship from?",
    answer: "All JK Distro packages are vacuum-sealed in double odor-proof bags and shipped directly from our secure fulfillment center in California with tracking included."
  }
];

export function Faq({ limit }: { limit?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayedFaqs = limit ? faqs.slice(0, limit) : faqs;

  // FAQ Schema for Search Engine Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: displayedFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 sm:py-24 bg-neutral-50/60 border-t border-b border-neutral-200/80 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Title & Compact High-Quality Image Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" /> Help & Support
            </div>

            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 mb-3 leading-tight">
              JK Distro <br className="hidden sm:inline" /><span className="text-red-600">Frequently Asked</span> Questions
            </h2>

            <p className="text-neutral-600 font-medium text-xs sm:text-sm leading-relaxed mb-6">
              Everything you need to know about JK Distro products, ordering, discreet 24-hr shipping, and lab-tested quality.
            </p>

            {/* Compact Image Card for Crisp Visibility */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-md aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] w-full mb-6 group bg-neutral-900">
              <Image
                src="https://drive.google.com/uc?export=view&id=1S4vuZLtBrk5zZETPcLXKBTmY4X-zAjSZ"
                alt="JK Distro Customer Support & Products"
                fill
                quality={100}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-black uppercase tracking-widest bg-red-600 text-white px-2.5 py-1 rounded-md">
                  Lab Tested & Verified
                </span>
                <p className="text-xs font-bold text-neutral-200 mt-2">
                  100% Farm Bill Compliant Hemp
                </p>
              </div>
            </div>

            {/* Direct Contact Support Box */}
            <div className="p-4 bg-white border border-neutral-200 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase text-neutral-900">Still have questions?</h4>
                  <p className="text-[11px] text-neutral-500 font-medium">contact@jkdistroshop.com</p>
                </div>
              </div>
              <Link
                href="/contact"
                className="p-2 bg-neutral-900 text-white hover:bg-red-600 rounded-xl transition-colors text-xs font-bold flex items-center gap-1 shrink-0"
                aria-label="Contact support"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: FAQ Accordion List */}
          <div className="lg:col-span-7 space-y-3.5">
            {displayedFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen 
                      ? 'bg-white border-red-500 shadow-md ring-1 ring-red-500/20' 
                      : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-xs'
                  }`}
                >
                  <button
                    className="w-full px-5 py-4.5 sm:px-6 sm:py-5 flex justify-between items-center gap-4 text-left focus:outline-none"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="font-extrabold text-sm sm:text-base text-neutral-900 leading-snug">
                      {faq.question}
                    </span>
                    <div className={`p-1.5 rounded-full transition-colors shrink-0 ${isOpen ? 'bg-red-100 text-red-600' : 'bg-neutral-100 text-neutral-500'}`}>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                      />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-neutral-600 font-medium text-xs sm:text-sm leading-relaxed border-t border-neutral-100 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
