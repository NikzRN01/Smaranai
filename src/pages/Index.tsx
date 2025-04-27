
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import DoodleCard from '@/components/DoodleCard';
import { GraduationCap, BookText, Flag, FlaskConical, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const handleSubjectClick = (subjectName: string) => {
    console.log(`Navigating for subject: ${subjectName}`);
  };

  const subjects = [
    { name: 'Mathematics', icon: <GraduationCap className="w-8 h-8" />, description: 'Dive into the world of numbers and equations.' },
    { name: 'English', icon: <BookText className="w-8 h-8" />, description: 'Unlock the power of the English language.' },
    { name: 'Science', icon: <FlaskConical className="w-8 h-8" />, description: 'Explore the wonders of the scientific universe.' },
    { name: 'Hindi', icon: <Flag className="w-8 h-8" />, description: 'Immerse yourself in the beauty of Hindi.' },
    { name: 'Gujarati', icon: <BookText className="w-8 h-8" />, description: 'Discover the rich heritage of Gujarati.' },
    { name: 'Grammar', icon: <LayoutGrid className="w-8 h-8" />, description: 'Master the structure of any language.' },
  ];

  return (
    <main className="flex-1">
      <HeroSection />

      {/* Subject Cards Section */}
      <section className="py-12 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white text-shadow-lg">
            Explore Our Subjects
          </h2>
          {/* Section Description */}
          <p className="text-lg md:text-xl mb-12 text-white text-center max-w-3xl mx-auto">
          Unlock new learning experiences with our interactive subjects.
          </p>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
            {subjects.map((subject, index) => (
              <DoodleCard
                key={index}
                title={subject.name}
                description={subject.description}
                 icon={subject.icon}
                 onClick={() => handleSubjectClick(subject.name)}
                className="hover:scale-105 transition-transform duration-300 cursor-pointer h-48 flex flex-col justify-center"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
