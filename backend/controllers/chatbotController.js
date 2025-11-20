// controllers/chatbotController.js
import ChatbotSettings from "../models/ChatbotSetting.js"; // <-- correct filename

// Save or Update Chatbot Settings
export const saveChatbotSettings = async (req, res) => {
  try {
    const { userId, avatar, firstMessage, primaryColor, alignment, website } = req.body;

    // allow userId as string or ObjectId
    let settings = await ChatbotSettings.findOne({ userId });

    if (settings) {
      settings.avatar = avatar;
      settings.firstMessage = firstMessage;
      settings.primaryColor = primaryColor;
      settings.alignment = alignment;
      settings.website = website;
      await settings.save();
    } else {
      settings = new ChatbotSettings({
        userId,
        avatar,
        firstMessage,
        primaryColor,
        alignment,
        website
      });
      await settings.save();
    }

    res.json({ success: true, settings });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET user chatbot settings
export const getChatbotSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    const settings = await ChatbotSettings.findOne({ userId });

    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
