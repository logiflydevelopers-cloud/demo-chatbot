import express from "express";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

// Login API
router.post("/login", loginUser);

export default router;
