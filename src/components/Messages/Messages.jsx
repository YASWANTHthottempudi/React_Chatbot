import { useRef, useEffect, useMemo } from "react";
import Markdown from "react-markdown";
import styles from "./Messages.module.css";

const WELCOME_MESSAGE_GROUP = [
  {
    role: "assistant",
    content: "Hello! How can I assist you right now?",
  },
];

export function Messages({ messages = [] }) {
  const messagesEndRef = useRef(null);
  const messagesGroups = useMemo(
    () => {
      if (!messages || messages.length === 0) {
        return [];
      }
      
      return messages.reduce((groups, message) => {
        if (message.role === "user") {
          groups.push([]);
        }
        if (groups.length > 0) {
          groups[groups.length - 1].push(message);
        }
        return groups;
      }, []);
    },
    [messages]
  );

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.role === "user") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={styles.Messages}>
      {messagesGroups.length === 0 ? (
        // Show welcome message when no messages exist
        <div className={styles.Group}>
          {WELCOME_MESSAGE_GROUP.map(({ role, content }, index) => (
            <div key={index} className={styles.Message} data-role={role}>
              <Markdown>{content}</Markdown>
            </div>
          ))}
        </div>
      ) : (
        // Show actual messages
        messagesGroups.map((messages, groupIndex) => (
          <div key={groupIndex} className={styles.Group}>
            {messages.map(({ role, content }, index) => (
              <div key={index} className={styles.Message} data-role={role}>
                <Markdown>{content}</Markdown>
              </div>
            ))}
          </div>
        ))
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}