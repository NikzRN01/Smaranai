
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calculator,
  Sigma,
  SquareDot,
  BrainCircuit,
  PenTool,
  CalendarDays,
  Timer,
  BookOpen, 
  Pi,
  LayoutDashboard,
} from 'lucide-react';
import DoodleCard from '@/components/DoodleCard';
import MathHeroSection from '@/components/math/MathHeroSection';

const MathematicsPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (path) {
      navigate(path);
    }
  };

  const mathTools = [
    { name: 'Basic Arithmetic', icon: <Calculator className="w-8 h-8" />, description: 'Master addition, subtraction, multiplication, and division', path: '/math/arithmetic' },
    { name: 'Algebra', icon: <SquareDot className="w-8 h-8" />, description: 'Learn equations, variables, and algebraic expressions', path: '/math/algebra' },
    { name: 'Geometry', icon: <PenTool className="w-8 h-8" />, description: 'Explore shapes, angles, and spatial relationships', path: '/math/geometry' },
    { name: 'Calculus', icon: <Sigma className="w-8 h-8" />, description: 'Understand derivatives, integrals, and limits', path: '/math/calculus' },
    { name: 'Statistics', icon: <Pi className="w-8 h-8" />, description: 'Work with data, probability, and statistical analysis', path: '/math/statistics' },
    { name: 'Problem Solving', icon: <BrainCircuit className="w-8 h-8" />, description: 'Develop critical thinking and mathematical reasoning skills', path: '/math/problem-solving' }
  ];


  // General tools
  const generalTools = [
    { name: 'Study Planner', icon: <CalendarDays className="w-8 h-8" />, description: 'Generate AI-powered study plans for your chapters.', path: '/study-planner' },
    { name: 'Pomodoro Timer', icon: <Timer className="w-8 h-8" />, description: 'Boost focus with the Pomodoro productivity technique.', path: '/pomodoro' },
    { name: 'Teacher Tools', icon: <BookOpen className="w-8 h-8" />, description: 'Tools to assist with teaching and content creation.', path: '/teacher' },
  ];

  return (
    <main>
      <MathHeroSection />
      {/* tools */}
      <section className="py-12 md:py-20 bg-gray-50">
         <section className="py-12 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white text-shadow-lg">
            Explore Our Math Tools
          </h2>
            <p className="text-lg md:text-xl mb-12 text-white text-center max-w-3xl mx-auto text-shadow-lg">
              Unlock new learning experiences with our interactive math tools.
            </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">        
            {mathTools.map((tool, index) => (
              <DoodleCard
                key={index}
                title={tool.name}
                description={tool.description}
                icon={tool.icon}
                onClick={() => handleCardClick(tool.path)}
              />
            ))}
          </div>
        </div>
        </section>
         {/* Added Section for General Tools */}
        <section id="general-tools-section" className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-white text-shadow-lg text-center">General Learning Tools</h2>
            <p className="text-xl mb-12 text-white text-center max-w-3xl mx-auto text-shadow-lg">
              Explore other tools to enhance your learning experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
              {generalTools.map((tool, index) => (
                <DoodleCard key={index} title={tool.name} description={tool.description} icon={tool.icon} onClick={() => handleCardClick(tool.path)} />
              ))}
            </div>
          </div>
        </section>
      </section>
    </main >
  );
};

export default MathematicsPage;
