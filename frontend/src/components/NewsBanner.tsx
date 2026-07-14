import React from 'react';

export const NewsBanner = () => {
  return (
    <section className="w-full flex justify-center pt-16 pb-12 md:py-12">
      <div className="w-[85%] max-w-[1200px] border border-white/10 overflow-hidden shadow-2xl">
        <img
          src="/assets/news-update.jpeg"
          alt="deVee News Update"
          loading="lazy"
          className="w-full h-auto block transition-transform duration-700 hover:scale-[1.03]"
        />
      </div>
    </section>
  );
};