import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    MessageSquare, 
    BookText,           // <-- Keep existing icon
    Bot,                // <-- Added Icon
    CalendarDays,       // <-- Added Icon
    Timer,              // <-- Added Icon
    BookOpen            // <-- Added Icon
} from 'lucide-react'; 
import DoodleCard from '@/components/DoodleCard';
import DoodleDecoration from '@/components/DoodleDecoration';
import GujaratiHeroSection from '@/components/gujarati/GujaratiHeroSection';

const GujaratiPage = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (path) {
      navigate(path);
    }
  };

  // Gujarati-specific tools
  const gujaratiTools = [
    {
      name: 'ગુજરાતી ચેટબોટ (Gujarati Chatbot)', 
      icon: <MessageSquare className="w-8 h-8" />, 
      color: 'red',
      description: 'પ્રશ્નો પૂછો અને એઆઈ સાથે ગુજરાતીમાં વાતચીત કરો. (Ask questions and converse in Gujarati with AI.)',
      path: '/gujarati/chatbot'
    },
    // Add more Gujarati tools here if available
  ];

  // General tools (Same as Math/Hindi page)
  const generalTools = [
    { name: 'Voice Bot', icon: <Bot className="w-8 h-8" />, color: 'purple', description: 'Practice conversation skills with an AI tutor.', path: '/voice-bot' },
    { name: 'Study Planner', icon: <CalendarDays className="w-8 h-8" />, color: 'pink', description: 'Generate AI-powered study plans for your chapters.', path: '/study-planner' },
    { name: 'Pomodoro Timer', icon: <Timer className="w-8 h-8" />, color: 'orange', description: 'Boost focus with the Pomodoro productivity technique.', path: '/pomodoro' },
    { name: 'Teacher Tools', icon: <BookOpen className="w-8 h-8" />, color: 'green', description: 'Tools to assist with teaching and content creation.', path: '/teacher' },
  ];

  return (
    <main>
      <GujaratiHeroSection />

      {/* Section for Gujarati Tools */}
      <section id="gujarati-tools-section" className="py-16 bg-background text-foreground relative">
        <div className="container mx-auto px-4">
          <h2 className="section-title">
            ગુજરાતી સાધનો (Explore Gujarati Tools)
          </h2>
          <p className="text-xl mb-12 text-muted-foreground text-center max-w-3xl mx-auto">
            શીખવા અને અભ્યાસ કરવા માટે એક સાધન પસંદ કરો. (Select a tool to start learning and practicing.)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {gujaratiTools.map((tool, index) => (
              <DoodleCard 
                key={`gujarati-${index}`}
                title={tool.name} 
                description={tool.description} 
                icon={tool.icon} 
                color={tool.color as any} 
                onClick={handleCardClick(tool.path)}
              />
            ))}
             {gujaratiTools.length < 3 && <div className="hidden md:block lg:hidden"></div>} 
             {gujaratiTools.length < 2 && <div className="hidden md:block"></div>} 
             {gujaratiTools.length === 1 && <div className="hidden lg:block"></div>} 
          </div>
        </div>
        <div className="absolute top-10 left-5 opacity-10 dark:opacity-20 -z-10">
           <DoodleDecoration type="circle" color="red" size="lg" />
        </div>
        <div className="absolute bottom-10 right-5 opacity-10 dark:opacity-20 -z-10">
          <DoodleDecoration type="book" color="orange" size="lg" /> 
        </div>
      </section>

      {/* Added Section for General Tools */}
      <section id="general-tools-section" className="py-16 bg-muted/40 text-foreground relative">
        <div className="container mx-auto px-4">
          <h2 className="section-title">
            General Learning Tools
          </h2>
          <p className="text-xl mb-12 text-muted-foreground text-center max-w-3xl mx-auto">
            Explore other tools to enhance your learning experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"> 
            {generalTools.map((tool, index) => (
              <DoodleCard 
                key={`general-${index}`}
                title={tool.name} 
                description={tool.description} 
                icon={tool.icon} 
                color={tool.color as any} 
                onClick={handleCardClick(tool.path)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default GujaratiPage;
