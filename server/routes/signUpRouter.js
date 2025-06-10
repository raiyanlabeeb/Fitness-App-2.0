import express from "express";
import cors from "cors";
import prisma from "../prisma/prisma.js"; 

const router = express.Router();

router.use(express.json());
router.use(cors());

router.post("/signup", async (req, res) => { //everytime a POST request is made to /signup, this function will be executed
  const { name, email, password} = req.body; // Extracts the email and password that the user provides

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" }); // error handling for missing email or password
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }, // Checks if a user with the provided email already exists,
    });

    if(existingUser) {
        return res.status(409).json({ error: "User already exists" }); // If user exists, return an error (409 Conflict)
    }

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: password, //TODO: hash the password before saving it
        name: name // Adding the name field to the user creation
      }
    });
    res.status(201).json({ message: "User created successfully", user: newUser }); // Respond with success message and user data

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" }); //internal server error
  }
});

export default router; // Exporting the router to be used in the main server file
