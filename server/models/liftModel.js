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

export async function changeLift(userId, liftDate, newLiftTitle) {
  try {
    const updatedLift = await prisma.lift.update({
      where: {
        lift_date_user_id: {
          user_id: userId,
          lift_date: new Date(liftDate), // Convert string date to Date object
        },
      },
      data: {
        lift_title: newLiftTitle,
      },
    });
    return updatedLift;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function doesLiftExist(userId, liftDate) {
  try {
    const lift = await prisma.lift.findUnique({
      where: {
        lift_date_user_id: {
          lift_date: new Date(liftDate),
          user_id: userId,
        },
      },
    });
    return !!lift;
  } catch (err) {
    throw new Error(err.message);
  }
}
