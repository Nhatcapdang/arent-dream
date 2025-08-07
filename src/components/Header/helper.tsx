import Svgs from '@/public/svgs';

export const NAV_MENU = [
  {
    title: '自分の記録',
    href: '/',
  },
  {
    title: '体重グラフ',
    href: '/about-us',
  },
  {
    title: '目標',
    href: '/community',
  },
  {
    title: '選択中のコース',
    href: '/get-in-touch',
  },
  {
    title: 'コラム一覧',
    href: '/note',
  },
  {
    title: '設定',
    href: '/faq',
  },
];

export const HEADER = [
  {
    href: '/',
    icon: <Svgs.IconNote />,
    title: '自分の記録',
  },
  {
    href: '/challenge',
    icon: <Svgs.IconMedal />,
    title: 'チャレンジ',
  },
  {
    href: '/note',
    icon: <Svgs.ExclamationMark />,
    title: 'お知らせ',
    count: 1,
  },
];
