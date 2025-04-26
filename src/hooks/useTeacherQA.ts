
import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import openaiService from '@/services/openaiService';
import { saveMessage } from '@/utils/messageUtils';
import { books } from '@/pages/teacher/ChapterSelector';

export function useTeacherQA(user: any, selectedClass: string, selectedBook: string, selectedChapter: string, chapterContent: string) {
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const answerRef = useRef<HTMLDivElement | null>(null);

  const saveToHistory = useCallback(async (text: string, isUserMessage: boolean, aiResponse?: string) => {
    if (!user) return;
    
    try {
      await saveMessage({
        text,
        userId: user.id,
        aiResponse: isUserMessage ? undefined : aiResponse,
        chatType: 'teacher'
      });
    } catch (error) {
      console.error('Error in saveToHistory:', error);
      toast.error('Failed to save message history');
    }
  }, [user]);

  const askQuestion = useCallback(async (question: string) => {
    console.log("askQuestion called with:", question);
    console.log("Current chapterContent length:", chapterContent?.length);
    console.log("Selected chapter:", selectedChapter);
    console.log("API Key exists:", !!openaiService.getApiKey());

    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }
    
    if (!openaiService.getApiKey()) {
      toast.error('Please set your OpenAI API key first');
      return;
    }
    
    if (!chapterContent || chapterContent.length < 50) { 
      toast.error('No chapter content loaded or content too short. Please upload a PDF for this chapter.');
      return;
    }

    if (!selectedChapter) {
        toast.error('Please select a chapter first.');
        return;
    }
    
    setIsLoading(true);
    setAnswer(""); 

    await saveToHistory(question, true);
    
    let fullResponse = '';
    try {
      const book = books.find(b => b.id === selectedBook);
      const chapter = book?.chapters.find(c => c.id === selectedChapter);
      
      const systemPrompt = `You are a helpful, educational assistant specializing in English literature for Class ${selectedClass} students. 
      You will answer questions about the chapter "${chapter?.name || selectedChapter}" based on the provided content. 
      Be thorough but keep your explanations at an appropriate level for the student's grade. 
      Always base your responses on the provided chapter content.`;
      
      const userMessage = `Chapter Content: ${chapterContent}

Question: ${question}`;
      console.log("Sending to OpenAI:", { systemPrompt, userMessage: userMessage.substring(0, 100) + '...' }); 

      await openaiService.createCompletion(
        systemPrompt,
        userMessage,
        {
          stream: true,
          onChunk: (chunk) => {
            // --- ADDED LOG --- 
            console.log('Received chunk:', chunk);
            if (chunk) { // Only process if chunk is not empty/null
              fullResponse += chunk; 
              setAnswer(prev => {
                const newAnswer = prev + chunk;
                return newAnswer;
              });
              if (answerRef.current) {
                requestAnimationFrame(() => {
                   if (answerRef.current) {
                      answerRef.current.scrollTop = answerRef.current.scrollHeight;
                   }
                });
              }
            } // End if(chunk)
          }
        }
      );
      console.log("OpenAI stream finished.");
      console.log("Final accumulated fullResponse:", fullResponse);
      await saveToHistory(question, false, fullResponse);

    } catch (error) {
      console.error('Error getting answer:', error);
      toast.error('Failed to get answer. Please try again.');
      setAnswer("Error fetching answer. Please check the console."); 
    } finally {
      setIsLoading(false);
      console.log("isLoading set to false. Current answer state (should match fullResponse):", fullResponse); 
    }
  }, [user, selectedClass, selectedBook, selectedChapter, chapterContent, answerRef, saveToHistory]);

  return { answer, isLoading, askQuestion, answerRef };
}
