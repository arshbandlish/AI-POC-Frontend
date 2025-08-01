import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // TODO: Replace this with your actual API call
    // Example: OpenAI, Anthropic, or any other AI service
    
    // For now, we'll simulate an API response
    const response = await simulateAIResponse(message);
    
    // Example of how you might call an external API:
    /*
    const response = await fetch('YOUR_AI_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.YOUR_API_KEY}`,
      },
      body: JSON.stringify({
        message: message,
        // Add other parameters as needed
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to get response from AI service');
    }
    
    const data = await response.json();
    */

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Simulate AI response - replace this with your actual API integration
async function simulateAIResponse(message: string): Promise<string> {
  // Add a small delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  const responses = [
    `I understand you said: "${message}". That's an interesting point!`,
    `Thanks for sharing that with me. Regarding "${message}", I think that's a great question.`,
    `I appreciate your message about "${message}". Let me help you with that.`,
    `That's a thoughtful question about "${message}". Here's what I think...`,
    `I can see you're asking about "${message}". That's something I can definitely help with.`,
  ];

  // Simple responses based on keywords
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! It's great to meet you. How can I assist you today?";
  }
  
  if (lowerMessage.includes('help')) {
    return "I'm here to help! You can ask me questions about various topics, and I'll do my best to provide helpful answers.";
  }
  
  if (lowerMessage.includes('weather')) {
    return "I'd love to help with weather information, but I don't have access to real-time weather data right now. You might want to check a weather app or website for current conditions.";
  }
  
  if (lowerMessage.includes('thank')) {
    return "You're very welcome! I'm happy to help. Is there anything else you'd like to know?";
  }

  // Return a random response
  return responses[Math.floor(Math.random() * responses.length)];
}
