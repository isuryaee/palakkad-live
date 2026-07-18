'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function BreakingTicker() {
  return (
    <div className="bg-red-600 text-white text-sm font-sans font-medium py-2 px-4 flex items-center overflow-hidden whitespace-nowrap">
      <div className="flex items-center shrink-0 pr-4 uppercase tracking-wider text-xs">
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        Breaking
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="animate-marquee inline-block whitespace-nowrap">
          <Link href="/news" className="inline-flex items-center hover:underline mx-4">
            Breaking news from Palakkad <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
          <Link href="/news" className="inline-flex items-center hover:underline mx-4">
            Stay updated with live coverage <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
          <Link href="/news" className="inline-flex items-center hover:underline mx-4">
            Follow the latest developments <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
          {/* Duplicate for seamless loop */}
          <span className="mx-4 text-white/50">•</span>
          <Link href="/news" className="inline-flex items-center hover:underline mx-4">
            Breaking news from Palakkad <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
          <Link href="/news" className="inline-flex items-center hover:underline mx-4">
            Stay updated with live coverage <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
          <Link href="/news" className="inline-flex items-center hover:underline mx-4">
            Follow the latest developments <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
