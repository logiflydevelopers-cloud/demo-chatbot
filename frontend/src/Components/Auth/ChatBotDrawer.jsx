import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

/**
 * 🧠 ChatBotDrawer Component
 * Fully customizable chatbot widget supporting:
 * - Custom avatar
 * - Theme color
 * - Dynamic welcome message
 * - Smooth auto-scroll
 * - Per-user chat persistence (userId)
 */

export default function ChatBotDrawer({
  userId,
  apiBase = "http://localhost:5000",
  primaryColor = "#2563eb",
  avatar = "/bot1.png",
  firstMessage = "Hi there 👋 How can I assist you today?",
  onClose,
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  // ✅ Scroll chat to bottom whenever new messages are added
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ Add the first welcome message once
  useEffect(() => {
    setMessages([{ from: "bot", text: firstMessage }]);
  }, [firstMessage]);

  // ✅ Send a message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post(`${apiBase}/api/chat`, {
        userId,
        question: input,
      });

      const botMsg = {
        from: "bot",
        text: res.data.answer || "🤖 I couldn’t find an answer for that.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chatbot error:", err);
      const botMsg = {
        from: "bot",
        text: "⚠️ Server connection failed. Please try again later.",
      };
      setMessages((prev) => [...prev, botMsg]);
    }
  };

  // ✅ Handle Enter key for sending messages
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 370,
        height: 540,
        borderRadius: 16,
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "system-ui, sans-serif",
        zIndex: 9999,
      }}
    >
      {/* ✅ Chat Header */}
      <div
        style={{
          padding: "12px 16px",
          background: primaryColor,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={avatar}
            alt="bot"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: "2px solid #fff",
            }}
          />
          <b>AI Chatbot</b>
        </div>

        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
      </div>

      {/* ✅ Chat Messages */}
      <div
        ref={chatRef}
        style={{
          flex: 1,
          padding: "12px",
          overflowY: "auto",
          backgroundColor: "#f8fafc",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.from === "user" ? "right" : "left",
              margin: "10px 0",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: m.from === "user" ? "flex-end" : "flex-start",
            }}
          >
            {m.from === "bot" && (
              <img
                src={avatar}
                alt="bot"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              />
            )}

            <div
              style={{
                background: m.from === "user" ? primaryColor : "#e2e8f0",
                color: m.from === "user" ? "#fff" : "#111827",
                padding: "10px 14px",
                borderRadius:
                  m.from === "user"
                    ? "14px 14px 2px 14px"
                    : "14px 14px 14px 2px",
                maxWidth: "80%",
                wordBreak: "break-word",
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Chat Input */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #e2e8f0",
          padding: "8px",
          background: "#fff",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            padding: "10px",
            outline: "none",
            fontSize: "14px",
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          style={{
            background: primaryColor,
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            marginLeft: "8px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "background 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#1e40af")}
          onMouseOut={(e) => (e.target.style.background = primaryColor)}
        >
          Send
        </button>
      </div>
    </div>
  );
}
