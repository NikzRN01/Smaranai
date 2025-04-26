
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen,          // Existing: for Grammar
  Image,             // Existing: for Story Images
  Mic,               // Existing: for Spoken English
  MessageCircle,     // Existing: for Voice Chat Bot (keeping this, as requested)
  HelpCircle,        // Existing: for Socratic Tutor
  CalendarDays,      // New: for Study Planner
  Timer,             // New: for Pomodoro Timer
  GraduationCap,     // New: Using for Teacher Tools (as BookOpen is used for Grammar)
  Bot                // New: Using this for Voice Bot instead of MessageCircle for consistency
} from 'lucide-react';
import DoodleCard from '@/components/DoodleCard';
import DoodleDecoration from '@/components/DoodleDecoration';

const FeaturesSection = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    // Ensuring theme compatibility for the section background
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Learn With Fun Tools</h2>
        {/* Increased grid columns to accommodate more items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <DoodleCard 
            title="English Grammar" 
            description="Learn grammar rules with interactive lessons and fun exercises." 
            icon={<BookOpen className="w-8 h-8" />} 
            color="green" 
            to="/grammar" 
            onClick={handleNavigation("/grammar")}
          />
          
          <DoodleCard 
            title="Story Image Generator" 
            description="Create beautiful images to illustrate your stories and writing." 
            icon={<Image className="w-8 h-8" />} 
            color="yellow" 
            to="/story-images" 
            onClick={handleNavigation("/story-images")}
          />
          
          <DoodleCard 
            title="Spoken English" 
            description="Practice pronunciation and speaking with audio lessons." 
            icon={<Mic className="w-8 h-8" />} 
            color="red" 
            to="/spoken-english" 
            onClick={handleNavigation("/spoken-english")}
          />

          <DoodleCard 
            title="Voice Bot" 
            description="Talk with an AI tutor that listens and responds to your voice." 
            icon={<Bot className="w-8 h-8" />} // Changed icon
            color="purple" 
            to="/voice-bot" 
            onClick={handleNavigation("/voice-bot")}
          />
          
          <DoodleCard 
            title="Socratic Tutor" 
            description="Learn through guided questions that help you discover answers." 
            icon={<HelpCircle className="w-8 h-8" />} 
            color="orange" 
            to="/socratic-tutor" 
            onClick={handleNavigation("/socratic-tutor")}
          />

          {/* Added Study Planner */}
          <DoodleCard 
            title="Study Planner" 
            description="Generate AI-powered study plans for your chapters." 
            icon={<CalendarDays className="w-8 h-8" />} 
            color="pink" 
            to="/study-planner" 
            onClick={handleNavigation("/study-planner")}
          />

          {/* Added Pomodoro Timer */}
          <DoodleCard 
            title="Pomodoro Timer" 
            description="Boost focus with the Pomodoro productivity technique." 
            icon={<Timer className="w-8 h-8" />} 
            color="orange" // Reusing orange, consider another color if needed
            to="/pomodoro" 
            onClick={handleNavigation("/pomodoro")}
          />

          {/* Added Teacher Tools */}
          <DoodleCard 
            title="Teacher Tools" 
            description="Tools to assist with teaching and content creation." 
            icon={<GraduationCap className="w-8 h-8" />} // Using GraduationCap
            color="green" // Reusing green, consider another color if needed
            to="/teacher" 
            onClick={handleNavigation("/teacher")}
          />
          
          {/* Removing the Coming Soon card */}
          {/* <div className="card-doodle border-kid-pink flex flex-col items-center justify-center bg-gradient-to-br from-white to-pink-100 p-6">
            <DoodleDecoration type="heart" color="pink" size="md" />
            <h3 className="text-xl font-bold mt-4 mb-2">Coming Soon</h3>
            <p className="text-gray-600 text-center">More exciting features are on the way!</p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
