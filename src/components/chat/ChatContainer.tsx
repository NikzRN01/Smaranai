
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import { useChatHistory } from '../../hooks/useChatHistory';
import { handleApiError } from '../../utils/apiHelpers';

interface ChatContainerProps {
  title: string;
  storageKey: string;
  processingFunction: (message: string, imageUrl?: string) => Promise<string>;
  // New prop to control special AI message parsing
  parseJsonResponse?: boolean; 
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  title,
  storageKey,
  processingFunction,
  parseJsonResponse = false // Default to false
}) => {
  const { 
    messages, 
    isLoading, 
    setIsLoading, 
    addMessage, 
    clearHistory 
  } = useChatHistory(storageKey);
  
  const handleSendMessage = async (message: string, image?: File) => {
    let messageContent = message;
    let imageUrl: string | undefined;
    
    if (image) {
      imageUrl = URL.createObjectURL(image);
      messageContent = message || "Image"; 
    }
    
    const userMessage = addMessage('user', messageContent, imageUrl);
    console.log("User message added to chat history with ID:", userMessage.id);
    
    setIsLoading(true);
    
    try {
      const response = await processingFunction(message, imageUrl);
      addMessage('assistant', response);
      console.log("AI response added to chat history");
    } catch (error) {
      handleApiError(error);
      addMessage('assistant', 'Sorry, I encountered an error processing your request. Please try again.');
    } finally {
      setIsLoading(false);
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    }
  };
  
  const handleClearChat = () => {
    clearHistory();
    toast.success('Chat history cleared');
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Pass the prop down to ChatHistory */}
        <ChatHistory messages={messages} parseJsonResponse={parseJsonResponse} />
      </CardContent>
      
      <CardFooter>
        <ChatInput 
          onSendMessage={handleSendMessage}
          onClearChat={handleClearChat}
          disabled={isLoading}
        />
      </CardFooter>
    </Card>
  );
};

export default ChatContainer;
