import { useState, useEffect } from "react";
import { Loader } from "../Loader/Loader";
import { Messages } from "../Messages/Messages";
import { Controls } from "../Controls/Controls";
import styles from "./Chat.module.css";

export function Chat({ assistant }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. I can help you with various tasks like coding, writing, analysis, and more. What would you like to work on today?"
    },
    {
      role: "user", 
      content: "Can you help me understand how to use AI tools in React applications?"
    },
    {
      role: "assistant",
      content: "Absolutely! I'd be happy to help you integrate AI tools into your React applications. There are several popular approaches:\n\n1. **API Integration**: Connect to AI services like OpenAI, Google AI, or Anthropic\n2. **Client-side Libraries**: Use SDKs like @google/generative-ai or openai\n3. **Streaming Responses**: Implement real-time chat experiences\n4. **Error Handling**: Proper error management for API calls\n\nWould you like me to show you a specific example?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const chatContainer = document.querySelector(`.${styles.Chat}`);
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  // Show typing indicator when streaming
  useEffect(() => {
    if (isStreaming) {
      setTypingIndicator(true);
    } else {
      setTypingIndicator(false);
    }
  }, [isStreaming]);

  function updateLastMessageContent(content) {
    setMessages((prevMessages) =>
      prevMessages.map((message, index) =>
        index === prevMessages.length - 1
          ? { ...message, content: `${message.content}${content}` }
          : message
      )
    );
  }

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  function clearChat() {
    setMessages([]);
  }

  async function handleContentSend(content) {
    if (!assistant) {
      addMessage({
        content: "Please select an AI assistant first!",
        role: "system",
      });
      return;
    }

    addMessage({ content, role: "user" });
    setIsLoading(true);
    try {
      const result = await assistant.chatStream(
        content,
        messages.filter(({ role }) => role !== "system")
      );

      let isFirstChunk = false;
      for await (const chunk of result) {
        if (!isFirstChunk) {
          isFirstChunk = true;
          addMessage({ content: "", role: "assistant" });
          setIsLoading(false);
          setIsStreaming(true);
        }

        updateLastMessageContent(chunk);
      }

      setIsStreaming(false);
    } catch (error) {
      addMessage({
        content:
          error?.message ??
          "Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
      setIsLoading(false);
      setIsStreaming(false);
    }
  }

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.Chat}>
        <div className={styles.ChatHeader}>
          <h3>Chat</h3>
          {messages.length > 0 && (
            <button 
              className={styles.ClearButton}
              onClick={clearChat}
              title="Clear chat"
            >
              🗑️ Clear
            </button>
          )}
        </div>
        
        <Messages messages={messages} />
        
        {typingIndicator && (
          <div className={styles.TypingIndicator}>
            <div className={styles.TypingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>AI is typing...</span>
          </div>
        )}
      </div>

      <Controls
        isDisabled={isLoading || isStreaming}
        onSend={handleContentSend}
      />
    </>
  );
}