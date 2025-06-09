import express from "express";
import cors from "cors";
import * as testPrisma from "./testPrisma.js";

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const users = await testPrisma.returnAllUsers();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
