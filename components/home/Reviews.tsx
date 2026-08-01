'use client';

import { Star, CheckCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const reviews = [
  { id: 1, name: "Alex M.", date: "2 days ago", content: "The premium flower is incredible. Perfectly cured and smokes so smooth. Delivery was fast and the packaging is very discreet.", rating: 5, verified: true },
  { id: 2, name: "Sarah J.", date: "1 week ago", content: "Tried the new disposable vapes and it completely changed my routine. Excellent quality, great flavors, and lasts a long time.", rating: 5, verified: true },
  { id: 3, name: "Michael T.", date: "2 weeks ago", content: "Best top-shelf strains I've found stateside. Vibrant colors, sticky, and ships much faster than my previous plug.", rating: 5, verified: true },
  { id: 4, name: "Jessica R.", date: "3 weeks ago", content: "Customer service is top notch. Had an issue with my order and they fixed it immediately. Highly recommend JK distro shop.", rating: 5, verified: true },
  { id: 5, name: "David L.", date: "1 month ago", content: "The 7G flower specials are unbeatable in value and quality. I've tried many others and always come back.", rating: 5, verified: true },
  { id: 6, name: "Chris P.", date: "1 month ago", content: "Shipping to Texas was incredibly fast. Products are 100% legit and high quality. Will be ordering again.", rating: 5, verified: true },
  { id: 7, name: "Amanda W.", date: "2 months ago", content: "Love the variety of disposables. The live resin options are so flavorful and potent.", rating: 5, verified: true },
  { id: 8, name: "Ryan B.", date: "2 months ago", content: "Very clean burn on the premium ounces. You can tell they care about their sourcing.", rating: 5, verified: true },
  { id: 9, name: "Tyler H.", date: "3 months ago", content: "Consistently good quality. Never had a bad batch. The wholesale pricing is also very fair.", rating: 5, verified: true }
];

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovered, nextSlide]);

  return (
    <section className="py-12 md:py-16 bg-black relative border-t border-neutral-900 overflow-hidden">
      <Image
        src="https://drive.google.com/uc?export=view&id=1EI4JKas6sHyPCC7NY5rNZkXRGDrS-UtC"
        alt="Reviews Background"
        fill
        quality={80}
        className="object-cover object-center opacity-40"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#00B67A]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00B67A]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="font-black text-2xl md:text-3xl tracking-tighter text-white">Trustpilot</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-6 md:w-8 md:h-8 bg-[#00B67A] flex items-center justify-center rounded-sm">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-white fill-white" />
                </div>
              ))}
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4 uppercase">Real Customer Experiences</h2>
          <p className="text-neutral-400 font-medium text-sm md:text-base">Excellent 4.9/5 based on 1,248 verified reviews</p>
        </div>

        {/* Revolution Slider Container */}
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-12 h-12 bg-white/10 hover:bg-[#00B67A] border border-white/20 hover:border-[#00B67A] text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-12 h-12 bg-white/10 hover:bg-[#00B67A] border border-white/20 hover:border-[#00B67A] text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Window */}
          <div className="overflow-hidden px-4 md:px-0 py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "anticipate" }}
                className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-3xl shadow-2xl relative"
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5" />
                
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  {/* Left Column: Rating & Meta */}
                  <div className="flex-shrink-0 flex flex-col gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="bg-[#00B67A] p-1 rounded-sm">
                           <Star className="w-4 h-4 md:w-5 md:h-5 text-white fill-white" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="font-bold text-lg md:text-xl text-white flex items-center gap-2">
                        {reviews[currentIndex].name}
                      </p>
                      <p className="text-xs md:text-sm text-neutral-400 mt-1">{reviews[currentIndex].date}</p>
                    </div>
                    {reviews[currentIndex].verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] md:text-xs uppercase tracking-wider font-bold text-[#00B67A] bg-[#00B67A]/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full w-max">
                        <CheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5" /> Verified Buyer
                      </span>
                    )}
                  </div>

                  {/* Right Column: Content */}
                  <div className="flex-grow md:border-l md:border-neutral-800 md:pl-6">
                    <p className="text-lg md:text-xl text-neutral-300 font-medium leading-relaxed italic">
                      &quot;{reviews[currentIndex].content}&quot;
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center items-center gap-2 md:gap-3 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index 
                    ? 'w-8 h-2 bg-[#00B67A]' 
                    : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
