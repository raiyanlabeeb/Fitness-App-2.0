/**
 * @author Raiyan Labeeb
 * @file mainRoute.js
 * @description This module defines the main route for the application, which is protected by JWT authentication.
 * It responds with user information and a welcome message when accessed.
 * @exports router - The main route for the application
 */

import express from "express";
import cors from "cors";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(express.json());
router.use(cors());

router.get("/main", authenticateToken, async (req, res) => {
  res.status(200).json({ user: req.user, message: "Welcome to the main page!" }); // Responds with user information and a welcome message
});

export default router; // Export the router to be used in the main server file