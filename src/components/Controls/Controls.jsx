import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./Controls.module.css";

export function Controls({ isDisabled = false, onSend }) {
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (!isDisabled) {
      textareaRef.current.focus();
    }
  }, [isDisabled]);

  function handleContentChange(event) {
    const newContent = event.target.value;
    setContent(newContent);
    setCharCount(newContent.length);
  }

  function handleContentSend() {
    if (content.trim().length > 0) {
      onSend(content.trim());
      setContent("");
      setCharCount(0);
    }
  }

  function handleEnterPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      setContent("");
      setCharCount(0);
      textareaRef.current?.blur();
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <TextareaAutosize
          ref={textareaRef}
          className={styles.TextArea}
          disabled={isDisabled}
          placeholder="Message AI Chatbot (Press Enter to send, Esc to clear)"
          value={content}
          minRows={1}
          maxRows={4}
          onChange={handleContentChange}
          onKeyDown={(e) => {
            handleEnterPress(e);
            handleKeyDown(e);
          }}
        />
        {charCount > 0 && (
          <div className={styles.CharCount}>
            {charCount} characters
          </div>
        )}
      </div>
      <button
        className={styles.Button}
        disabled={isDisabled || content.trim().length === 0}
        onClick={handleContentSend}
        title="Send message"
      >
        <SendIcon />
      </button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#5f6368"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}