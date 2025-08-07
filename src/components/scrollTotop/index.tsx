'use client';

import { ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useWindowScroll } from '@mantine/hooks';

export default function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <AnimatePresence>
      {scroll.y > 10 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollTo({ y: 0 })}
          className="fixed bottom-1/2 right-[5%] z-50 w-12 h-12 rounded-full flex items-center justify-center border border-gray-400 cursor-pointer"
        >
          <ChevronUp className="w-6 h-6 text-gray-400" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
