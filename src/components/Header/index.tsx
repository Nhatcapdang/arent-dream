'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Svgs from '@/public/svgs';
import { cn } from '@/src/utils/cn';
import { HEADER } from './helper';
import { Nav } from './nav/Index';

export default function Header() {
  const pathname = usePathname();
  const isActive = useCallback(
    (href: string) => {
      return pathname === href;
    },
    [pathname]
  );
  return (
    <header className="bg-gray-500 sticky top-0 z-50 shadow-2xs">
      <div className="container-tablet">
        <div className="h-[64px]">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
              <Link href="/">
                <Svgs.Healthy />
              </Link>
            </div>
            <div className="flex items-center gap-10">
              {HEADER.map((item, index) => {
                return (
                  <Link
                    href={item.href}
                    key={index}
                    className={cn(
                      'flex items-center gap-2 cursor-pointer font-noto-sans-jp leading-6 text-white font-light',
                      {
                        'text-primary-300': isActive(item.href),
                      }
                    )}
                  >
                    <span className="relative">
                      {item.icon}
                      {item.count && (
                        <p className="absolute -top-1 -right-2 bg-primary-500 text-white text-[10px] font-inter rounded-full w-4 h-4 flex items-center justify-center">
                          {item.count}
                        </p>
                      )}
                    </span>{' '}
                    {item.title}
                  </Link>
                );
              })}
              <Nav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
