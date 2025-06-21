/**
 * @author Raiyan Labeeb
 * @description Utility functions for authentication, including password hashing and JWT generation.
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(inputPassword, storedHash) {
  return bcrypt.compare(inputPassword, storedHash);
}

export function generateToken(user) {
  const token = jwt.sign(
    { name: user.name, user_id: user.user_id },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
}

export function getUserIDFromToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.user_id;
  } catch (err) {
    return null; // Return null if token is invalid
  }
}

export function convertDate(isoString) {
  const date = new Date(isoString);

  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${mm}-${dd}-${yyyy}`;
}
