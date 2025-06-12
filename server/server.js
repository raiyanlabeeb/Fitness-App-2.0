/**
 * @author Raiyan Labeeb
 * @description This file sets up the Express server, configures middleware, and defines the main routes for the application.
 */

import express from "express";
import cors from "cors";
import auth from "./routes/authRouter.js";
import mainRoute from "./routes/mainRoute.js";

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use("/auth", auth); // for any route starting with /auth, use the auth router
app.use("/api", mainRoute); // for any route starting with /, use the main route

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
