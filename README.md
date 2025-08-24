# 🤖 React AI Chatbot

A modern, feature-rich AI chatbot built with React that supports multiple AI providers including Google AI (Gemini), OpenAI, DeepSeek, and Anthropic Claude.

![React AI Chatbot](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.3-purple?logo=vite)
![TypeScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-brightgreen?logo=netlify)

## 🌐 Live Demo

**Try the chatbot live:** [https://resonant-sunshine-df41a9.netlify.app](https://resonant-sunshine-df41a9.netlify.app)

---

## ✨ Features

### 🤖 Multi-AI Support
- **Google AI (Gemini)**: Gemini 2.0 Flash and Flash-Lite models
- **OpenAI**: GPT-4o and GPT-4o mini models
- **DeepSeek AI**: DeepSeek-V3 model
- **Anthropic Claude**: Claude 3.5 Haiku model

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful glass-like effects with backdrop blur
- **Dark/Light Theme**: Automatic theme switching with manual override
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Smooth Animations**: Elegant transitions and micro-interactions

### 💬 Chat Features
- **Real-time Streaming**: Live message streaming for better UX
- **Message History**: Persistent chat history with sidebar navigation
- **Markdown Support**: Rich text formatting in AI responses
- **Typing Indicators**: Visual feedback when AI is responding
- **Auto-scroll**: Automatically scrolls to new messages
- **Clear Chat**: Easy way to reset conversations

### ⌨️ Enhanced Controls
- **Keyboard Shortcuts**: 
  - `Enter` to send messages
  - `Shift + Enter` for new lines
  - `Escape` to clear input
- **Character Counter**: Real-time character count
- **Auto-resize Textarea**: Dynamic input field sizing


**Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Google AI (Gemini)
   VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   
   # OpenAI
   VITE_OPEN_AI_API_KEY=your_openai_api_key_here
   
   # DeepSeek AI
   VITE_DEEPSEEK_AI_API_KEY=your_deepseek_api_key_here
   
   # Anthropic Claude
   VITE_ANTHROPIC_AI_API_KEY=your_anthropic_api_key_here
   ```





## 📁 Project Structure

```
react-ai-chatbot/
├── src/
│   ├── assistants/          # AI provider implementations
│   │   ├── googleai.js      # Google AI (Gemini) integration
│   │   ├── openai.js        # OpenAI integration
│   │   ├── deepseekai.js    # DeepSeek AI integration
│   │   └── anthropicai.js   # Anthropic Claude integration
│   ├── components/          # React components
│   │   ├── Chat/           # Main chat interface
│   │   ├── Messages/       # Message display component
│   │   ├── Controls/       # Input controls
│   │   ├── Sidebar/        # Chat history sidebar
│   │   ├── Assistant/      # AI provider selector
│   │   ├── Theme/          # Theme switcher
│   │   └── Loader/         # Loading animations
│   ├── App.jsx             # Main application component
│   ├── App.module.css      # Main app styles
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🎯 Usage

### Basic Chat
1. Select your preferred AI assistant from the dropdown
2. Type your message in the input field
3. Press `Enter` to send or click the send button
4. Wait for the AI response (streaming in real-time)

### Switching AI Providers
- Use the "Assistant" dropdown to switch between different AI models
- Each provider offers different capabilities and response styles
- You can switch mid-conversation

### Theme Customization
- Use the "Theme" dropdown to switch between:
  - **System**: Follows your system preference
  - **Light**: Force light theme
  - **Dark**: Force dark theme

### Chat Management
- Use the sidebar to navigate between different chat topics
- Click the "Clear" button to reset the current conversation
- The chat history is automatically saved during your session



### Adding New AI Providers

1. Create a new file in `src/assistants/`
2. Implement the `Assistant` class with `chat()` and `chatStream()` methods
3. Add the provider to the `Assistant` component dropdown
5. Update the environment variables



## 🎨 Customization

### Styling
The project uses CSS Modules for styling. You can customize:
- Colors and themes in `src/index.css`
- Component-specific styles in their respective `.module.css` files
- Layout and spacing in `src/App.module.css`

### Adding Features
- New chat features can be added to the `Chat` component
- UI enhancements can be made to individual components
- New AI providers can be integrated following the existing pattern


