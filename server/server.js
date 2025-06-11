import express from "express";
import cors from "cors";
import auth from "./routes/authRouter.js";

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use("/auth", auth); // for any route starting with /auth, use the auth router

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
