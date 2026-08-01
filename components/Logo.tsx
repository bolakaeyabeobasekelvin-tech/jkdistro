"use client";
import Link from 'next/link';
import { motion } from 'motion/react';
import Image from 'next/image';

interface LogoProps {
  light?: boolean;
}

export function Logo({ light = false }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="relative w-10 h-10 flex items-center justify-center overflow-hidden"
      >
        <Image 
          src="https://drive.google.com/uc?export=view&id=15bOczt3Ci9gK010raoWXGTPAVrAabBbx"
          alt="JK Distro Logo"
          fill
          className="object-contain"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <span className={`text-xl font-black tracking-tighter uppercase hidden sm:block ${light ? 'text-white' : 'text-neutral-900'}`}>
        JK <span className="text-red-600">distro shop</span>
      </span>
    </Link>
  );
}

