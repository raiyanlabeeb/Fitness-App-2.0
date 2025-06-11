import express from "express";
import cors from "cors";
import prisma from "../prisma/prisma.js";
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing

const router = express.Router();
router.use(express.json());
router.use(cors());

router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Extracts the email and password that the user provides
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" }); // error handling for missing email or password
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }, // Checks if a user with the provided email exists
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" }); // If user does not exist, return an error (404 Not Found)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compares the provided password with the hashed password in the database
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" }); // If password is incorrect, return an error (401 Unauthorized)
    }

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, email: user.email, name: user.name },
    }); // Respond with success message and user data (excluding password)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error during login." }); //internal server error
  }
});

router.post("/signup", async (req, res) => {
  //everytime a POST request is made to /signup, this function will be executed
  const { name, email, password } = req.body; // Extracts the email and password that the user provides

  if (!email || !password || !name) {
    // Checks if email, password, and name are provided
    return res.status(400).json({ error: "Missing fields" }); // error handling for missing email or password
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }, // Checks if a user with the provided email already exists,
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" }); // If user exists, return an error (409 Conflict)
    }

    const hashedPassword = await bcrypt.hash(password, 10); // second parameter: 10 is the salt rounds for hashing the password
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name, // Adding the name field to the user creation
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", email: email, name: name}); // Respond with success message and user data
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" }); //internal server error
  }
});

export default router; // Exports the router so it can be used in other files