'use client';

import Link from 'next/link';
import { Mail, Globe, MessageCircle } from 'lucide-react';
import { useState } from 'react';

import { Logo } from './Logo';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-neutral-900 pt-16 pb-0 text-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <div className="mb-6">
              <Logo light />
            </div>
            <p className="text-neutral-400 mb-6 leading-relaxed font-medium">
              Elevating your experience with premium, curated flower and disposable vapes designed for the modern connoisseur.
            </p>
            <div className="flex gap-4">
              <Link href="/contact" aria-label="Official Website Support" className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-500/50 transition-colors">
                <Globe className="w-4 h-4" />
              </Link>
              <Link href="/contact" aria-label="Customer Support Messaging" className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-500/50 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-neutral-400 hover:text-red-500 transition-colors font-medium">All Products</Link></li>
              <li><Link href="/shop?category=flower" className="text-neutral-400 hover:text-red-500 transition-colors font-medium">Premium Flower</Link></li>
              <li><Link href="/shop?category=vapes" className="text-neutral-400 hover:text-red-500 transition-colors font-medium">Disposables & Vapes</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Information</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-neutral-400 hover:text-red-500 transition-colors font-medium">About Us</Link></li>
              <li><Link href="/faq" className="text-neutral-400 hover:text-red-500 transition-colors font-medium">FAQ</Link></li>
              <li><Link href="/blog" className="text-neutral-400 hover:text-red-500 transition-colors font-medium">Journal</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-red-500 transition-colors font-medium">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Newsletter</h4>
            <p className="text-neutral-400 mb-4 leading-relaxed font-medium">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 pl-11 pr-4 py-3 outline-none focus:border-red-500/50 transition-colors rounded-xl font-medium"
                />
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-red-700 text-white font-black uppercase tracking-widest py-3 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-70"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
              {status === 'success' && <p className="text-red-500 text-xs font-medium">Thanks for subscribing!</p>}
              {status === 'error' && <p className="text-red-500 text-xs font-medium">Failed to subscribe. Please try again.</p>}
            </form>
          </div>
        </div>

      </div>
      
      {/* Immersive Bottom Bar */}
      <div className="h-12 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 bg-neutral-900 z-10 text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <span className="md:hidden">&copy; {new Date().getFullYear()} JK distro shop</span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          <span className="hidden md:inline">&copy; {new Date().getFullYear()} JK distro shop</span>
          <Link href="/privacy" className="hover:text-red-500 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-red-500 transition-colors">Terms of Service</Link>
          <Link href="/shipping" className="hover:text-red-500 transition-colors">Shipping & Returns</Link>
        </div>
      </div>
    </footer>
  );
}
