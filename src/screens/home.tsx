'use client';

import { useState } from 'react';
import Image from 'next/image';
import { D01 } from '@/public/images';
import Svgs from '@/public/svgs';
import Button from '../common/button';
import { FadeUp, LineChart, RingProgress } from '../components';
import { ProfileType } from '../constants/enum';
import { DATA_CHART } from '../constants/fakeDate';
import { useInfiniteData, useProfile } from '../hooks';
import { useChartData } from '../hooks/useChartData';
import { cn } from '../utils/cn';
import { formatISOToCustom } from '../utils/datetime';

const DATA = [
  {
    title: ProfileType.MORNING,
    icon: <Svgs.IconKnife />,
  },
  {
    title: ProfileType.LUNCH,
    icon: <Svgs.IconKnife />,
  },
  {
    title: ProfileType.DINNER,
    icon: <Svgs.IconKnife />,
  },
  {
    title: ProfileType.SNACK,
    icon: <Svgs.IconCup />,
  },
];

export default function Home() {
  const { mutateAsync: getProfile, isPending } = useProfile();
  const { chartData, regenerateData } = useChartData(DATA_CHART);
  const [ringProgress, setRingProgress] = useState<number>(75);

  const {
    filteredData: profileData,
    isFiltered,
    loadMore,
    filterData,
    clearFilter,
  } = useInfiniteData({
    fetchFn: getProfile,
    debounceDelay: 500,
    onFilter: (allData: Profile[], filterValue: ProfileType) => {
      return allData.filter((item) => item.label === filterValue);
    },
  });

  return (
    <FadeUp className="flex flex-col gap-5">
      <div
        className={cn(
          'max-h-[312px] flex max-md:flex-col  h-[312px] bg-gray-600',
          'max-md:h-[624px] max-md:max-h-[624px]'
        )}
      >
        <div
          className={cn(
            'relative max-lg:w-full max-lg:min-w-[250px] h-full w-full '
          )}
        >
          <Image src={D01} alt="D01" fill objectFit="cover" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <RingProgress percentage={ringProgress} size={180} strokeWidth={1}>
              {(percentage) => (
                <div>
                  <p className="text-white font-inter drop-shadow-lg">
                    <span className="text-lg">05/21</span>{' '}
                    <span className="text-3xl">{percentage}%</span>
                  </p>
                </div>
              )}
            </RingProgress>
          </div>
        </div>
        <LineChart data={chartData} className="p-4" />
      </div>
      <div className="container-tablet px-4 sm:px-0 flex flex-col gap-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {DATA.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="h-[100px] w-[100px] sm:h-[136px] sm:w-[136px] primary-gradient flex items-center justify-center m-auto cursor-pointer"
              style={{
                clipPath:
                  'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
              onClick={() => {
                filterData(item.title);
                regenerateData();
                setRingProgress(Math.floor(Math.random() * 100));
              }}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="scale-75 sm:scale-100">{item.icon}</div>
                <p className="text-white text-sm sm:text-xl font-inter leading-tight sm:leading-[24px] text-center">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 sm:mt-0 max-h-[1000px] overflow-auto">
          {profileData.map((item, index) => (
            <Item key={index} item={item} index={index} />
          ))}
        </div>
        <div className=" mt-6 sm:mt-0 flex gap-2 justify-center">
          <Button
            label="記録をもっと見る"
            isPending={isPending}
            loadMore={loadMore}
          />
          {isFiltered && (
            <Button
              label="Reset"
              isPending={isPending}
              loadMore={clearFilter}
            />
          )}
        </div>
      </div>
      <div />
      <div />
    </FadeUp>
  );
}

const Item = ({ item, index }: { item: Profile; index: number }) => {
  return (
    <div
      className="relative aspect-square"
      data-aos="fade-up"
      data-aos-delay={index}
      data-aos-offset={-10000000}
      data-aos-once="true"
    >
      <Image src={item.image} alt={item.label} fill objectFit="cover" />
      <p className="bg-primary-300 text-white text-xs sm:text-mb font-inter leading-tight sm:leading-[18px] tracking-wider-2 absolute bottom-0 left-0 py-1.5 px-2 sm:py-2 sm:px-3">
        {formatISOToCustom(item.createdAt, 'dd.MM')}.{item.label}
      </p>
    </div>
  );
};
