/**
 * @author Raiyan Labeeb
 * @description this file contains the fetch calls to the backend for authentication
 */

export async function loginUser(email, password) {
  const response = await fetch("http://localhost:5000/auth/login", {
    //Send a post request to the server to login
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json(); // Waits for the response and converts it to JSON. Data now holds the response from the server.
  if (!response.ok) {
    throw new Error(data.error || "An error occurred. Please try again.");
  }

  return data;
}

export async function signUpUser(name, email, password) {
  const response = await fetch("http://localhost:5000/auth/signup", {
    // Sends a POST request to the server to create a new user
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json(); // Waits for the response and converts it to JSON. Data now holds the response from the server.
  if (!response.ok) {
    throw new Error(data.error || "An error occurred. Please try again.");
  }
  
  return data;
}
