'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Zap, TrendingUp, Search } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { t } from '@/app/lib/translations';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const lang = language as 'en' | 'ml';

  const navItems = [
    { labelKey: 'home', href: '/', icon: Home },
    { labelKey: 'latest', href: '/latest', icon: Zap },
    { labelKey: 'trending', href: '/trending', icon: TrendingUp },
    { labelKey: 'search', href: '/search', icon: Search },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-around h-16 px-2 pb-safe">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.labelKey}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-sans font-medium">{t(item.labelKey as any, lang)}</span>
          </Link>
        );
      })}
    </div>
  );
}
