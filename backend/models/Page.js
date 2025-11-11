import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  userId: String,
  url: String,
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Page", pageSchema);
