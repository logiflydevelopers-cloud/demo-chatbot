import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./TeachAgent.css";

const TeachAgentChat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");

  const bottomRef = useRef(null);

  // Auto Scroll
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial Welcome message — SAME AS ChatBotDrawer
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "Hi there 👋 I'm your assistant! Ask me anything.",
      },
    ]);
  }, []);

  // Send Message (Same API as ChatBotDrawer)
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();

    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setTyping(true);

    try {
      const res = await axios.post("http://localhost:4000/api/chatbot/chat", {
        userId: user?._id,
        message: userMsg,
      });

      const botReply = res.data.reply || "⚠ Error: No reply from server";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="teach-chat-container">

      {/* Chat Header */}
      <div className="teach-chat-header">
        <img src="/avatars/avatar1.png" alt="avatar" className="teach-header-avatar" />
        <span>Your AI Agent</span>
      </div>

      {/* Chat Body */}
      <div className="teach-chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`teach-msg ${msg.sender}`}>
            {msg.text}
          </div>
        ))}

        {typing && (
          <div className="teach-msg bot typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Chat Input */}
      <div className="teach-chat-input">
        <input
          type="text"
          value={input}
          placeholder="Type your question..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default TeachAgentChat;
