import express from "express";
const router = express.Router();

/**
 * ✅ This route generates a dynamic JS file for embedding the chatbot
 * Example: http://localhost:5678/embed/USER_ID.js
 */
router.get("/:userId.js", (req, res) => {
  const { userId } = req.params;

  // (Later you can fetch these from DB)
  const settings = {
    primaryColor: "#2563eb",
    alignment: "right",
  };

  // ✅ Embed script that injects chatbot iframe
  const script = `
  (function() {
    console.log("✅ Chatbot script loaded for user: ${userId}");

    if (document.getElementById("chatbot-iframe-${userId}")) return;

    const iframe = document.createElement("iframe");
    iframe.id = "chatbot-iframe-${userId}";
    iframe.src = "http://localhost:3000/embed/chat/${userId}";
    iframe.style.position = "fixed";
    iframe.style.bottom = "20px";
    iframe.style.${settings.alignment} = "20px";
    iframe.style.width = "420px";
    iframe.style.height = "520px";
    iframe.style.border = "none";
    iframe.style.borderRadius = "12px";
    iframe.style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)";
    iframe.style.zIndex = "999999";
    document.body.appendChild(iframe);
  })();
  `;

  res.setHeader("Content-Type", "application/javascript");
  res.send(script);
});

export default router;
