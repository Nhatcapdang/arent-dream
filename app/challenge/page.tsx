import { Metadata } from 'next';
import { Challenge } from '@/src/screens';

export const metadata: Metadata = {
  title: 'Challenge',
  description: 'Challenge',
};

export default function Page() {
  return <Challenge />;
}
