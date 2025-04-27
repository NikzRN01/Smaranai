
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthButton from './AuthButton';
import { 
  Menu, 
  Home, 
  BookText, 
  Image, 
  GraduationCap, 
  CalendarDays, 
  Timer, 
  BookOpen,
  UserRound, 
  History 
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Removed SheetClose import

const NavBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // RESTORED: Original navigation handler (doesn't auto-close sheet)
  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault(); // Keep preventDefault if original buttons used it
    navigate(path);
    // Note: Sidebar won't close automatically with this handler
  };
  
  // RESTORED: Assuming original hardcoded styles (adjust if these are incorrect)
  const sidebarBg = "bg-background"; // Reverted to theme variable - If this was hardcoded (e.g., bg-white dark:bg-gray-950), change it back
  const sidebarText = "text-foreground"; // Reverted to theme variable
  const sidebarBorder = "border-border"; // Reverted to theme variable
  const sidebarHeaderBorder = "border-border/40"; // Reverted to theme variable
  const menuButtonText = "text-foreground"; // Reverted to theme variable
  const menuButtonFocusRing = "focus:ring-ring"; // Reverted to theme variable
  const headerBg = "bg-background"; // Reverted to theme variable
  const headerBorder = "border-border/40"; // Reverted to theme variable

  return (
    // Using restored header styles (assuming theme variables were okay here)
    <header className={`sticky top-0 w-full py-4 px-4 md:px-8 ${headerBg} border-b ${headerBorder} z-50 shadow-md`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger Menu and Sidebar */} 
        <Sheet>
          <SheetTrigger asChild>
             {/* Using restored menu button styles */}
            <button className={`${menuButtonText} hover:text-primary transition-colors focus:outline-none focus:ring-2 ${menuButtonFocusRing} rounded-md`} aria-label="Open menu">
              <Menu size={24} />
            </button>
          </SheetTrigger>
           {/* Using restored sidebar styles */}
          <SheetContent 
            side="left" 
            className={`w-[300px] ${sidebarBg} ${sidebarText} p-0 border-l ${sidebarBorder}`}
          ><div className='flex flex-col h-full'>
            <nav className="flex flex-col h-full">
              {/* Using restored sidebar header styles */} 
              <div className={`p-4 border-b ${sidebarHeaderBorder}`}>
                {/* Link inside sidebar still goes to home */}
                {/* Removed SheetClose wrapper */}
                <Link 
                  to="/" 
                  onClick={() => navigate('/')} // Simple navigate on click, assumes Link doesn't auto-close
                  className="text-2xl font-bold flex items-center gap-1"
                 >
                  <span className="bg-gradient-to-r from-kid-blue via-kid-purple to-kid-red bg-clip-text text-transparent">
                    Smaran.ai
                  </span>
                </Link>
              </div>
              
              {/* Sidebar Links */} 
              <div className="flex-1 overflow-auto py-6 px-4">
                <div className="grid grid-cols-2 gap-3">
                  {/* RESTORED: Using original buttons with handleNavigation */}
                  {/* Make sure the className includes original styling like 'card-doodle ...' */}
                  <button 
                    onClick={handleNavigation("/")} 
                    className="card-doodle flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-dashed border-primary/50 h-24"
                  >
                    <Home size={24} />
                    <span className="text-sm font-medium text-center">Home</span>
                  </button>
                  
                   {user && 
                    <button 
                      onClick={handleNavigation("/subjects")} 
                      className="card-doodle flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-transparent hover:bg-kid-purple/10 dark:hover:bg-kid-purple/30 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-dashed border-kid-purple/50 h-24"
                    >
                      <GraduationCap size={24} className="text-kid-purple" />
                      <span className="text-sm font-medium text-center text-foreground">Subjects</span>
                    </button>
                   }
                   {/* --- Restore ALL other buttons using handleNavigation and original classes --- */}
                  <button 
                    onClick={handleNavigation("/grammar")} 
                     className="card-doodle flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-transparent hover:bg-kid-green/10 dark:hover:bg-kid-green/30 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-dashed border-kid-green/50 h-24"
                  >
                    <BookText size={24} className="text-kid-green" />
                    <span className="text-sm font-medium text-center text-foreground">Grammar</span>
                  </button>
                  <button 
                     onClick={handleNavigation("/story-images")} 
                     className="card-doodle flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-transparent hover:bg-kid-yellow/10 dark:hover:bg-kid-yellow/30 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-dashed border-kid-yellow/50 h-24"
                  >
                    <Image size={24} className="text-kid-yellow" />
                    <span className="text-sm font-medium text-center text-foreground">Story Images</span>
                  </button>
                  <button 
                     onClick={handleNavigation("/study-planner")} 
                     className="card-doodle flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-transparent hover:bg-kid-pink/10 dark:hover:bg-kid-pink/30 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-dashed border-kid-pink/50 h-24"
                  >
                    <CalendarDays size={24} className="text-kid-pink" />
                    <span className="text-sm font-medium text-center text-foreground">Study Planner</span>
                  </button>
                  <button 
                     onClick={handleNavigation("/pomodoro")} 
                     className="card-doodle flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-transparent hover:bg-kid-orange/10 dark:hover:bg-kid-orange/30 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-dashed border-kid-orange/50 h-24"
                  >
                    <Timer size={24} className="text-kid-orange" />
                    <span className="text-sm font-medium text-center text-foreground">Pomodoro Timer</span>
                  </button>
                  {user && 
                    <button 
                       onClick={handleNavigation("/teacher")} 
                       className="card-doodle flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-transparent hover:bg-kid-green/10 dark:hover:bg-kid-green/30 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-dashed border-kid-green/50 h-24"
                    >
                      <BookOpen size={24} className="text-kid-green" />
                      <span className="text-sm font-medium text-center text-foreground">Teacher Tools</span>
                    </button>
                   }
                  <button 
                     onClick={handleNavigation("/profile")} 
                     className="card-doodle flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-transparent hover:bg-kid-blue/10 dark:hover:bg-kid-blue/30 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-dashed border-kid-blue/50 h-24"
                  >
                    <UserRound size={24} className="text-kid-blue" />
                    <span className="text-sm font-medium text-center text-foreground">Profile</span>
                  </button>
                  <button 
                     onClick={handleNavigation("/history")} 
                     className="card-doodle flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-transparent hover:bg-kid-purple/10 dark:hover:bg-kid-purple/30 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-dashed border-kid-purple/50 h-24"
                  >
                    <History size={24} className="text-kid-purple" />
                    <span className="text-sm font-medium text-center text-foreground">History</span>
                  </button>
                  {/* Ensure all buttons use handleNavigation and have original classes */} 
                </div>
              </div>
            </nav>
            </div></SheetContent>
        </Sheet>
        
        {/* Center Brand Link  */}
        <div className="flex-1 flex justify-center">
          <Link to="/subjects" className="text-3xl font-bold flex items-center gap-1">
             <span className="bg-gradient-to-r from-kid-blue via-kid-purple to-kid-red bg-clip-text text-transparent">
              Smaran.ai
            </span>
          </Link>
        </div>
        
        {/* Right Side Controls */} 
        <div className="flex items-center gap-2">
          <AuthButton />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
