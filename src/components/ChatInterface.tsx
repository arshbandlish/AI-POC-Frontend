"use client";

import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for sessionId generation

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string; // Changed to string to match ISO format
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(uuidv4()); // Initialize sessionId
  const [sessionStartTime, setSessionStartTime] = useState(Date.now()); // Track session start time

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - sessionStartTime > 10 * 60 * 1000) { // 10 minutes in milliseconds
        setSessionId(uuidv4()); // Generate a new sessionId
        setSessionStartTime(Date.now()); // Reset session start time
        setMessages([]); // Clear chat messages
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [sessionStartTime]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Call your API here - replace with your actual API endpoint
      const response = await fetch('http://localhost:3000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: inputText, sessionId }), // Include sessionId in the API call
      });

      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }

      const data = response.headers.get('content-type')?.includes('application/json')
        ? await response.json()
        : await response.text();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: typeof data === 'string' ? data : (data.summary || 'Sorry, I couldn\'t process your request.').replace(/\\n/g, '\n'),
        isUser: false,
        timestamp: new Date().toISOString(), // Use ISO string for consistency
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble connecting to the server. Please try again later.',
        isUser: false,
        timestamp: new Date().toISOString(), // Use ISO string for consistency
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl chat-container relative">
      {/* Messages Container */}
      <div className="messages-container overflow-y-auto p-6 space-y-4 scrollbar-hide">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`message-bubble px-4 py-3 rounded-lg ${
                message.isUser
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none'
              }`}
            >
              <p className="text-sm md:text-base whitespace-pre-wrap">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(message.timestamp).toISOString().slice(11, 16)} {/* HH:mm format */}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="message-bubble px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div className="border-t border-gray-200 dark:border-gray-600 p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
