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
    // Add more Hindi tools here if available
  ];

  // General tools (Same as Math page)
  const generalTools = [
    { name: 'Voice Bot', icon: <Bot className="w-8 h-8" />, color: 'purple', description: 'Practice conversation skills with an AI tutor.', path: '/voice-bot' },
    { name: 'Study Planner', icon: <CalendarDays className="w-8 h-8" />, color: 'pink', description: 'Generate AI-powered study plans for your chapters.', path: '/study-planner' },
    { name: 'Pomodoro Timer', icon: <Timer className="w-8 h-8" />, color: 'orange', description: 'Boost focus with the Pomodoro productivity technique.', path: '/pomodoro' },
    { name: 'Teacher Tools', icon: <BookOpen className="w-8 h-8" />, color: 'green', description: 'Tools to assist with teaching and content creation.', path: '/teacher' },
  ];

  return (
    <main>
      <HindiHeroSection />

      {/* Section for Hindi Tools */}
      <section id="hindi-tools-section" className="py-16 bg-background text-foreground relative">
        <div className="container mx-auto px-4">
          <h2 className="section-title">
            हिंदी साधन (Explore Hindi Tools)
          </h2>
          <p className="text-xl mb-12 text-muted-foreground text-center max-w-3xl mx-auto">
            सीखने और अभ्यास करने के लिए एक साधन चुनें। (Select a tool to start learning and practicing.)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {hindiTools.map((tool, index) => (
              <DoodleCard 
                key={`hindi-${index}`}
                title={tool.name} 
                description={tool.description} 
                icon={tool.icon} 
                color={tool.color as any} 
                onClick={handleCardClick(tool.path)}
              />
            ))}
            {hindiTools.length < 3 && <div className="hidden md:block lg:hidden"></div>} 
            {hindiTools.length < 2 && <div className="hidden md:block"></div>} 
            {hindiTools.length === 1 && <div className="hidden lg:block"></div>} 
          </div>
        </div>
        <div className="absolute top-10 left-5 opacity-10 dark:opacity-20 -z-10">
           <DoodleDecoration type="flower" color="red" size="lg" />
        </div>
        <div className="absolute bottom-10 right-5 opacity-10 dark:opacity-20 -z-10">
          <DoodleDecoration type="dots" color="orange" size="lg" /> 
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

export default HindiPage;
