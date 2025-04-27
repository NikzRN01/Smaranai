
import React from 'react';
import { Pi } from 'lucide-react';
import { cn } from '@/lib/utils';

const MathHeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40 bg-gradient-to-br from-purple-900 to-blue-900">
    <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center overflow-hidden">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-tr from-blue-600 to-pink-600 rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 flex items-center justify-between ">
        <div className="text-left relative z-10">
          <h1 className={cn("text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white text-shadow-lg")}>
            Dive into Mathematics
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white max-w-2xl text-shadow-lg">
            Explore the fascinating world of numbers, equations, and shapes. Master basic arithmetic, algebra, geometry, and more with our comprehensive tools and resources.
          </p>
        </div>
        <div className="text-white hidden md:block relative z-10">
          <Pi size={128} className="opacity-60 group-hover:animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default MathHeroSection;