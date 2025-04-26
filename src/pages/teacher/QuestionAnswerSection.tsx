
import React, { RefObject, useState, useEffect } from 'react'; 
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import VoiceControlButtons from '@/components/voice-assistant/VoiceControlButtons'; 
import { NeoButton } from '@/components/NeoButton';
import { Skeleton } from '@/components/ui/skeleton';

interface QuestionAnswerSectionProps {
  question: string; 
  answer: string; 
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void; 
  askQuestion: (questionText: string) => void; 
  isLoading: boolean; 
  selectedChapter: string;
  answerRef: RefObject<HTMLDivElement>;
}

const QuestionAnswerSection: React.FC<QuestionAnswerSectionProps> = ({
  question,
  answer,
  isListening,
  startListening,
  stopListening,
  askQuestion,
  isLoading,
  selectedChapter,
  answerRef
}) => {
  const [inputValue, setInputValue] = useState<string>(question);

  useEffect(() => {
    setInputValue(question);
  }, [question]);

  useEffect(() => {
    console.log('[QuestionAnswerSection] Received answer prop update:', answer);
  }, [answer]);

  const handleStopSpeaking = () => {}; 
  const handleReplay = () => {};

  const handleAskQuestionClick = () => {
      askQuestion(inputValue);
  };

  console.log('[QuestionAnswerSection] Rendering. isLoading:', isLoading, 'Answer prop:', answer);

  return (
    // Removed fixed height from Card to allow content to determine height
    <Card className="flex flex-col neo-card">
      <CardHeader>
        <CardTitle className="text-xl">Ask Questions</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden pt-4"> 
        {/* 1. Answer Area - Removed flex-1 from div */}
        <div className="overflow-hidden mb-4 border-3 border-black rounded-md shadow-neo-sm">
          {/* Set specific height for ScrollArea */}
          <ScrollArea className="h-[400px] w-full pr-4" ref={answerRef}>
            <div className="prose max-w-none p-4">
              {console.log('Rendering answer area. isLoading:', isLoading, 'Answer content:', answer ? answer.substring(0,50)+'...' : 'empty')}
              {isLoading && !answer ? ( 
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ) : answer ? (
                answer
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  <p>Type or record your question below. The answer will appear here.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* 2. Input Area */}
        <div className="mt-auto space-y-3 pt-2 border-t"> 
          {/* Voice Controls */}
          <div>
            <VoiceControlButtons 
              isListening={isListening}
              isSpeaking={false} 
              isProcessing={isLoading} 
              hasAudioMessages={false} 
              onStartListening={startListening}
              onStopListening={stopListening}
              onStopSpeaking={handleStopSpeaking} 
              onReplayLastResponse={handleReplay} 
              showPlaybackControls={false} 
            />
          </div>

          {/* Text Input */}
          <Textarea
            placeholder={isListening ? "Listening... speak your question." : "Type or record your question..."}
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            className={`neo-input mb-4 w-full ${isListening ? 'border-purple-500 border-2' : ''}`} 
            rows={2} 
          />
                  
          {/* Ask Button */}
          <NeoButton 
            onClick={handleAskQuestionClick} 
            disabled={!selectedChapter || isLoading || isListening || !inputValue.trim()}
            className="w-full" 
            variant="primary"
            loading={isLoading}
          >
            {isLoading ? "Thinking..." : "Ask Question"}
          </NeoButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionAnswerSection;
