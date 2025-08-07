'use client';

import Image from 'next/image';
import {
  Column1,
  Column2,
  Column3,
  Column4,
  Column5,
  Column6,
  Column7,
  Column8,
} from '@/public/images';
import { FadeUp } from '../components';
import { useDiary, useInfiniteData } from '../hooks';
import { cn } from '../utils/cn';
import { formatISOToCustom } from '../utils/datetime';

export default function Note() {
  const { mutateAsync: getDiary, isPending } = useDiary();
  const { filteredData: diaryData, loadMore } = useInfiniteData({
    fetchFn: getDiary,
    debounceDelay: 500,
  });

  return (
    <FadeUp className="flex flex-col gap-5">
      <div />
      <div />
      <div className="container-tablet px-4 sm:px-0 flex flex-col gap-5 justify-between">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            {
              title: 'RECOMMENDED COLUMN',
              description: 'オススメ',
            },
            {
              title: 'RECOMMENDED DIET',
              description: 'ダイエット',
            },
            {
              title: 'RECOMMENDED BEAUTY',
              description: '美容',
            },
            {
              title: 'RECOMMENDED HEALTH',
              description: '健康',
            },
          ].map((_, index) => (
            <div
              className="bg-gray-600 p-5 h-[140px] text-center content-center"
              key={index}
            >
              <h1 className="text-primary-300 font-inter text-[22px]/[27px] max-md:text-sm max-sm:text-xs tracking-[0.11px] text-center">
                RECOMMENDED COLUMN
              </h1>
              <p className="border border-white max-w-[56px] mx-auto my-1.5" />
              <p className="text-white font-noto-sans-jp text-lg/[26px] ">
                オススメ
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 sm:mt-0 max-h-[700px] overflow-auto">
          {diaryData.map((item, index) => (
            <Item key={index} item={item} index={index} />
          ))}
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
            コラムをもっと見る
          </button>
        </div>
      </div>
      <div />
      <div />
    </FadeUp>
  );
}

const Item = ({ item, index }: { item: Diary; index: number }) => {
  return (
    <div>
      <div
        className="relative aspect-square"
        data-aos="fade-up"
        data-aos-delay={index}
        data-aos-offset={-10000000}
        data-aos-once="true"
      >
        <Image
          src={
            [
              Column1,
              Column2,
              Column3,
              Column4,
              Column5,
              Column6,
              Column7,
              Column8,
            ][index % 8]
          }
          alt={item.label}
          fill
          objectFit="cover"
        />
        <p className="bg-primary-300 text-white text-xs sm:text-mb font-inter leading-tight sm:leading-[18px] tracking-wider-2 absolute bottom-0 left-0 py-1.5 px-2 sm:py-2 sm:px-3">
          {formatISOToCustom(item.createdAt, 'yyyy.MM.dd HH:mm')}
        </p>
      </div>
      <h1 className="line-clamp-2 text-gray-500 text-mb/[22px] tracking-[0.08px] my-2 font-noto-sans-jp">
        魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…
      </h1>
      <p className="text-primary-400 font-noto-sans-jp text-xs/[22px] tracking-[0.06px]">
        #魚料理 #和食 #DHA
      </p>
    </div>
  );
};
