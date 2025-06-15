import React, { useState } from "react";

const DeleteLiftForm = () => {
  const [liftDate, setLiftDate] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/lift", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ liftDate: liftDate }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete lift");
      }

      setMessage("Lift deleted successfully!");
      setLiftDate(""); // Reset the form
      window.location.reload(); // Reload to show the new lift
    } catch (error) { 
      console.error("Error:", error.message);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleDelete} className="space-y-4 max-w-md mx-auto">
      <label className="block">
        <span className="text-gray-700">Enter Lift Date to Delete:</span>
        <input
          type="date"
          value={liftDate}
          onChange={(e) => setLiftDate(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 p-2 rounded"
        />
      </label>
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Lift
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
};

export default DeleteLiftForm;
