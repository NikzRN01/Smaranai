
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ChapterPDFUploader } from '@/components/ChapterPDFUploader';
import ChapterSelector from './ChapterSelector';
import ChapterContent from './ChapterContent';
import QuestionAnswerSection from './QuestionAnswerSection';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { useChapterPDF } from '@/hooks/useChapterPDF';
import { useTeacherQA } from '@/hooks/useTeacherQA';
import { useOpenAIKey } from '@/hooks/useOpenAIKey';
import { openaiService } from '@/services/openai';

const TeacherPageContainer: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<string>("8");
  const [selectedBook, setSelectedBook] = useState<string>("honeydew");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  
  const [questionFromVoice, setQuestionFromVoice] = useState('');
  
  useOpenAIKey();

  const handleTranscriptChange = useCallback((transcript: string) => {
    setQuestionFromVoice(transcript);
  }, []);

  const handleSpeechEnd = useCallback((finalTranscript: string) => {
    console.log("Final transcript received in container:", finalTranscript);
    setQuestionFromVoice(finalTranscript);
  }, []);

  const { isListening, startListening, stopListening } = useVoiceRecognition({
    onTranscriptChange: handleTranscriptChange,
    onSpeechEnd: handleSpeechEnd
  });

  const { chapterContent, pdfUrl, handleFileUpload } = useChapterPDF(selectedBook, selectedChapter);
  const { answer, isLoading, askQuestion, answerRef } = useTeacherQA(user, selectedClass, selectedBook, selectedChapter, chapterContent);

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to access the teacher features');
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log('[TeacherPageContainer] State Check:');
    console.log('  Selected Chapter:', selectedChapter);
    console.log('  Chapter Content Length:', chapterContent?.length);
    console.log('  API Key Set:', !!openaiService.getApiKey());
  }, [selectedChapter, chapterContent]);

  useEffect(() => {
    console.log('[TeacherPageContainer] Answer state updated:', answer);
  }, [answer]);

  return (
    // Increased max-width for the overall container
    <div className="container mx-auto px-4 py-8 max-w-6xl"> 
      {/* Top section remains the same */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Teacher Tools</CardTitle>
          <CardDescription>
            Select class and chapter, upload PDF, then ask questions using text or voice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChapterSelector
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
            selectedChapter={selectedChapter}
            setSelectedChapter={setSelectedChapter}
          />
          
          <div className="mt-4 flex justify-end items-center">
              {selectedChapter && (
                <ChapterPDFUploader 
                  onFileUpload={handleFileUpload}
                  chapterId={`${selectedBook}-${selectedChapter}`}
                />
              )}
          </div>
        </CardContent>
      </Card>
      
      {/* Changed layout: Removed grid-cols-2, components will stack */}
      <div className="grid grid-cols-1 gap-6"> 
        {/* Chapter Content (PDF/Text) will take full width */}
        <ChapterContent 
          chapterContent={chapterContent} 
          pdfUrl={pdfUrl} 
        />
        
        {/* Question/Answer Section will take full width below Chapter Content */}
        <QuestionAnswerSection
          question={questionFromVoice} 
          answer={answer} 
          isListening={isListening}
          startListening={startListening} 
          stopListening={stopListening}   
          askQuestion={askQuestion} 
          isLoading={isLoading} 
          selectedChapter={selectedChapter}
          answerRef={answerRef}
        />
      </div>
    </div>
  );
};

export default TeacherPageContainer;
