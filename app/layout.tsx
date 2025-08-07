import 'aos/dist/aos.css';
import './globals.css';

import { Inter, Noto_Sans_JP } from 'next/font/google';
import { NhatCapDang } from '@/src/Layouts';
import AOSProvider from '@/src/providers/AOSProvider';
import TanstackProviders from '@/src/providers/tanstack-providers';

const notoSansJP = Noto_Sans_JP({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

const inter = Inter({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Loading Coin - Mantine Next.js template',
  description: 'Loading Coin with Clerk Authentication!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={`${notoSansJP.variable} ${inter.variable}`}>
        <AOSProvider>
          <TanstackProviders>
            <NhatCapDang>{children}</NhatCapDang>
          </TanstackProviders>
        </AOSProvider>
      </body>
    </html>
  );
}
