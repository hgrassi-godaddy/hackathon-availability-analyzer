import React, { createContext, useContext, ReactNode } from 'react';
import { useChat } from '@ai-sdk/react';
import { CHAT_API_ENDPOINT } from '../services/ClaudeService';
import { UIMessage } from 'ai';

// Define the shape of our chat messages
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Define the shape of our context
interface ChatContextType {
  messages: UIMessage[];
  sendMessage: (content: string) => void;
  isLoading: boolean;
  error: Error | null;
}

// Create the context with a default value
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component that wraps parts of our app that need access to the chat
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use the useChat hook from @ai-sdk/react that will communicate with our API endpoint
  const { messages, append, isLoading, error } = useChat({
    api: CHAT_API_ENDPOINT, // Use the API endpoint from our service
    onError: (err) => {
      console.error('Chat error:', err);
    },
  });

  // Function to send a message
  const sendMessage = (content: string) => {
    if (content.trim() !== '') {
      append({
        role: 'user',
        content,
      });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        isLoading,
        error: error ? new Error(error.message) : null,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useAIChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useAIChat must be used within a ChatProvider');
  }
  return context;
};