'use client';

import React from 'react';
import { ShoppingBag, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';

export function StickyCartWidget() {
  const {
    totalItems,
    subtotal,
    isMinOrderMet,
    remainingForMinOrder,
    minOrderAmount,
    setCartOpen,
  } = useCart();

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed bottom-24 left-4 sm:left-6 z-40 flex items-center gap-2 pointer-events-auto"
      >
        <button
          onClick={() => setCartOpen(true)}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl transition-all border transform hover:scale-105 active:scale-95 ${
            isMinOrderMet
              ? 'bg-neutral-900 border-neutral-800 text-white hover:bg-black ring-2 ring-emerald-500/50'
              : 'bg-neutral-900 border-neutral-800 text-white hover:bg-black ring-2 ring-red-500/50'
          }`}
        >
          <div className="relative">
            <div className="p-2 bg-red-600 text-white rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="absolute -top-1.5 -right-1.5 bg-white text-neutral-900 font-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-neutral-900">
              {totalItems}
            </span>
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-black text-sm text-white">${subtotal.toFixed(2)}</span>
              {isMinOrderMet ? (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded uppercase flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Min Met
                </span>
              ) : (
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded uppercase flex items-center gap-0.5">
                  <AlertTriangle className="w-3 h-3 text-amber-400" /> ${remainingForMinOrder.toFixed(0)} away
                </span>
              )}
            </div>
            <p className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
              {isMinOrderMet ? 'Ready to Checkout' : `$${minOrderAmount} Min Order Required`}
            </p>
          </div>

          <div className="pl-1 border-l border-neutral-800 text-neutral-400">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
