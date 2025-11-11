import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// ✅ Import all routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/UserRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import webhookRoutes from "./routes/webhook.js";
import embedRoutes from "./routes/embed"; // ✅ this one must be here

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5678;

// ✅ Middlewares
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ Allow iframe embedding
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// ✅ Connect database (if needed)
connectDB();

// ✅ Basic route
app.get("/", (req, res) => res.send("✅ Chatbot Backend running..."));

// ✅ Register routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/embed", embedRoutes); // ✅ VERY IMPORTANT

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
