// src/Layout/CustomChatPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatBotDrawer from "../Components/Auth/ChatBotDrawer";
import { useParams, useNavigate } from "react-router-dom";

const CustomChatPage = ({ user }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  // Block access without login
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Customization states
  const [avatar, setAvatar] = useState("/avatars/avatar1.png");
  const [firstMessage, setFirstMessage] = useState("Hi there 👋 I'm your assistant!");
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [alignment, setAlignment] = useState("right");
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  const [showChat, setShowChat] = useState(true);
  const apiBase = "http://localhost:4000";

  // Load saved settings on mount (DB) + localStorage fallback for uploadedWebsite
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${apiBase}/api/chatbot/${userId}`);
        if (res.data.success && res.data.settings) {
          const s = res.data.settings;
          if (s.avatar) setAvatar(s.avatar);
          if (s.firstMessage) setFirstMessage(s.firstMessage);
          if (s.primaryColor) setPrimaryColor(s.primaryColor);
          if (s.alignment) setAlignment(s.alignment);
          if (s.website) setSelectedWebsite(s.website);
        }
      } catch (err) {
        // ignore; we still check localStorage below
        console.warn("Failed to load settings from DB:", err.message);
      }

      // fallback: user may have just uploaded a website (AddWebsiteForm stores it in localStorage)
      const uploaded = localStorage.getItem("uploadedWebsite");
      if (!uploaded) return;
      // If DB didn't have website, use uploaded one
      setSelectedWebsite((prev) => prev || uploaded);
    };

    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Save to backend (match chatbotRoutes: POST /api/chatbot/save)
  const saveCustomization = async () => {
    try {
      const payload = {
        userId,
        avatar,
        firstMessage,
        primaryColor,
        alignment,
        website: selectedWebsite || null,
      };

      const res = await axios.post(`${apiBase}/api/chatbot/save`, payload);
      if (res.data.success) {
        alert("Customization saved!");
      } else {
        alert("Save failed");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Save failed");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%", overflow: "hidden" }}>
      {/* TOP NAVBAR */}
      <div style={{
        position: "fixed", top: 0, width: "100%", display: "flex",
        justifyContent: "space-between", alignItems: "center",
        background: "#111", color: "#fff", padding: "10px 20px", zIndex: 1000
      }}>
        <button onClick={() => navigate(`/userDetails/${userId}`)}
          style={{
            background: "#2563eb", color: "#fff", border: "none",
            borderRadius: "6px", padding: "6px 16px", cursor: "pointer"
          }}>
          ⬅ Back
        </button>

        <h3 style={{ margin: 0 }}>Customize Chatbot</h3>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={saveCustomization} style={{
            background: "#facc15", color: "#000",
            border: "none", borderRadius: "6px",
            padding: "6px 16px", cursor: "pointer",
            fontWeight: "600"
          }}>
            💾 Save
          </button>

          <button onClick={() => navigate(`/embed-code/${userId}`)}
            style={{
              background: "#22c55e", color: "#fff", border: "none",
              borderRadius: "6px", padding: "6px 16px", cursor: "pointer"
            }}>
            Next ➡
          </button>
        </div>
      </div>

      {/* LEFT PANEL */}
      <div style={{
        width: "300px", background: "#f3f4f6", padding: "20px",
        borderRight: "1px solid #d1d5db", height: "100vh", overflowY: "auto",
        marginTop: "50px"
      }}>
        <h3 style={{ marginBottom: "15px" }}>Customize</h3>

        <label style={{ marginBottom: "8px", display: "block", fontWeight: "500" }}>
          Choose Avatar
        </label>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          {["/avatars/avatar1.png", "/avatars/avatar2.png", "/avatars/avatar3.png", "/avatars/avatar4.png", "/avatars/avatar5.png"]
            .map((img) => (
              <img key={img} src={img} onClick={() => setAvatar(img)}
                style={{
                  width: "55px", height: "55px", borderRadius: "50%",
                  border: avatar === img ? "3px solid #2563eb" : "2px solid #ccc",
                  padding: "3px", cursor: "pointer"
                }} alt="avatar" />
            ))}
        </div>

        <label>Chat Theme Color</label>
        <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)}
          style={{ width: "100%", height: "40px", marginBottom: "15px", cursor: "pointer" }} />

        <label>Welcome Message</label>
        <textarea value={firstMessage} onChange={(e) => setFirstMessage(e.target.value)}
          rows={3} style={{
            width: "100%", borderRadius: "6px", padding: "10px",
            border: "1px solid #ccc", marginBottom: "15px"
          }} />

        <label>Chat Position</label>
        <select value={alignment} onChange={(e) => setAlignment(e.target.value)}
          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}>
          <option value="right">Right</option>
          <option value="left">Left</option>
        </select>

        {/* Website selector (shows current selected website and allows clearing) */}
        <div style={{ marginTop: 16 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Selected Website</label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="text" readOnly value={selectedWebsite || ""} placeholder="No website selected"
              style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            <button onClick={() => { localStorage.removeItem("uploadedWebsite"); setSelectedWebsite(null); }}
              style={{ padding: "8px 10px", borderRadius: 6, background: "#ef4444", color: "#fff", border: "none", cursor: "pointer" }}>
              Clear
            </button>
          </div>
          <small style={{ color: "#6b7280" }}>If you uploaded a website, it will appear here automatically.</small>
        </div>
      </div>

      {/* MAIN PREVIEW */}
      <div style={{ flex: 1, position: "relative", marginTop: "50px" }}>
        {selectedWebsite ? (
          <iframe
            src={`http://localhost:4000/proxy?url=${encodeURIComponent(selectedWebsite)}`}
            title="Website Preview"
            style={{ width: "100%", height: "100%", border: "none", position: "absolute", top: 0, left: 0 }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />

        ) : (
          <div style={{
            height: "100%", display: "flex", justifyContent: "center",
            alignItems: "center", flexDirection: "column", background: "#f9fafb"
          }}>
            <p style={{ fontSize: "18px", fontWeight: "500" }}>🌐 No website selected</p>
            <p style={{ color: "#6b7280" }}>Upload a website to preview it here</p>
          </div>
        )}

        {showChat ? (
          <ChatBotDrawer key={primaryColor + avatar + firstMessage + alignment}
            userId={userId}
            apiBase={apiBase}
            primaryColor={primaryColor}
            avatar={avatar}
            firstMessage={firstMessage}
            alignment={alignment}
            onClose={() => setShowChat(false)} />
        ) : (
          <button onClick={() => setShowChat(true)}
            style={{
              position: "fixed", bottom: 20, [alignment]: 20, backgroundColor: primaryColor,
              color: "#fff", border: "none", borderRadius: "50%", width: "60px", height: "60px",
              fontSize: "28px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)", cursor: "pointer", zIndex: 9999
            }}>
            💬
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomChatPage;
