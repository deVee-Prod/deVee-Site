import React from 'react';

export const NewsBanner = () => {
  return (
    <section className="w-full flex justify-center py-12 bg-black">
      <div className="w-[95%] max-w-[1200px] border border-white/10 overflow-hidden shadow-2xl">
        <img
          src="/assets/news-may.jpeg"
          alt="deVee News May 2026"
          className="w-full h-auto block transition-transform duration-700 hover:scale-[1.03]"
        />
      </div>
    </section>
  );
};