import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import axios from "axios";
import User from "../models/User.js"; // Mongoose model

const N8N_WEBHOOK = "https://your-n8n-domain/webhook/login-success"; 
const N8N_SECRET = "mySecret123";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1) User શોધો
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    // 2) Password verify
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // 3) JWT બનાવો
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1h" }
    );

    // 4) Prepare response
    const loginResponse = {
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    };

    // 5) Send data to n8n webhook
    axios.post(
      N8N_WEBHOOK,
      loginResponse,
      {
        headers: {
          "Content-Type": "application/json",
          "x-n8n-secret": N8N_SECRET
        },
        timeout: 2000
      }
    ).catch(err => console.error("n8n webhook failed:", err.message));

    // 6) Client response
    res.json(loginResponse);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
