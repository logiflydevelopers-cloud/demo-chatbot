import React from "react";
import ChatBotDrawer from "../Components/Auth/ChatBotDrawer";

const EmbedChatbotFrame = () => {
  const userId = window.location.pathname.split("/").pop();
  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <ChatBotDrawer
        userId={userId}
        apiBase="http://localhost:5678"
        primaryColor="#2563eb"
        avatar="/avatars/avatar1.png"
        firstMessage="Hi 👋 How can I help you today?"
      />
    </div>
  );
};

export default EmbedChatbotFrame;
