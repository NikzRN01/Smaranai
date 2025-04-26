
import { useState } from 'react';
import { openaiService } from '@/services/openai';
import { toast } from 'sonner';
import { StudyPlan } from './types';
import { books } from '../teacher/ChapterSelector'; // Assuming this contains necessary book/chapter info

export const useStudyPlanGenerator = (chapterContent: string) => {
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0); // Assuming progress is calculated based on completed steps

  const generateStudyPlan = async (selectedChapter: string, selectedBook: string) => {
    // Basic input validation
    if (!selectedChapter || !selectedBook) {
      toast.error("Please select a book and chapter first.");
      return;
    }

    if (!chapterContent || chapterContent.length < 100) { // Basic check for content presence
      toast.error("Please upload a valid PDF with chapter content first.");
      return;
    }

    // Find chapter name (optional, but good for context)
    const book = books.find(b => b.id === selectedBook);
    const chapter = book?.chapters.find(c => c.id === selectedChapter);
    const chapterName = chapter?.name || selectedChapter; // Use ID if name not found
    const grade = book?.name.includes('8') ? "8" : "Unknown"; // Infer grade if possible

    setIsGenerating(true);
    toast.info("Generating study plan based on PDF content...");

    // Limit content size to avoid excessive token usage/costs
    const MAX_CONTENT_LENGTH = 15000;
    let processedContent = chapterContent;
    if (chapterContent.length > MAX_CONTENT_LENGTH) {
      processedContent = chapterContent.substring(0, MAX_CONTENT_LENGTH) + "... [Content truncated due to length]";
      toast.warning("Chapter content is very long, using a truncated version for analysis.");
    }

    // --- AI Prompt Structure --- 
    const systemPrompt = `You are an expert educational consultant. Generate a structured study plan based EXCLUSIVELY on the provided chapter text content extracted from a PDF. The response MUST be in JSON format.

    JSON Structure Required:
    {
      "chapterTitle": "Extracted or inferred chapter title",
      "duration": "Estimated total duration (e.g., '3 Days')",
      "structure": [
        {
          "day": Number, 
          "title": "Focus for the day",
          "tasks": [
            {
              "name": "Specific task name",
              "duration": "Estimated time (e.g., '45 mins')",
              "details": "Detailed instructions referencing PDF content",
              "completed": false 
            }
          ]
        }
      ],
      "tips": [
        "Practical study tip relevant to the content",
        ...
      ],
      "priorKnowledge": [
        "Concept or skill needed beforehand",
        ...
      ],
      "completionPercentage": 0 // Initial value
    }
    
    Guidelines:
    1.  Base the plan strictly on the provided text.
    2.  Create a plan for approximately 3 days.
    3.  Break down tasks logically.
    4.  Ensure 'details' include specifics from the text.
    5.  List 2-4 relevant prerequisites if identifiable, otherwise empty array.
    6.  Provide 3-5 actionable study tips.
    7.  Return ONLY the valid JSON object, no extra text or markdown.
    `;

    const userPrompt = `Subject: ${book?.name || 'Unknown'}
Chapter: ${chapterName}
Grade: ${grade}

Extracted PDF Content:
---
${processedContent}
---

Generate the 3-day study plan in the specified JSON format based on the content above.`;

    try {
      console.log("Sending request to OpenAI...");
      const response = await openaiService.createCompletion(systemPrompt, userPrompt, { 
        max_tokens: 3000, // Adjusted based on expected output size
        temperature: 0.3 // Slightly creative but focused
      });
      
      console.log("Raw response from OpenAI:", response.substring(0, 150) + "...");

      // Attempt to parse the JSON response
      let parsedPlan: StudyPlan | null = null;
      try {
        // Basic cleaning: find the first '{' and last '}'
        const jsonStart = response.indexOf('{');
        const jsonEnd = response.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
          const jsonString = response.substring(jsonStart, jsonEnd + 1);
          parsedPlan = JSON.parse(jsonString) as StudyPlan;
          // Add completion percentage if missing
          if (parsedPlan && parsedPlan.completionPercentage === undefined) {
            parsedPlan.completionPercentage = 0;
          }
           // Ensure tasks have 'completed' field
           parsedPlan?.structure?.forEach(day => {
             day.tasks?.forEach(task => {
               if (task.completed === undefined) {
                 task.completed = false;
               }
             });
           });

        } else {
          throw new Error("Valid JSON object not found in response.");
        }
      } catch (parseError) {
        console.error("Failed to parse study plan JSON:", parseError);
        console.error("Raw response causing error:", response); 
        toast.error("AI response was not in the expected format. Please try again.");
        setStudyPlan(null); // Clear any previous plan
        setIsGenerating(false);
        return;
      }

      setStudyPlan(parsedPlan);
      setProgress(parsedPlan?.completionPercentage || 0);
      toast.success("Study plan generated successfully!");

    } catch (error) {
      console.error("Error generating study plan:", error);
      toast.error("An error occurred while generating the plan. Please check your API key and try again.");
      setStudyPlan(null); // Clear plan on error
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to handle marking tasks as complete and updating progress
  const handleStepCompletion = (dayIndex: number, taskIndex: number) => {
    if (!studyPlan) return;

    // Create a deep copy to avoid state mutation issues
    const updatedPlan = JSON.parse(JSON.stringify(studyPlan)) as StudyPlan;

    const task = updatedPlan.structure?.[dayIndex]?.tasks?.[taskIndex];
    if (task) {
      task.completed = !task.completed;
    }

    // Recalculate completion percentage
    let completedTasks = 0;
    let totalTasks = 0;
    updatedPlan.structure?.forEach(day => {
      day.tasks?.forEach(t => {
        totalTasks++;
        if (t.completed) {
          completedTasks++;
        }
      });
    });

    updatedPlan.completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    setStudyPlan(updatedPlan);
    setProgress(updatedPlan.completionPercentage);
  };

  return { studyPlan, isGenerating, progress, generateStudyPlan, handleStepCompletion };
};
