import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  avatar: String,
  firstMessage: String,
  primaryColor: String,
  alignment: String,
  website: String,    
}, { timestamps: true });

export default mongoose.model("ChatbotSettings", settingsSchema);
