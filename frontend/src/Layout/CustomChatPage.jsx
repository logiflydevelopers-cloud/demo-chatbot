import React, { useState, useEffect } from "react";
import ChatBotDrawer from "../Components/Auth/ChatBotDrawer";
import { useParams, useNavigate } from "react-router-dom";

const CustomChatPage = ({ user }) => {
  // ✅ Must be inside the component
  const { userId } = useParams();
  const navigate = useNavigate();

  // 🧠 Customization states
  const [avatar, setAvatar] = useState("/avatars/avatar1.png");
  const [firstMessage, setFirstMessage] = useState("Hi there 👋 I'm your assistant!");
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [alignment, setAlignment] = useState("right");

  // 🌐 Website preview
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  // 💬 Chat toggle
  const [showChat, setShowChat] = useState(true);

  // ✅ Load saved settings
  useEffect(() => {
    const savedAvatar = localStorage.getItem("chatbot_avatar");
    const savedMessage = localStorage.getItem("chatbot_firstMessage");
    const savedColor = localStorage.getItem("chatbot_color");
    const savedAlign = localStorage.getItem("chatbot_alignment");
    const savedWebsite = localStorage.getItem("uploadedWebsite");

    if (savedAvatar) setAvatar(savedAvatar);
    if (savedMessage) setFirstMessage(savedMessage);
    if (savedColor) setPrimaryColor(savedColor);
    if (savedAlign) setAlignment(savedAlign);
    if (savedWebsite) setSelectedWebsite(savedWebsite);
  }, []);

  // ✅ Save settings whenever user changes
  useEffect(() => {
    localStorage.setItem("chatbot_avatar", avatar);
    localStorage.setItem("chatbot_firstMessage", firstMessage);
    localStorage.setItem("chatbot_color", primaryColor);
    localStorage.setItem("chatbot_alignment", alignment);
  }, [avatar, firstMessage, primaryColor, alignment]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* 🔝 Top Navigation */}
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#111",
          color: "#fff",
          padding: "10px 20px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 16px",
            cursor: "pointer",
          }}
        >
          ⬅ Back
        </button>

        <h3 style={{ margin: 0 }}>Customize Chatbot</h3>

        <button
          onClick={() => navigate(`/embed-code/${userId}`)}
          style={{
            background: "#22c55e",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 16px",
            cursor: "pointer",
          }}
        >
          Next ➡
        </button>
      </div>

      {/* 🎨 Left Panel — Customization Controls */}
      <div
        style={{
          width: "320px",
          background: "#fff",
          padding: "80px 20px 20px", // padding-top added to avoid overlap with header
          borderRight: "1px solid #e5e7eb",
          boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
          zIndex: 3,
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#1f2937" }}>🎨 Customize Chatbot</h2>

        {/* Avatar Selection */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "500", display: "block", marginBottom: "8px" }}>Avatar</label>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["/avatars/avatar1.png", "/avatars/avatar2.png", "/avatars/avatar3.png", "/avatars/avatar4.png"].map(
              (src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="avatar"
                  onClick={() => setAvatar(src)}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    border: avatar === src ? "3px solid #2563eb" : "2px solid #ddd",
                    objectFit: "cover",
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* First Message */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "500", display: "block", marginBottom: "8px" }}>First Message</label>
          <input
            type="text"
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            placeholder="Hi there 👋 I'm your assistant!"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
            }}
          />
        </div>

        {/* Primary Color */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "500", display: "block", marginBottom: "8px" }}>Primary Color</label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          />
        </div>

        {/* Alignment */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "500", display: "block", marginBottom: "8px" }}>Alignment</label>
          <div>
            <label>
              <input
                type="radio"
                name="align"
                checked={alignment === "left"}
                onChange={() => setAlignment("left")}
              />
              Left
            </label>
            <label style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                name="align"
                checked={alignment === "right"}
                onChange={() => setAlignment("right")}
              />
              Right
            </label>
          </div>
        </div>
      </div>

      {/* 🌐 Website Preview Background */}
      <div style={{ flex: 1, position: "relative" }}>
        {selectedWebsite ? (
          <iframe
            src={selectedWebsite}
            title="Website Preview"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          ></iframe>
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: "#f9fafb",
            }}
          >
            <p style={{ fontSize: "18px", fontWeight: "500", color: "#111827" }}>
              🌐 No website selected yet
            </p>
            <p style={{ color: "#6b7280" }}>Upload a website first to preview it here.</p>
          </div>
        )}

        {/* 💬 Chatbot Drawer / Icon */}
        {showChat ? (
          <ChatBotDrawer
            userId={user?._id}
            apiBase="http://localhost:5000"
            primaryColor={primaryColor}
            avatar={avatar}
            firstMessage={firstMessage}
            onClose={() => setShowChat(false)}
          />
        ) : (
          <button
            onClick={() => setShowChat(true)}
            style={{
              position: "fixed",
              bottom: 20,
              [alignment]: 20,
              backgroundColor: primaryColor,
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              fontSize: "28px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "pointer",
              zIndex: 9999,
            }}
          >
            💬
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomChatPage;
