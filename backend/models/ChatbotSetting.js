import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // ⭐ FIXED
    avatar: String,
    firstMessage: String,
    primaryColor: String,
    alignment: String,
    website: { type: String, default: null }, // ⭐ Website optional
  },
  { timestamps: true }
);

export default mongoose.model("ChatbotSetting", settingsSchema);
