import React, { useState } from "react";

function DeleteLiftForm({ selectedDate }) {
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const liftDate = selectedDate.toISOString().split("T")[0];

    try {
      const res = await fetch("http://localhost:5000/api/lift", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ liftDate }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete lift");
      }

      setMessage("Lift deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error.message);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleDelete} className="max-w-md mx-auto mt-10">
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Lift for Selected Date
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
export default DeleteLiftForm;