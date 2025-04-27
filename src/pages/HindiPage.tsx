import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MessageSquare,
    CalendarDays,
    Timer,
    cn,
    BookOpen,
} from 'lucide-react';
import DoodleCard from '@/components/DoodleCard';


import HindiHeroSection from '@/components/hindi/HindiHeroSection'; 

const HindiPage = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (path) {
      navigate(path);
    }
  };

  // Hindi-specific tools
    const hindiTools = [
        {
            name: 'हिंदी चैटबॉट (Hindi Chatbot)',
            icon: <MessageSquare className="w-8 h-8" />,
            color: 'orange',
            description: 'प्रश्न पूछें और एआई के साथ हिंदी में बातचीत करें। (Ask questions and converse in Hindi with AI.)',
            path: '/hindi/chatbot'
        },
    ];

    // General tools (Same as Math page)
    const generalTools = [
        { name: 'Study Planner', icon: <CalendarDays className="w-8 h-8" />, color: 'pink', description: 'Generate AI-powered study plans for your chapters.', path: '/study-planner' },
        { name: 'Pomodoro Timer', icon: <Timer className="w-8 h-8" />, color: 'orange', description: 'Boost focus with the Pomodoro productivity technique.', path: '/pomodoro' },
        { name: 'Teacher Tools', icon: <BookOpen className="w-8 h-8" />, color: 'green', description: 'Tools to assist with teaching and content creation.', path: '/teacher' },
        ];

  return (
    <main>
      <HindiHeroSection />

      {/* Section for Hindi Tools */}
        <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white text-shadow-lg">
                    Explore Our Hindi Tools
                </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 relative z-10">
            {hindiTools.map((tool, index) => (
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

      {/* Added Section for General Tools */}
      <section id="general-tools-section" className="py-16 bg-gray-900 text-white relative">
        <div className="container mx-auto px-4">
          <h2 className={cn("text-3xl md:text-4xl font-bold mb-8 text-center text-white text-shadow-lg")}>
            General Learning Tools
          </h2>
          <p className="text-xl mb-12 text-white text-center max-w-3xl mx-auto text-shadow-lg">
            Explore other tools to enhance your learning experience.         
          </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
                    {generalTools.map((tool, index) => (
                        <DoodleCard
                            key={index}
                            title={tool.name}
                            description={tool.description}
                            icon={tool.icon}
                           
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

export default HindiPage;
