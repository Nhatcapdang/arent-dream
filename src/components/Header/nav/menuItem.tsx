import { useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { cn } from '@/src/utils/cn';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = ({
  title,
  href,
  toggle,
}: {
  title: string;
  href: string;
  toggle: any;
}) => {
  const pathname = usePathname();
  const isActive = useCallback(
    (href: string) => {
      return pathname === href;
    },
    [pathname]
  );
  return (
    <motion.li
      variants={variants}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      className={clsx(
        'cursor-pointer flex items-center bg-gray-400 hover:bg-gray-500 duration-100 '
      )}
    >
      <Link
        href={href}
        className={cn(
          ' w-full h-full p-4 font-noto-sans-jp text-lg leading-[26px] font-light text-white',
          {
            'text-primary-300': isActive(href),
          }
        )}
      >
        {title}
      </Link>
    </motion.li>
  );
};

export default MenuItem;
