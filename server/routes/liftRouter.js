/**
 * @author Raiyan Labeeb
 * @description This file defines the routes for workout-related operations, including creating, updating, deleting, and fetching workouts.
 * @file workoutRouter.js
 */

import express from "express";  
import { createLift, updateLift, readLifts, deleteLift } from "../controllers/liftController.js"; 
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router(); 
router.post("/lift", authenticateToken, createLift); // any post request to /api will call the createLift function from liftController.js
router.put("/lift", authenticateToken, updateLift); // any put request to /api will call the updateLift function from liftController.js
router.get("/lift", authenticateToken, readLifts);
router.delete("/lift", authenticateToken, deleteLift);
export default router; // Export the router to be used in the main server file