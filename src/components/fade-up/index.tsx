'use client';

import React from 'react';
import { motion as m } from 'framer-motion';

type IProps = {
  children: React.ReactNode;
  className?: string;
};
export default function FadeUp({ children, className }: IProps) {
  return (
    <m.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </m.div>
  );
}
