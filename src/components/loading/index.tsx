import React from 'react';

import './styles.css';

import { DynamicOptionsLoadingProps } from 'next/dynamic';

export default function Loading(props: DynamicOptionsLoadingProps) {
  console.log(props);
  return (
    <div className="w-full min-h-[100vh] absolute top-0 left-0 text-fill-2 z-50">
      <div className="flex justify-center items-center min-h-[100vh] flex-col">
        <div className="scale-150 classic-2 gradient-loading text-5xl">
          Hired me to see higher skills...
        </div>
      </div>
    </div>
  );
}
