'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search, ChevronRight, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartDrawer } from './CartDrawer';
import { SearchOverlay } from './SearchOverlay';
import { Logo } from './Logo';
import { useCart } from '@/context/CartContext';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const { totalItems, cartOpen, setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Header Contact & Announcement Bar */}
      <div className="bg-neutral-950 text-white text-[11px] sm:text-xs py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-3 sm:gap-5 text-neutral-300">
            <a 
              href="mailto:contact@jkdistroshop.com" 
              className="flex items-center gap-1.5 hover:text-red-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span className="font-semibold lowercase">contact@jkdistroshop.com</span>
            </a>
            <span className="hidden md:inline text-neutral-700">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-neutral-400">
              <Phone className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>24/7 Sales Support</span>
            </div>
          </div>

          {/* Right: Urgent Shipping & Promo Message */}
          <div className="flex items-center gap-2 text-neutral-200">
            <span>Free Express Shipping Over $150</span>
            <span className="text-neutral-600">·</span>
            <span>Use Code <span className="font-black text-red-500 uppercase">JK20</span></span>
          </div>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-neutral-800 py-3 shadow-sm' : 'bg-black py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-neutral-400 hover:text-red-500 transition-colors p-1"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Logo light />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-extrabold text-neutral-300">
            <Link href="/" className="hover:text-red-500 transition-colors uppercase">Home</Link>
            <Link href="/shop" className="hover:text-red-500 transition-colors uppercase">Shop</Link>
            <Link href="/shop?category=flower" className="hover:text-red-500 transition-colors uppercase">Flower</Link>
            <Link href="/shop?category=vapes" className="hover:text-red-500 transition-colors uppercase">Vapes</Link>
            <Link href="/about" className="hover:text-red-500 transition-colors uppercase">About</Link>
            <Link href="/contact" className="hover:text-red-500 transition-colors uppercase">Contact</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              className="hidden sm:flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Search catalog...</span>
            </button>
            <button 
              className="sm:hidden text-neutral-400 hover:text-red-500 transition-colors p-1"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-6 h-6" />
            </button>
            <button 
              className="text-neutral-100 hover:text-red-500 transition-colors p-1 relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {isMounted ? totalItems : 0}
              </span>
            </button>
            <Link 
              href="/shop"
              className="hidden sm:flex items-center gap-2 bg-red-600 text-white px-5 py-2 text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors rounded-sm shadow-sm"
            >
              Order Now
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-black border-r border-neutral-800 z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-5 flex items-center justify-between border-b border-neutral-800">
                <span className="font-bold text-lg tracking-tight text-white">MENU</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white bg-neutral-900 rounded-sm transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-grow p-6 flex flex-col gap-4 text-base font-bold overflow-y-auto">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between border-b border-neutral-800 pb-3 text-neutral-300 hover:text-red-500">
                  Home <ChevronRight className="w-4 h-4 text-neutral-600" />
                </Link>
                <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between border-b border-neutral-800 pb-3 text-neutral-300 hover:text-red-500">
                  Shop Catalog <ChevronRight className="w-4 h-4 text-neutral-600" />
                </Link>
                <Link href="/shop?category=flower" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between border-b border-neutral-800 pb-3 text-neutral-300 hover:text-red-500">
                  Premium Flower <ChevronRight className="w-4 h-4 text-neutral-600" />
                </Link>
                <Link href="/shop?category=vapes" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between border-b border-neutral-800 pb-3 text-neutral-300 hover:text-red-500">
                  Disposables & Vapes <ChevronRight className="w-4 h-4 text-neutral-600" />
                </Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between border-b border-neutral-800 pb-3 text-neutral-300 hover:text-red-500">
                  About <ChevronRight className="w-4 h-4 text-neutral-600" />
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between pb-3 text-neutral-300 hover:text-red-500">
                  Contact <ChevronRight className="w-4 h-4 text-neutral-600" />
                </Link>
              </div>
              <div className="p-6 mt-auto">
                <Link 
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full bg-red-600 text-white py-4 font-bold uppercase tracking-wider hover:bg-red-700 transition-colors rounded-sm shadow-md"
                >
                  Order Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
