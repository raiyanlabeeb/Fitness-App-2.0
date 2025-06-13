/**
 * @author Raiyan Labeeb
 * @description this file contains the logic for handling workout-related operations such as creating, updating, deleting, and fetching workouts.
 * @file workoutController.js
 */

import prisma from "../prisma/prisma.js";
import { addLift } from "../models/liftModel.js";
import { getUserIDFromToken } from "../utils/authUtil.js";
export async function createLift(req, res) {
  const { liftDate, liftTitle } = req.body;
  if (!liftDate || !liftTitle) {
    return res.status(400).json({ error: "Missing fields" }); // error handling for missing fields
  }

  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    const user_id = getUserIDFromToken(token);
    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized" }); // If no user_id is found, return an error (401 Unauthorized)
    }

    const newLift = await addLift(user_id, liftDate, liftTitle); // Calls the createLift function to create a new lift entry

    res
      .status(201)
      .json({ message: "Lift created successfully", lift: newLift });
  } catch (err) {
    return res.status(500).json({ error: err.message }); // internal server error
  }
}

export async function updateLift(req, res) {
  const { newliftDate, newEmail, oldliftDate, oldEmail, liftTitle } = req.body;
  if (!liftDate || !email || !liftTitle) {
    return res.status(400).json({ error: "Missing fields" }); // error handling for missing fields
  }

  try {
    const updatedLift = await prisma.lift.update({
      where: { email: email, liftDate: new Date(liftDate) },
      data: {
        liftDate: new Date(liftDate), // Convert string date to Date object
        email: email,
        liftTitle: liftTitle,
      },
    });

    res
      .status(200)
      .json({ message: "Lift updated successfully", lift: updatedLift });
  } catch (err) {
    return res.status(500).json({ error: err.message }); // internal server error
  }
}
