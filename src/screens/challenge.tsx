'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { MyRecommend1, MyRecommend2, MyRecommend3 } from '@/public/images';
import Button from '../common/button';
import Tabs from '../common/tabs';
import { FadeUp, LineChart } from '../components';
import { TABS } from '../constants/enum';
import { useChartData, useDiary, useInfiniteData } from '../hooks';
import { cn } from '../utils/cn';
import { formatISOToCustom } from '../utils/datetime';

const TAB_CONFIG = [
  {
    value: TABS.BODY_RECORD,
    title: 'BODY RECORD',
    description: '自分のカラダの記録',
    image: MyRecommend1,
  },
  {
    value: TABS.MY_EXERCISE,
    title: 'MY EXERCISE',
    description: '自分の運動の記録',
    image: MyRecommend2,
  },
  {
    value: TABS.MY_DIARY,
    title: 'MY DIARY',
    description: '自分の日記',
    image: MyRecommend3,
  },
];

const TIME_PERIODS = ['日', '週', '月', '年'];

const EXERCISE_COUNT = 20;

export default function Challenge() {
  return (
    <FadeUp>
      <Tabs
        defaultTab={TABS.BODY_RECORD}
        className="flex flex-col gap-5 py-5 container-tablet"
      >
        <Tabs.List className="flex gap-4 justify-between ">
          {TAB_CONFIG.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              className="w-full cursor-pointer aspect-square max-w-[288px]"
            >
              <TypeDiary
                title={tab.title}
                description={tab.description}
                image={tab.image}
              />
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panels>
          <Tabs.Panel value={TABS.BODY_RECORD}>
            <BodyRecord />
          </Tabs.Panel>

          <Tabs.Panel value={TABS.MY_EXERCISE}>
            <MyExercise />
          </Tabs.Panel>

          <Tabs.Panel value={TABS.MY_DIARY}>
            <MyDiary />
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </FadeUp>
  );
}

const MyExercise = memo(() => {
  const exerciseItems = useMemo(
    () =>
      Array.from({ length: EXERCISE_COUNT }, (_, index) => (
        <Exercise key={`exercise-${index}`} index={index} />
      )),
    []
  );

  return (
    <div className="bg-gray-500 h-[264px] p-2.5">
      <div className="flex items-center mb-1">
        <h1 className="font-inter text-mb/[18px] tracking-wider-2 text-white max-w-[96px]">
          MY EXERCISE
        </h1>
        <h2 className="text-white text-mb/[27px] font-inter tracking-[0.11px]">
          2021.05.21
        </h2>
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-4 gap-10 overflow-y-auto h-[calc(100%-50px)]">
        <div>{exerciseItems.slice(0, EXERCISE_COUNT / 2)}</div>
        <div>{exerciseItems.slice(EXERCISE_COUNT / 2)}</div>
      </div>
    </div>
  );
});

const Exercise = memo(({ index: _index }: { index: number }) => {
  return (
    <div className="flex gap-2 w-full border-b border-gray-400 py-1">
      <p className="w-[10px] text-white -mt-[5px]">●</p>
      <div className="w-full">
        <h1 className="text-white font-inter font-light text-mb/[22px] tracking-[0.08px]">
          家事全般（立位・軽い）
        </h1>
        <h1 className="text-primary-300 font-inter text-mb/[18px] tracking-[0.08px]">
          26kcal
        </h1>
      </div>
      <p className="w-[60px] text-primary-300 font-inter text-mb/[18px] tracking-[0.09px]">
        10 min
      </p>
    </div>
  );
});

const BodyRecord = memo(() => {
  const [selected, setSelected] = useState<number>(0);
  const { chartData, regenerateData } = useChartData();

  const handlePeriodClick = useCallback(
    (index: number) => {
      setSelected(index);
      regenerateData();
    },
    [regenerateData]
  );

  const timePeriodButtons = useMemo(
    () =>
      TIME_PERIODS.map((label, index) => (
        <TimePeriodButton
          key={label}
          label={label}
          index={index}
          isSelected={selected === index}
          onClick={handlePeriodClick}
        />
      )),
    [selected, handlePeriodClick]
  );

  return (
    <div className="bg-gray-600 p-5">
      <div className="flex items-center mb-1">
        <h1 className="font-inter text-mb/[18px] tracking-wider-2 text-white max-w-[96px]">
          BODY RECORD
        </h1>
        <h2 className="text-white text-mb/[27px] font-inter tracking-[0.11px]">
          2021.05.21
        </h2>
      </div>
      <LineChart data={chartData} className="py-4" />
      <div className="flex gap-5">{timePeriodButtons}</div>
    </div>
  );
});

const TimePeriodButton = memo(
  ({
    label,
    index,
    isSelected,
    onClick,
  }: {
    label: string;
    index: number;
    isSelected: boolean;
    onClick: (index: number) => void;
  }) => {
    const handleClick = useCallback(() => {
      onClick(index);
    }, [onClick, index]);

    return (
      <button
        type="button"
        className={cn(
          'font-noto-sans-jp font-light text-mb/[18px] tracking-wider text-primary-300 w-[56px] h-6 bg-white rounded-full cursor-pointer transition-all duration-200',
          {
            'text-white bg-primary-300': isSelected,
          }
        )}
        onClick={handleClick}
      >
        {label}
      </button>
    );
  }
);

const MyDiary = memo(() => {
  const { mutateAsync, isPending } = useDiary();

  const { data: diaryData, loadMore } = useInfiniteData({
    fetchFn: mutateAsync,
    debounceDelay: 500,
  });

  const diaryItems = useMemo(
    () =>
      diaryData.map((item, index) => (
        <DiaryItem
          key={`diary-${item.id || index}`}
          item={item}
          index={index}
        />
      )),
    [diaryData]
  );

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-inter text-[22px]/[27px] tracking-wider-2 text-gray-500">
        MY DIARY
      </h1>
      <div>
        <div className="flex flex-wrap gap-3 max-h-[750px] h-full overflow-auto justify-center">
          {diaryItems}
        </div>
      </div>
      <div className="text-center mt-6 sm:mt-0">
        <Button
          label="自分の日記をもっと見る"
          isPending={isPending}
          loadMore={loadMore}
        />
      </div>
    </div>
  );
});

const DiaryItem = memo(({ item, index }: { item: any; index: number }) => {
  return (
    <div
      className="border-2 border-gray-300 p-4 text-gray-500 max-w-[229px] w-full aspect-square"
      data-aos="fade-up"
      data-aos-delay={index}
      data-aos-offset={-10000000}
      data-aos-once="true"
    >
      <h1 className="font-inter text-lg/[22px] tracking-[0.09px] max-w-[130px]">
        {formatISOToCustom(item.createdAt, 'yyyy.MM.dd HH:mm')}
      </h1>
      <div className="text-xs/[17px] font-noto-sans-jp tracking-[0.06px]">
        <h2>私の日記の記録が一部表示されます。</h2>
        <p className="line-clamp-5">
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…
        </p>
      </div>
    </div>
  );
});

const TypeDiary = memo(
  ({
    title,
    description,
    image,
  }: {
    title: string;
    description: string;
    image: StaticImageData;
  }) => {
    return (
      <div className="w-full h-full max-sm:m-auto">
        <div className="relative h-full w-full">
          <Image src={image} alt="my-recommend" fill objectFit="cover" />
          <div className="absolute w-full h-full bg-black/80 border-primary-300 border-[20px] text-center flex flex-col justify-center items-center">
            <p className="text-primary-300 text-[25px]/[30px] font-inter tracking-normal-2 mb-2.5">
              {title}
            </p>
            <p className="text-white text-sm/5 font-inter font-light bg-primary-400 max-w-[160px] w-full">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }
);
