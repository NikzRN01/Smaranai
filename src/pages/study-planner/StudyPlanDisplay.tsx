
import React from 'react';
import { StudyPlan, StudyPlanDay, StudyPlanTask } from './types';
import { Button } from '@/components/ui/button';
import { FileText, Printer, CheckSquare, Square } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StudyPlanDisplayProps {
  studyPlan: StudyPlan | null | undefined;
  onStepComplete: (dayIndex: number, taskIndex: number) => void;
}

const StudyPlanDisplay: React.FC<StudyPlanDisplayProps> = ({
  studyPlan,
  onStepComplete
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExportToPDF = () => {
    toast.info("PDF export functionality will be added soon!");
  };

  if (!studyPlan) {
    return <Card><CardContent><p className='text-muted-foreground p-4'>Generating study plan...</p></CardContent></Card>;
  }

  // Determine the correct steps array (structure or steps)
  const planSteps = studyPlan.structure || studyPlan.steps || [];
  const planDuration = studyPlan.duration || studyPlan.timeEstimate;

  return (
    <Card className="study-plan-print-area">
      <CardHeader>
        <CardTitle className='text-2xl font-bold mb-2'>
          Study Plan: {studyPlan.chapterTitle || 'Selected Chapter'}
        </CardTitle>
        {planDuration && (
          <p className="text-sm text-muted-foreground mb-4">
            Estimated Duration: <Badge variant="outline">{planDuration}</Badge>
          </p>
        )}
        <div className="flex justify-end gap-2 print:hidden">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handlePrint}
          >
            <Printer className="w-4 h-4" />
            Print Plan
          </Button>
          {/* <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleExportToPDF}
          >
            <FileText className="w-4 h-4" />
            Export PDF
          </Button> */}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Approach */}
        {studyPlan.approach && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Approach</h3>
            <p className="text-muted-foreground text-sm">{studyPlan.approach}</p>
          </div>
        )}

        {/* Prerequisites */}
        {Array.isArray(studyPlan.prerequisites) && studyPlan.prerequisites.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Prior Knowledge Needed</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {studyPlan.prerequisites.map((item, index) => (
                <li key={index}>
                  <strong>{item.topic}:</strong> {item.reason}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Key Topics */}
        {Array.isArray(studyPlan.keyTopics) && studyPlan.keyTopics.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Topics</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {studyPlan.keyTopics.map((item, index) => (
                <li key={index}>
                  <strong>{item.topic}</strong>
                  {item.importance && <span className='ml-2'>- {item.importance}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Daily Plan */}
        <div>
            <h2 className="text-xl font-semibold mt-6 mb-4 border-t pt-4">Daily Breakdown</h2>
            {Array.isArray(planSteps) && planSteps.length > 0 ? (
              planSteps.map((day: StudyPlanDay, dayIndex: number) => (
                <div key={dayIndex} className="mb-6 pl-4 border-l-2 border-primary/20">
                  <h3 className="text-lg font-semibold mb-3">
                    Day {day.day}: {day.title}
                  </h3>
                  {Array.isArray(day.tasks) && day.tasks.map((task: StudyPlanTask, taskIndex: number) => (
                    <div key={taskIndex} className="mb-3 flex items-start gap-2">
                      <button 
                        onClick={() => onStepComplete(dayIndex, taskIndex)} 
                        className="mt-1 print:hidden focus:outline-none focus:ring-1 focus:ring-primary rounded"
                        aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
                      >
                        {task.completed ? (
                          <CheckSquare className="w-4 h-4 text-green-600" />
                        ) : (
                          <Square className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      <div className={`flex-1 ${task.completed ? 'opacity-70 line-through' : ''}`}>
                        <p className="font-medium text-sm">
                          {task.name} 
                          {task.duration && <span className="text-xs text-muted-foreground ml-2">({task.duration})</span>}
                        </p>
                        <p className="text-sm text-muted-foreground ml-1">{task.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className='text-muted-foreground'>No daily steps provided in the plan.</p>
            )}
        </div>

        {/* Tips */}
        {Array.isArray(studyPlan.tips) && studyPlan.tips.length > 0 && (
          <div className='border-t pt-4'>
            <h3 className="text-lg font-semibold mb-2">💡 Study Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {studyPlan.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
        
      </CardContent>
    </Card>
  );
};

export default StudyPlanDisplay;
