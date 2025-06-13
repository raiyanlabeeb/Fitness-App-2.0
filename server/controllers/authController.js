/**
 * @author Raiyan Labeeb
 * @description This file contains the authentication controller functions for user login and signup. It handles all logic that bridges view to model.
 */

import { getUserByEmail, createUser } from "../models/userModel.js";
import {
  hashPassword,
  verifyPassword,
  generateToken,
} from "../utils/authUtil.js";

export async function loginUser(req, res) {
  const { email, password } = req.body; // Extracts the email and password that the user provides
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" }); // error handling for missing email or password
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" }); // If user does not exist, return an error (404 Not Found)
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" }); // If password is incorrect, return an error (401 Unauthorized)
    }

    const token = generateToken(user); // Generates a JWT token for the user
    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, email: user.email, name: user.name },
      token: token,
    }); // Respond with success message and user data (excluding password)
  } catch (err) {
    return res.status(500).json({ error: "Server error during login." }); //internal server error
  }
}

export async function signUpUser(req, res) {
  //everytime a POST request is made to /signup, this function will be executed
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    // Checks if email, password, and name are provided
    return res.status(400).json({ error: "Missing fields" }); // error handling for missing email or password
  }

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" }); // If user exists, return an error (409 Conflict)
    }

    const hashedPassword = await hashPassword(password); // Hashes the provided password using bcrypt
    const newUser = await createUser(email, hashedPassword, name); // Creates a new user with the provided email and hashed password

    const token = generateToken(newUser);
    res.status(201).json({
      message: "User created successfully",
      email: newUser.email,
      name: newUser.name,
      token: token, // Respond with the token and user data (excluding password)
    }); // Respond with success message and user data
  } catch (error) {
    res.status(500).json({ error: error.message }); //internal server error
  }
}
