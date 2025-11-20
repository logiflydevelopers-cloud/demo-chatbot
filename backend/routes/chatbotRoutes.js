import express from "express";
import {
  saveChatbotSettings,
  getChatbotSettings
} from "../controllers/chatbotController.js";

import { chatWithBot } from "../controllers/chatController.js";  // ⭐ ADD THIS

const router = express.Router();

router.post("/save", saveChatbotSettings);
router.get("/:userId", getChatbotSettings);

// ⭐ CHATBOT API ENDPOINT
router.post("/chat", chatWithBot);

export default router;
