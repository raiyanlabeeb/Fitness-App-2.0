/**
 * @author Raiyan Labeeb
 * @description This file contains the fetch calls to the backend for managing lifts.
 */

/**
 * @description Fetches all lifts from the backend API. This function can be used inside useEffect() to display all lifts when a component mounts.
 */
export function fetchLifts() {
  return fetch("http://localhost:5000/api/lift", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch lifts");
    }
    const data = await res.json();
    return data.lifts;
  });
}
