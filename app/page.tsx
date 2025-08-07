import { Metadata } from 'next';
import { Home } from '@/src/screens';

export const metadata: Metadata = {
  title: 'My profile',
  description: 'My profile',
};

export default function Page() {
  return <Home />;
}
