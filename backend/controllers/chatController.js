import { getAnswerFromOpenAI } from "../utils/openai.js";
import Page from "../models/Page.js";

export const chatWithBot = async (req, res) => {
  try {
    const { userId, question } = req.body;
    if (!userId || !question) {
      return res.status(400).json({ error: "Missing userId or question" });
    }

    const pages = await Page.find({ userId });
    const context = pages.map((p) => p.url).join("\n");

    const answer = await getAnswerFromOpenAI(question, context);

    res.json({ success: true, answer });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: "Chat failed", details: err.message });
  }
};
