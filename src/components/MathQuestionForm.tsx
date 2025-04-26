
import React, { useState, useRef, useCallback, useEffect } from 'react'; 
import { Textarea } from '@/components/ui/textarea';
import { NeoButton } from '@/components/NeoButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, MicOff, ImagePlus, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { openaiService } from '@/services/openai';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; 

interface MathQuestionFormProps {
  topic: string;
  onResultGenerated?: (result: {
    question: string;
    answer: string;
    similarQuestions: string[];
    imageUrl?: string; 
  }) => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any; 
    SpeechRecognitionEvent: any;
    SpeechRecognitionErrorEvent: any;
  }
}

const MathQuestionForm: React.FC<MathQuestionFormProps> = ({ topic, onResultGenerated }) => {
  const [question, setQuestion] = useState('');
  const [explanation, setExplanation] = useState('');
  const [similarQuestions, setSimilarQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null); 

  // --- Voice Input Logic --- 
  const stopListening = useCallback(() => {
      if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } 
          catch (e) { console.warn("Error stopping recognition:", e); }
      }
      setIsListening(false); 
  }, []); // <-- Checked closing: ] );

  const startListening = useCallback(() => {
     if (!('webkitSpeechRecognition' in window)) { toast.error('Speech recognition not supported'); return; }
     setIsListening(true);
     recognitionRef.current = new window.webkitSpeechRecognition();
     const recognition = recognitionRef.current;
     recognition.continuous = false;
     recognition.interimResults = false;
     recognition.lang = 'en-US';
     recognition.onresult = (event: SpeechRecognitionEvent) => { 
        const transcript = event.results[0][0].transcript;
        setQuestion((prev) => (prev ? prev + ' ' : '') + transcript); 
     };
     recognition.onerror = (event: SpeechRecognitionErrorEvent) => { 
        console.error('Speech recognition error', event);
        toast.error('Speech recognition failed: ' + event.error);
        stopListening(); 
     };
     recognition.onend = () => { 
        console.log("Recognition ended.");
        setIsListening(false); 
        recognitionRef.current = null; 
     };
     try { recognition.start(); } 
     catch (e) { 
        console.error("Error starting speech recognition:", e);
        toast.error("Could not start voice input.");
        stopListening(); 
     }
  }, [stopListening]); // <-- Checked closing: ] );

  const toggleListening = useCallback(() => { 
      if (isListening) stopListening(); 
      else startListening(); 
  }, [isListening, startListening, stopListening]); // <-- Checked closing: ] );

  // --- Image Handling Logic --- 
  const handleImageButtonClick = useCallback(() => { 
      fileInputRef.current?.click(); 
  }, []); // <-- Checked closing: ] );

  const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) { toast.error("Select image file."); return; }
      if (file.size > 5 * 1024 * 1024) { toast.error("Image < 5MB."); return; }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreview(reader.result as string); };
      reader.readAsDataURL(file);
    } else { setSelectedImage(null); setImagePreview(null); }
    if (event.target) { event.target.value = ''; }
  }, []); // <-- Checked closing: ] );

  const removeImage = useCallback(() => {
    setSelectedImage(null); 
    setImagePreview(null);
    if (fileInputRef.current) { fileInputRef.current.value = ''; }
  }, []); // <-- Checked closing: ] );

  // --- Form Submission Logic --- 
  const handleSubmit = useCallback(async () => {
    if (!question.trim() && !selectedImage) { toast.error('Enter question or upload image'); return; }
    console.log("Submit initiated.");
    setIsLoading(true);
    setExplanation('');
    setSimilarQuestions([]);
    const imageUrlForPrompt = imagePreview;
    let success = false;
    try {
      const systemPrompt = `You are a ${topic} tutor... Use Markdown/LaTeX... Format response STRICTLY JSON: ...`;
      let userPrompt = question;
      if (imageUrlForPrompt) { userPrompt = `Question based on image: ${question || '(Analyze image)'}`; }
      console.log("Calling API...");
      const result = await openaiService.createCompletion( systemPrompt, userPrompt, { temperature: 0.7, max_tokens: 2500, imageData: imageUrlForPrompt } );
      console.log("Raw response: ", JSON.stringify(result));
      if (!result || !result.trim()) { console.error("Empty response."); toast.error("Empty AI response."); return; }
      try {
        const parsedResult = JSON.parse(result);
        console.log("Parsed OK:", parsedResult);
        if (parsedResult?.explanation && parsedResult?.similarQuestions) {
            setExplanation(parsedResult.explanation);
            setSimilarQuestions(parsedResult.similarQuestions);
            success = true;
            console.log("State updated OK."); 
            if (onResultGenerated) { onResultGenerated({ question, answer: parsedResult.explanation, similarQuestions: parsedResult.similarQuestions, imageUrl: imageUrlForPrompt }); }
        } else { 
            console.error("Parsed JSON missing keys.", parsedResult);
            toast.error('AI response structure incorrect.');
            setExplanation(result); 
            setSimilarQuestions([]);
            success = true;
            console.log("State update fallback (structure error).");
        }
      } catch (parseError) { 
          console.error('Parse error:', parseError, result);
          toast.error('Failed to parse AI response.');
          setExplanation(result); 
          setSimilarQuestions([]);
          success = true;
          console.log("State update fallback (parse error).");
      }
    } catch (apiError) { 
        console.error('API Error:', apiError); 
        toast.error('Failed to get explanation.');
        setExplanation("");
        setSimilarQuestions([]);
        console.log("State cleared on API error.");
    } finally { 
        console.log(`Submit finished. Success: ${success}`);
        setIsLoading(false); 
    }
  }, [question, selectedImage, imagePreview, topic, onResultGenerated, stopListening]); // <-- Checked closing: ] );

  // --- useEffect for Logging State --- 
  useEffect(() => {
    console.log("State before render:", { 
      explanationLength: explanation.length, 
      similarQuestionsCount: similarQuestions.length, 
      isLoading 
    });
  }, [explanation, similarQuestions, isLoading]); // <-- Checked closing: ] );

  // --- Rendering Logic --- 
  // Ensure this is the final part before component closing brace
  return (
    <div className="space-y-6">
       {/* Input Card */} 
       <Card className="neo-card">
         <CardHeader><CardTitle>Ask a {topic} Question</CardTitle></CardHeader>
         <CardContent>
           <div className="space-y-4">
             {/* Image Preview */} 
             {imagePreview && (
               <div className="relative group">
                 <img src={imagePreview} alt="Preview" className="max-w-full max-h-60 rounded-md mx-auto border border-gray-300 object-contain"/>
                 <button onClick={removeImage} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove image">
                   <X size={16} />
                 </button>
               </div>
             )}
             {/* Input Area */} 
             <div className="flex flex-col space-y-2">
               <div className="flex items-stretch space-x-2"> 
                 <Textarea placeholder={selectedImage ? `Ask about image...` : `Enter ${topic} question or upload...`} value={question} onChange={(e) => setQuestion(e.target.value)} className={`flex-1 ...`} disabled={isLoading} />
                 <div className="flex flex-col justify-between space-y-2">
                   <NeoButton variant="secondary" size="sm" onClick={handleImageButtonClick} icon={<ImagePlus className="h-4 w-4" />} disabled={isLoading} aria-label="Upload"/>
                   <NeoButton variant={isListening ? "destructive" : "secondary"} size="sm" onClick={toggleListening} icon={isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />} disabled={isLoading} aria-label={isListening ? "Stop" : "Listen"} />
                 </div>
               </div>
               <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden"/>
               {/* Listening Indicator */} 
               {isListening && (
                  <div className="w-full">
                     <Progress value={100} className="..." />
                     <div className="flex ...">
                          <span className="...">Recording...</span>
                          <div className="..."></div>
                     </div>
                  </div>
               )}
             </div>
             {/* Submit Button */} 
             <NeoButton onClick={handleSubmit} disabled={isLoading || (!question.trim() && !selectedImage)} variant="primary" fullWidth loading={isLoading}>
               {isLoading ? "Solving..." : "Solve"}
             </NeoButton>
           </div>
         </CardContent>
       </Card>
 
       {/* Explanation Card */} 
       {!isLoading && explanation && (
         <Card className="neo-card">
           <CardHeader><CardTitle>Solution</CardTitle></CardHeader>
           <CardContent>
             <ScrollArea className="h-auto max-h-[60vh] ...">
               <div className="prose ...">
                 <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                   {explanation}
                 </ReactMarkdown>
               </div>
             </ScrollArea>
           </CardContent>
         </Card>
       )}
 
       {/* Similar Questions Card */} 
       {!isLoading && similarQuestions.length > 0 && (
         <Card className="neo-card">
           <CardHeader><CardTitle>Similar Questions</CardTitle></CardHeader>
           <CardContent>
             <div className="space-y-4">
               {similarQuestions.map((q, index) => (
                 <Card key={index} className="..."><p>{q}</p></Card>
               ))}
             </div>
           </CardContent>
         </Card>
       )}
     </div>
   ); // <-- Checked closing parenthesis for return

 }; // <-- Checked closing brace for component

export default MathQuestionForm;
