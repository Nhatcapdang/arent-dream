'use client';

import { Footer, Header } from '../components';
import ScrollToTop from '../components/scrollTotop';

function NhatCapDang({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="container-2 min-h-[calc(100vh-192px)]">{children}</div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
export default NhatCapDang;
