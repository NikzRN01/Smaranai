import React from 'react';
import ChatContainer from '../components/chat/ChatContainer'; // Ensure this path is correct
import { openaiService } from '@/services/openai'; // Ensure this path is correct

const GujaratiChatbotPage: React.FC = () => {
  const handleProcessing = async (message: string, imageUrl?: string): Promise<string> => {
    try {
      console.log("Processing Gujarati message:", message, "Image URL:", imageUrl);

      // Gujarati system prompt
      const systemPrompt = `You are a helpful Gujarati chatbot. Always respond in Gujarati script. If the user sends a message in English, translate it to Gujarati and then respond in Gujarati. Be polite, helpful, and engaging. 
IMPORTANT: Your response MUST be a JSON object with a single key 'response' containing the Gujarati text. 
Example: {"response": "નમસ્તે!"}`;

      let userPrompt = message;
      if (imageUrl) {
        userPrompt += `

User has uploaded an image. Please acknowledge that in your response.`;
      }

      const response = await openaiService.createCompletion(systemPrompt, userPrompt);
      console.log("Received AI response for Gujarati:", response);

      return response.trim(); // Ensure clean response
    } catch (error) {
      console.error("Error processing Gujarati message:", error);
      return JSON.stringify({
        response: "માફ કરશો, પ્રતિક્રિયા આપવામાં ભૂલ થઈ છે. કૃપા કરીને ફરી પ્રયાસ કરો. (Sorry, there was an error processing your request.)"
      });
    }
  };

  return (
    <ChatContainer
      title="ગુજરાતી ચેટબોટ (Gujarati Chatbot)"
      storageKey="gujarati-chatbot"
      processingFunction={handleProcessing}
      parseJsonResponse={true}
    />
  );
};

export default GujaratiChatbotPage;
