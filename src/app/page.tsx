"use client";

import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              POC Chatbot
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A chatbot that helps you with your queries and provides intelligent responses!
            </p>
          </div>
          <ChatInterface />
        </div>
      </div>
    </main>
  );
}
