'use client';

import { useEffect } from 'react';
import AOS from 'aos';

const AOSProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({});
  }, []);

  return <>{children}</>;
};

export default AOSProvider;
