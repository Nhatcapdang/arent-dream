import * as React from 'react';
import { motion } from 'framer-motion';
import { NAV_MENU } from '../helper';
import MenuItem from './menuItem';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    y: 0,
    opacity: 1,
    display: 'block',
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    y: 50,
    opacity: 0,
    display: 'none',
  },
};

export const Navigation = ({ toggle }: any) => (
  <motion.div
    variants={variants}
    className=" absolute top-[35px] -right-[3px] w-[280px] -z-10 flex justify-center items-center"
  >
    <motion.ul className="w-full overflow-hidden">
      {NAV_MENU.map((item, idx) => (
        <MenuItem {...item} key={idx} toggle={toggle} />
      ))}
    </motion.ul>
  </motion.div>
);
