// Claude service for managing API communication
// This service handles the communication with our server API endpoint

// Format message for the API
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// API endpoint for chat - use relative URL to work with proxy
export const CHAT_API_ENDPOINT = '/api/chat';

// Function to format messages for the API if needed
export function formatMessages(messages: { role: string; content: string }[]): ChatMessage[] {
  return messages.map(message => ({
    role: message.role === 'user' ? 'user' : 'assistant',
    content: message.content
  }));
}