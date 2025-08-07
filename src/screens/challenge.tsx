'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FadeUp, LineChart } from '../components';
import { data, DATA } from '../constants/fakeDate';
import { useDiary, useInfiniteData } from '../hooks';
import { cn } from '../utils/cn';
import { formatISOToCustom } from '../utils/datetime';
import { generateRandomData } from '../utils/helper';

export default function Challenge() {
  const [selected, setSelected] = useState<number>(0);

  const { mutateAsync, isPending } = useDiary();

  const { data: diaryData, loadMore } = useInfiniteData({
    fetchFn: mutateAsync,
    debounceDelay: 500,
  });

  const chartData = {
    ...data,
    datasets: [
      {
        ...data.datasets[0],
        data: generateRandomData(),
      },
      {
        ...data.datasets[1],
        data: generateRandomData(),
      },
    ],
  };

  return (
    <FadeUp className="container-tablet flex flex-col gap-5">
      <div />
      <div />
      {/* Body Record */}
      <div className="flex max-sm:flex-wrap gap-4 justify-between items-center">
        {DATA.map((item, index) => (
          <div
            key={index}
            className=" aspect-square max-w-[288px] w-full h-full max-sm:m-auto"
          >
            <div className="relative h-full w-full">
              <Image
                src={item.image}
                alt="my-recommend"
                fill
                objectFit="cover"
              />
              <div className="absolute w-full h-full bg-black/80 border-primary-300 border-[20px] text-center flex flex-col justify-center items-center">
                <p className="text-primary-300 text-[25px]/[30px] font-inter tracking-normal-2 mb-2.5">
                  {item.title}
                </p>
                <p className="text-white text-sm/5 font-inter font-light bg-primary-400 max-w-[160px] w-full">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Body Record */}
      <div className="bg-gray-600  p-5">
        <div className="flex items-center mb-1">
          <h1 className="font-inter text-mb/[18px] tracking-wider-2 text-white max-w-[96px]">
            BODY RECORD
          </h1>
          <h2 className="text-white text-mb/[27px] font-inter tracking-[0.11px]">
            2021.05.21
          </h2>
        </div>
        <LineChart data={chartData} className="py-4" />
        <div className="flex gap-5">
          {['日', '週', '月', '年'].map((label, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                'font-noto-sans-jp font-light text-mb/[18px] tracking-wider text-primary-300 w-[56px] h-6 bg-white rounded-full cursor-pointer transition-all duration-200',
                {
                  'text-white bg-primary-300': selected === index,
                }
              )}
              onClick={() => setSelected(index)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {/* My Exercise */}
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
          <div>
            {Array.from({ length: 10 }).map((_, index) => (
              <Exercise key={index} />
            ))}
          </div>
          <div>
            {Array.from({ length: 10 }).map((_, index) => (
              <Exercise key={index} />
            ))}
          </div>
        </div>
      </div>
      {/* My Diary */}
      <div>
        <h1 className="font-inter text-[22px]/[27px] tracking-wider-2 text-gray-500">
          MY DIARY
        </h1>
        <div className="flex flex-wrap gap-3 max-h-[750px] overflow-auto justify-center">
          {diaryData.map((item, index) => (
            <div
              className="border-2 border-gray-300 p-4 text-gray-500 max-w-[229px] w-full aspect-square"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index}
              data-aos-offset={-10000000}
              data-aos-once="true"
            >
              <h1 className="font-inter text-lg/[22px] tracking-[0.09px] max-w-[130px]">
                {formatISOToCustom(item.createdAt, 'yyyy.MM.dd HH:mm')}
              </h1>
              <div className="text-xs/[17px] font-noto-sans-jp tracking-[0.06px] ">
                <h2>私の日記の記録が一部表示されます。</h2>
                <p className="line-clamp-5">
                  テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-6 sm:mt-0">
        <button
          onClick={loadMore}
          type="button"
          className={cn(
            'primary-gradient text-white text-base sm:text-lg font-noto-sans-jp leading-relaxed sm:leading-[26px] max-w-[296px] w-full h-12 sm:h-[56px] rounded-[5px] cursor-pointer active:translate-y-2 transition-all duration-100',
            {
              'opacity-50 cursor-not-allowed': isPending,
            }
          )}
        >
          自分の日記をもっと見る
        </button>
      </div>
      <div />
      <div />
    </FadeUp>
  );
}

const Exercise = () => {
  return (
    <div className="flex  gap-2 w-full border-b border-gray-400 py-1">
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
      <div />
    </div>
  );
};
