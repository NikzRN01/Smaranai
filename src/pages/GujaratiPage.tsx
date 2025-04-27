import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Book,
  MessageSquare,
  CalendarDays,
  Timer,
  BookOpen,
} from 'lucide-react';
import DoodleCard from '@/components/DoodleCard';
import GujaratiHeroSection from '@/components/gujarati/GujaratiHeroSection';

const GujaratiPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (path) {
      navigate(path);
    }
  };

  // Gujarati-specific tool
  const gujaratiTools = [
    { name: 'ગુજરાતી ચેટબોટ (Gujarati Chatbot)', icon: <MessageSquare className="w-8 h-8" />, color: 'red', description: 'પ્રશ્નો પૂછો અને એઆઈ સાથે ગુજરાતીમાં વાતચીત કરો. (Ask questions and converse in Gujarati with AI.)', path: '/gujarati/chatbot' },
  ];

  // General tools (Same as Math/Hindi page)
  const generalTools = [
    { name: 'Study Planner', icon: <CalendarDays className="w-8 h-8" />, color: 'pink', description: 'Generate AI-powered study plans.', path: '/study-planner' },
    { name: 'Pomodoro Timer', icon: <Timer className="w-8 h-8" />, color: 'orange', description: 'Boost focus with the Pomodoro technique.', path: '/pomodoro' },
    { name: 'Teacher Tools', icon: <BookOpen className="w-8 h-8" />, color: 'green', description: 'Tools for teaching and content creation.', path: '/teacher' },
  ];

  return (
    <main>
      <GujaratiHeroSection />

      {/* tools */}
      <section className="py-12 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white text-shadow-lg">
            ગુજરાતી સાધનો
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 ">
            {gujaratiTools.map((tool, index) => (
              <DoodleCard
                key={index}
                title={tool.name}
                description={tool.description}
                icon={tool.icon}
                color={tool.color as 'green' | 'blue' | 'red' | 'yellow' | 'purple' | 'orange' | 'pink'}
                onClick={handleCardClick(tool.path)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Added Section for General Tools */}
      <section id="general-tools-section" className="py-16 bg-gray-900 text-white relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white text-shadow-lg">
            General Learning Tools
          </h2>
          <p className="text-lg md:text-xl mb-12 text-white text-center max-w-3xl mx-auto text-shadow-lg">
            Explore other tools to enhance your learning experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
            {generalTools.map((tool, index) => (
              <DoodleCard
                
              key={index}
              title={tool.name}
                
              description={tool.description}
              icon={tool.icon}
              color={tool.color as 'green' | 'blue' | 'red' | 'yellow' | 'purple' | 'orange' | 'pink'}
              onClick={() => handleCardClick(tool.path)}
              className="hover:scale-105 transition-transform duration-300 cursor-pointer h-48 flex flex-col justify-center"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default GujaratiPage;

