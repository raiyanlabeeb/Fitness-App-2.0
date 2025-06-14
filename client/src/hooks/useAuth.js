/**
 * @author Raiyan Labeeb
 * @description Custom hook to handle user authentication. Checks to see if there's a valid token in localStorage,
 * and if so, fetches user data from the server. If the token is invalid or missing, it redirects to the login page.
 * @returns {user}} user - The authenticated user's data.
 */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * @description Custom hook to handle user authentication. This function is called automatically when the component mounts and checks if the user is valid.
 * This function should be called before displaying sensitive data or components that require authentication.
 * @returns {string|null} user - The authenticated user's data or null if not authenticated.
 */
export function useAuth() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    fetch("http://localhost:5000/api/main", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);
    });
  });

  return user;
}
