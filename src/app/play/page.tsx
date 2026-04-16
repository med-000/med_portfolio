"use client";

import { useState } from "react";
import { MainLayout } from "@/components/main/main-layout";

const PlayPage = () => {
  const [count, setCount] = useState(0);

  return (
    <MainLayout>
      <section className='flex min-h-screen items-start justify-center px-[5vw] pt-[22vh] pb-10 sm:pb-16'>
        <div className='flex flex-col items-center gap-10'>
          <div className='font-oxanium text-7xl leading-none sm:text-8xl'>
            {count}
          </div>
          <button
            className='rounded-full border border-white/15 px-12 py-5 font-outfit text-2xl font-semibold text-white transition hover:border-white/35 hover:bg-white/5 sm:px-16 sm:py-6 sm:text-3xl'
            onClick={() => setCount((current) => current + 1)}
            type='button'
          >
            Push!!
          </button>
        </div>
      </section>
    </MainLayout>
  );
};

export default PlayPage;
