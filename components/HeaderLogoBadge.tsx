'use client';

import Image from 'next/image';

interface HeaderLogoBadgeProps {
  light?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function HeaderLogoBadge({ light = true, className = '', size = 'md' }: HeaderLogoBadgeProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8 md:w-10 md:h-10',
    lg: 'w-10 h-10 md:w-14 md:h-14',
  };

  const textSizes = {
    sm: 'text-xs md:text-sm font-black tracking-tighter uppercase',
    md: 'text-base md:text-xl font-black tracking-tighter uppercase',
    lg: 'text-xl md:text-3xl font-black tracking-tighter uppercase',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 md:gap-3 px-4 py-2 md:px-5 md:py-2.5 rounded-2xl backdrop-blur-md border ${
      light 
        ? 'bg-black/60 border-white/20 text-white shadow-2xl' 
        : 'bg-white/90 border-neutral-200 text-neutral-900 shadow-lg'
    } ${className}`}>
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <Image
          src="https://drive.google.com/uc?export=view&id=15bOczt3Ci9gK010raoWXGTPAVrAabBbx"
          alt="JK DISTRO SHOP Logo"
          fill
          className="object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
      <span className={`${textSizes[size]}`}>
        JK <span className="text-red-600">DISTRO SHOP</span>
      </span>
    </div>
  );
}
