const isDev = process.env.NODE_ENV !== "production";
const frontendBase = isDev
  ? "http://localhost:3000"
  : "https://yourfrontenddomain.com";

router.get("/:userId.js", (req, res) => {
  const { userId } = req.params;
  const script = `
    (function() {
      console.log("✅ Chatbot script loaded for user: ${userId}");
      if (document.getElementById("chatbot-iframe-${userId}")) return;
      const iframe = document.createElement("iframe");
      iframe.id = "chatbot-iframe-${userId}";
      iframe.src = "${frontendBase}/embed/chat/${userId}";
      iframe.style.position = "fixed";
      iframe.style.bottom = "20px";
      iframe.style.right = "20px";
      iframe.style.width = "420px";
      iframe.style.height = "520px";
      iframe.style.border = "none";
      iframe.style.borderRadius = "12px";
      iframe.style.zIndex = "999999";
      document.body.appendChild(iframe);
    })();
  `;
  res.setHeader("Content-Type", "application/javascript");
  res.send(script);
});
