
import React from 'react';
import PomodoroTimer from './pomodoro/PomodoroTimer'; // Assuming this is the component to display
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const PomodoroPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <section className="container mx-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <Button variant="link" className="mb-4 w-fit text-white hover:text-blue-400" onClick={() => navigate(-1)}>
            ← Back
          </Button>

          {/* Main Content */}
          <div className="text-center text-white text-shadow-lg">
            <PomodoroTimer />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PomodoroPage;
