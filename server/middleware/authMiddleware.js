/** 
* @author Raiyan Labeeb
* @file authMiddleware.js
* @description This module provides middleware for authenticating JWT tokens when a user tries to access 
the main page
* @requires jsonwebtoken - A library for generating and verifying JSON Web Tokens (JWT)
* @exports authenticateToken - Middleware function to authenticate JWT tokens
*/

import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library for token generation and verification

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Extracts the authorization header from the request
  const token = authHeader && authHeader.split(" ")[1]; // Splits the header to get the token part

  if (!token) {
    return res.status(401).json({ error: "Access token is missing" }); // If no token is provided, return an error (401 Unauthorized)
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" }); // If token verification fails, return an error (403 Forbidden)
    }

    req.user = user; // If token is valid, attach the user information to the request object
    next();
  });
};

export default authenticateToken; // Export the middleware function for use in other parts of the application
