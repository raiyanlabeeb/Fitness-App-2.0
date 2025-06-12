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
  return jwt.sign({ name: user.name, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
}