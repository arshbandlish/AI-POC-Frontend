# AI Chatbot - Next.js Application

A modern, responsive chatbot interface built with Next.js, React, and TypeScript. This application provides a clean chat interface that accepts user input, sends it to an API, and displays intelligent responses.

## Features

- 🤖 **Interactive Chat Interface**: Clean, modern chat UI with message bubbles
- 🎨 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🌙 **Dark Mode Support**: Automatic dark/light mode based on user preference
- ⚡ **Real-time Typing**: Loading indicators and smooth animations
- 🔧 **API Integration**: Ready-to-integrate with any AI service
- 📱 **Mobile Optimized**: Touch-friendly interface with proper keyboard handling

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API endpoint
│   ├── globals.css               # Global styles and Tailwind CSS
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main page component
└── components/
    └── ChatInterface.tsx        # Main chat interface component
```

## API Integration

The chatbot is designed to work with any AI API. To integrate with your preferred AI service:

1. **Update the API route** (`src/app/api/chat/route.ts`):
   - Replace the `simulateAIResponse` function with your actual API call
   - Add your API configuration and authentication

2. **Add environment variables**:
   ```bash
   # .env.local
   YOUR_AI_API_KEY=your_api_key_here
   YOUR_AI_API_ENDPOINT=your_api_endpoint_here
   ```

3. **Example integration with OpenAI**:
   ```typescript
   const response = await fetch('https://api.openai.com/v1/chat/completions', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
     },
     body: JSON.stringify({
       model: 'gpt-3.5-turbo',
       messages: [{ role: 'user', content: message }],
       max_tokens: 150,
     }),
   });
   ```

## Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components for design changes
- Colors and themes can be adjusted in `tailwind.config.js`

### Chat Behavior
- Message handling logic is in `ChatInterface.tsx`
- API response processing is in `src/app/api/chat/route.ts`
- Add custom message types or features as needed

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 15** - React framework with App Router
- **React 18** - UI library with hooks and functional components
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on the repository or contact the development team.
