'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Zap, TrendingUp, Search, Menu } from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Latest', href: '/articles', icon: Zap },
    { label: 'Trending', href: '/category', icon: TrendingUp },
    { label: 'Search', href: '/search', icon: Search },
    { label: 'Menu', href: '/explore', icon: Menu },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-around h-16 px-2 pb-safe">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-sans font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
