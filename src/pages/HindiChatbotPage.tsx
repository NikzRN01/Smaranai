import React from 'react';
import ChatContainer from '../components/chat/ChatContainer'; // Ensure this path is correct
import { openaiService } from '@/services/openai'; // Ensure this path is correct
import ApiKeyInput from '@/components/ApiKeyInput'; // Import the ApiKeyInput component
import { useOpenAIKey } from '@/hooks/useOpenAIKey'; // Import hook to initialize key from storage

const HindiChatbotPage: React.FC = () => {
  // Automatically load the API key from local storage when the component mounts
  useOpenAIKey();

  const handleProcessing = async (message: string, imageUrl?: string): Promise<string> => {
    // Add API key check before processing
    const apiKey = openaiService.getApiKey();
    if (!apiKey) {
      // Returning a specific error format might be better handled by the component
      // but for now, returning a user-facing message in the expected format.
      return JSON.stringify({ response: "त्रुटि: कृपया पहले अपना OpenAI API कुंजी दर्ज करें। (Error: Please enter your OpenAI API key first.)" });
    }

    try {
      console.log("Processing message:", message, "Image URL:", imageUrl);

      const systemPrompt = `You are a helpful Hindi chatbot. Always respond in Hindi script. If the user sends a message in English, translate it to Hindi and then respond in Hindi. Be polite, helpful, and engaging. IMPORTANT: Your response MUST be a JSON object with a single key 'response' containing the Hindi text. Example: {"response": "नमस्ते!"}`;

      let userPrompt = message;
      if (imageUrl) {
        userPrompt += `

User has uploaded an image. Please acknowledge that in your response.`;
      }

      const response = await openaiService.createCompletion(systemPrompt, userPrompt);
      console.log("Received AI response:", response);

      return response.trim();

    } catch (error) {
      console.error("Error processing message:", error);
      return JSON.stringify({ response: "क्षमा करें, प्रतिक्रिया देने में त्रुटि हुई है। कृपया पुनः प्रयास करें। (Sorry, there was an error processing your request. Please try again.)" });
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl space-y-4">
      {/* Add the ApiKeyInput component */}
      <ApiKeyInput onApiKeySubmit={(key) => openaiService.setApiKey(key)} />
      
      {/* The ChatContainer */}
      <ChatContainer
        title="हिंदी चैटबॉट (Hindi Chatbot)"
        storageKey="hindi-chatbot"
        processingFunction={handleProcessing}
        parseJsonResponse={true} 
      />
    </div>
  );
};

export default HindiChatbotPage;
