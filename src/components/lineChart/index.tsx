'use client';

import React, { memo } from 'react';
import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  className?: string;
  data: ChartData<'line'>;
}

const LineChart: React.FC<LineChartProps> = ({ className = '', data }) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    font: {
      family: 'Noto Sans JP',
      weight: 'lighter',
      size: 8,
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ffcc21',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 8,
          weight: 'lighter' as const,
        },
        bodyFont: {
          size: 8,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: '#777',
        },
        ticks: {
          color: '#fff',
        },
      },
      y: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <Line data={data} options={options} />
    </div>
  );
};

export default memo(LineChart);
