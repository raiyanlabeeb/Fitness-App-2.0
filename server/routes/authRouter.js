/**
 * @author Raiyan Labeeb
 * @description This file defines the routes for user authentication, including login and signup endpoints.
 */

import express from "express";
import { loginUser, signUpUser } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signUpUser);

export default router; // Exports the router so it can be used in other files
