import * as React from 'react';
import { useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from '@/src/utils';
import { MenuToggle } from './menuToggle';
import { Navigation } from './navigation';

const sidebar = {
  open: {
    transition: {
      type: 'spring' as const,
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    transition: {
      delay: 0.5,
      type: 'spring' as const,
      stiffness: 400,
      damping: 40,
    },
  },
};

export const Nav = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
      className="relative h-5 scale-125"
    >
      <motion.div className="background" variants={sidebar} />
      <Navigation toggle={() => toggleOpen()} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
