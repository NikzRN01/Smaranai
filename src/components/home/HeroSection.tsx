import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={cn(
      "relative overflow-hidden py-24 md:py-32 lg:py-40 bg-gradient-to-br from-purple-900 to-blue-900",
      isMounted ? "opacity-100" : "opacity-0",
      "transition-opacity duration-1000 ease-in-out"
    )}>
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center overflow-hidden">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-tr from-blue-600 to-pink-600 rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white text-shadow-lg">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 text-shadow-neon-blue">Smaran.ai</span>
          </h1>
          <div className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-white text-shadow-lg">
            <TypeAnimation
              sequence={[
                "Ready to explore the wonders of math?",
                1500,
                "Eager to master the nuances of Hindi?",
                1500,
                "Want to dive into Gujarati literature?",
                1500,
                 "Want to improve your grammer skills?",
                1500,
                "Looking for a personalized learning journey?",
                1500,
                "Let's explore the world of knowledge together!",
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{ display: 'inline-block' }}
            />
          </div>
          <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white max-w-2xl mx-auto text-shadow-lg">
            Discover a new way to learn with interactive lessons, AI-powered tutoring, and much more!
          </p>
          <a
  href="/subjects"
  className="inline-block bg-gradient-to-br from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 outline outline-offset-2 outline-1 hover:outline-pink-400/50"
>
  Start Learning Now
</a>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;