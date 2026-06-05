export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center pt-0 pb-0 px-4 sm:px-6">
      {/* Main content stack - perfectly centered with two elements */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* 1. Profile Image - Top, full uncropped original image at natural aspect ratio */}
        <div className="relative">
          <div className="relative max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <img
              src="/deVee Vingette 2 sized.PNG"
              alt="deVee"
              className="w-full h-auto mix-blend-screen"
              style={{ maskImage: 'radial-gradient(circle, black 45%, transparent 72%)', WebkitMaskImage: 'radial-gradient(circle, black 45%, transparent 72%)' }}
            />
          </div>
        </div>

        {/* 2. Scroll indicator - Bottom with slight downward offset and increased bottom margin for breathing room */}
        <div className="mt-6 sm:mt-7 md:mt-8 mb-8 sm:mb-10 md:mb-12 pb-0 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5 sm:p-2">
            <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-orange-500 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}