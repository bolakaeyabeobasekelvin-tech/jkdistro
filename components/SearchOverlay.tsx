'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleTermClick = (term: string) => {
    router.push(`/shop?search=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col"
        >
          <div className="max-w-4xl w-full mx-auto px-4 py-6 flex items-center justify-between border-b border-neutral-200">
            <form onSubmit={handleSearch} className="flex-grow relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search flower, vapes, strains..."
                className="w-full bg-transparent border-none outline-none text-2xl md:text-4xl font-light text-neutral-900 pl-12 py-4 placeholder:text-neutral-300"
              />
            </form>
            <button 
              onClick={handleClose}
              className="p-3 text-neutral-500 hover:text-red-700 bg-neutral-100 hover:bg-neutral-200 rounded-sm ml-4 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="max-w-4xl w-full mx-auto px-4 py-12 flex-grow overflow-y-auto">
             <div className="text-neutral-500 text-sm uppercase tracking-wider font-medium mb-6">Popular Searches</div>
             <div className="flex flex-wrap gap-3">
               {['Indica', 'Sativa', 'Hybrid', 'Disposables', 'Pre-rolls', 'Live Resin'].map((term) => (
                 <button 
                   key={term} 
                   onClick={() => handleTermClick(term)}
                   className="px-5 py-2 bg-neutral-100 text-neutral-700 hover:text-red-700 hover:bg-red-50 transition-colors rounded-sm text-sm border border-neutral-200 font-medium"
                 >
                   {term}
                 </button>
               ))}
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
