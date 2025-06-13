/**
 * @author Raiyan Labeeb
 * @description This file contains database operations for creating, updating, deleting, and fetching lifts.
 */

import prisma from "../prisma/prisma.js";
export async function addLift(userId, liftDate, liftTitle) {
  try {
    const newLift = await prisma.lift.create({
      data: {
        user_id: userId,
        lift_date: new Date(liftDate), // Convert string date to Date object
        lift_title: liftTitle,
      },
    });
    return newLift;
  } catch (err) {
    throw new Error(err.message);
  }
}


