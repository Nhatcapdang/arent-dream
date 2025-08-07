import { Metadata } from 'next';
import { Note } from '@/src/screens';

export const metadata: Metadata = {
  title: 'Note',
  description: 'Note',
};

export default function Page() {
  return <Note />;
}
