import { useCallback, useState } from 'react';
import { ChartData } from 'chart.js';
import { DATA_CHART } from '../constants/fakeDate';
import { generateRandomData } from '../utils/helper';

export const useChartData = (initialData: ChartData<'line'> = DATA_CHART) => {
  const [chartData, setChartData] = useState<ChartData<'line'>>(initialData);

  const regenerateData = useCallback(() => {
    setChartData({
      ...initialData,
      datasets: initialData.datasets.map((dataset) => ({
        ...dataset,
        data: generateRandomData(),
      })),
    });
  }, [initialData]);

  const updateChartData = useCallback((newData: ChartData<'line'>) => {
    setChartData(newData);
  }, []);

  return {
    chartData,
    regenerateData,
    updateChartData,
  };
};
