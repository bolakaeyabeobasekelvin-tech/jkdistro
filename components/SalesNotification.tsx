'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, CheckCircle2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import productsData from '@/data/scraped-products.json';

interface RecentSale {
  id: string;
  name: string;
  location: string;
  productTitle: string;
  variant: string;
  timeAgo: string;
  image: string;
  slug: string;
}

const CUSTOMER_PROFILES = [
  { name: 'Marcus T.', location: 'Austin, TX', timeAgo: '2 minutes ago' },
  { name: 'Sarah K.', location: 'Miami, FL', timeAgo: '4 minutes ago' },
  { name: 'David L.', location: 'Los Angeles, CA', timeAgo: '7 minutes ago' },
  { name: 'Jessica R.', location: 'Denver, CO', timeAgo: '9 minutes ago' },
  { name: 'Brandon M.', location: 'Chicago, IL', timeAgo: '12 minutes ago' },
  { name: 'Elena P.', location: 'New York, NY', timeAgo: '15 minutes ago' },
  { name: 'Tyler W.', location: 'Seattle, WA', timeAgo: '18 minutes ago' },
  { name: 'Hannah B.', location: 'Atlanta, GA', timeAgo: '22 minutes ago' },
  { name: 'Chris V.', location: 'Dallas, TX', timeAgo: '25 minutes ago' },
  { name: 'Rachel D.', location: 'Phoenix, AZ', timeAgo: '30 minutes ago' },
];

export function SalesNotification() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Map real shop products to customer sales notifications
  const recentSalesList = useMemo<RecentSale[]>(() => {
    const products = productsData as Array<{
      id: string;
      title: string;
      slug: string;
      images: string[];
      category: string;
      variants?: Array<{ title: string }>;
    }>;

    if (!products || products.length === 0) return [];

    // Select prominent real products across gummies, flower, and vapes
    const selectedProducts = [
      products.find((p) => p.slug === 'albanese-gummy-bears-thca-gummies'),
      products.find((p) => p.slug === 'fruit-funk-thca-flower-indica'),
      products.find((p) => p.slug === 'camino-infused-gummies'),
      products.find((p) => p.slug === 'super-sour-diesel-thca-vape'),
      products.find((p) => p.slug === 'jolly-rancher-infused-gummies'),
      products.find((p) => p.slug === 'gush-mintz-thca-flower-indica'),
      products.find((p) => p.slug === 'gummy-sharks-thca-gummies'),
      products.find((p) => p.slug === 'shaq-xl-thca-gummies'),
      products.find((p) => p.slug === 'cbn-sleep-gummies'),
      products.find((p) => p.slug === 'trolli-gummy-pop-edibles'),
    ].filter(Boolean);

    return selectedProducts.map((p, idx) => {
      const profile = CUSTOMER_PROFILES[idx % CUSTOMER_PROFILES.length];
      const variantTitle = p!.variants && p!.variants.length > 0 ? p!.variants[0].title : 'Featured Pack';

      return {
        id: p!.id,
        name: profile.name,
        location: profile.location,
        productTitle: p!.title,
        variant: variantTitle,
        timeAgo: profile.timeAgo,
        image: p!.images[0] || 'https://picsum.photos/seed/jkdistro/200/200',
        slug: p!.slug,
      };
    });
  }, []);

  useEffect(() => {
    if (isDismissed || recentSalesList.length === 0) return;

    // First show after 3 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Loop through notifications
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % recentSalesList.length);
        setIsVisible(true);
      }, 1000); // Wait 1s before showing next
    }, 12000); // Every 12s

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed, recentSalesList.length]);

  if (isDismissed || recentSalesList.length === 0) return null;

  const currentSale = recentSalesList[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && currentSale && (
        <motion.div
          initial={{ x: -100, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -100, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="fixed bottom-5 left-4 sm:left-6 z-40 max-w-[320px] sm:max-w-[360px] pointer-events-auto"
        >
          <div className="bg-neutral-900 border border-neutral-800 text-white rounded-2xl p-3.5 shadow-2xl backdrop-blur-md bg-opacity-95 flex items-center gap-3 relative group">
            {/* Dismiss Button */}
            <button
              onClick={() => {
                setIsVisible(false);
                setIsDismissed(true);
              }}
              className="absolute -top-2 -right-2 bg-neutral-800 hover:bg-red-600 text-neutral-400 hover:text-white p-1 rounded-full border border-neutral-700 shadow-md transition-all"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Product Image */}
            <Link
              href={`/product/${currentSale.slug}`}
              className="relative w-14 h-14 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-neutral-700 block"
            >
              <Image
                src={currentSale.image}
                alt={currentSale.productTitle}
                fill
                className="object-contain p-1"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 bg-red-600 text-white p-0.5 rounded-tl-md">
                <ShoppingBag className="w-2.5 h-2.5" />
              </div>
            </Link>

            {/* Notification Content */}
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs font-bold text-white truncate">{currentSale.name}</span>
                <span className="text-[10px] text-neutral-400 truncate">in {currentSale.location}</span>
              </div>

              <Link
                href={`/product/${currentSale.slug}`}
                className="block text-xs font-semibold text-neutral-200 hover:text-red-400 transition-colors line-clamp-1 leading-snug"
              >
                Purchased {currentSale.productTitle} ({currentSale.variant})
              </Link>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-neutral-400 font-mono">{currentSale.timeAgo}</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5 uppercase tracking-wider">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Verified Order
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
