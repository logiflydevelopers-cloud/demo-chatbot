// backend/controllers/chatbotController.js

import { getEmbedding, askOpenAIWithContext } from "../utils/openai.js";
import { queryVectors } from "../utils/pinecone.js";
import ChatbotSetting from "../models/ChatbotSetting.js";

/* ============================================================
    ⭐ SAVE / UPDATE CHATBOT SETTINGS (WEBSITE OPTIONAL)
============================================================ */
export const saveChatbotSettings = async (req, res) => {
  try {
    const {
      userId,
      avatar,
      firstMessage,
      primaryColor,
      alignment,
      website
    } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    // ⭐ Website is OPTIONAL
    const safeWebsite = website || null;

    let setting = await ChatbotSetting.findOne({ userId });

    if (!setting) {
      // CREATE NEW SETTINGS
      setting = new ChatbotSetting({
        userId,
        avatar,
        firstMessage,
        primaryColor,
        alignment,
        website: safeWebsite
      });
    } else {
      // UPDATE EXISTING SETTINGS
      setting.avatar = avatar;
      setting.firstMessage = firstMessage;
      setting.primaryColor = primaryColor;
      setting.alignment = alignment;
      setting.website = safeWebsite;
    }

    await setting.save();

    return res.json({
      success: true,
      message: "Settings saved successfully",
      settings: setting
    });

  } catch (err) {
    console.error("❌ Save settings error →", err);
    res.status(500).json({ error: "Failed to save settings" });
  }
};


/* ============================================================
    ⭐ GET CHATBOT SETTINGS
============================================================ */
export const getChatbotSettings = async (req, res) => {
  try {
    const { userId } = req.params;

    const settings = await ChatbotSetting.findOne({ userId });

    return res.json({
      success: true,
      settings: settings || null
    });

  } catch (err) {
    console.error("❌ Get settings error →", err);
    res.status(500).json({ error: "Failed to load settings" });
  }
};


/* ============================================================
    ⭐ MAIN CHAT FUNCTION — Pinecone + OpenAI
============================================================ */
export const chatWithBot = async (req, res) => {
  try {
    const { userId, question } = req.body;

    if (!userId || !question) {
      return res.status(400).json({ error: "Missing userId/question" });
    }

    const qEmbedding = await getEmbedding(question);
    const matches = await queryVectors(qEmbedding, userId, 5);

    const context = matches
      .map(m => m.metadata?.text || "")
      .join("\n\n---\n\n");

    const answer = await askOpenAIWithContext(question, context);

    return res.json({
      success: true,
      answer,
      contextPreview: context.slice(0, 300),
      pineconeMatches: matches.length,
    });

  } catch (err) {
    console.error("❌ Chat error →", err);
    res.status(500).json({ error: "Chat failed" });
  }
};
