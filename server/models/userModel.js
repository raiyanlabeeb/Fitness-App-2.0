/**
 * @author Raiyan Labeeb
 * @description This file handles user-related database operations, such as retrieving a user by email and creating a new user.
 */

import prisma from "../prisma/prisma.js";

/**
 * @description Retrieves a user by their email address.
 * @param {*} email
 * @returns
 */
export async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * @description Retrieves a user by their ID.
 * @param {*} id
 * @returns
 */
export async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * @description Creates a new user with the provided email and password hash.
 * @param {*} email
 * @param {*} passwordHash
 * @returns
 */
export async function createUser(email, passwordHash, name) {
  return prisma.user.create({
    data: {
      email: email,
      password: passwordHash,
      name: name,
    },
  });
}

export async function getUserID(email) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { user_id: true }, // Only select the ID field
  });
  return user ? user.user_id : null; // Return the user ID or null if not found
}
