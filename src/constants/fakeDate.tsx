import { ChartData } from 'chart.js';
import { MyRecommend1, MyRecommend2, MyRecommend3 } from '@/public/images';

export const DATA = [
  {
    title: 'BODY RECORD',
    description: '自分のカラダの記録',
    image: MyRecommend1,
  },
  {
    title: 'MY EXERCISE',
    description: '自分の運動の記録',
    image: MyRecommend2,
  },
  {
    title: 'MY DIARY',
    description: '自分の日記',
    image: MyRecommend3,
  },
];

export const data: ChartData<'line'> = {
  labels: [
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
  ],
  datasets: [
    {
      data: [
        200, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500,
        6000, 6500,
      ],
      borderColor: '#FFCC21',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#FFCC21',
      pointRadius: 6,
      pointHoverRadius: 8,
    },
    {
      data: [
        1200, 1500, 1800, 1400, 1600, 2000, 1700, 1200, 1500, 1800, 1400, 1600,
        2000, 1700,
      ],
      borderColor: '#8FE9D0',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#8FE9D0',
      pointRadius: 6,
      pointHoverRadius: 8,
    },
  ],
};
