import React, { useState } from "react";

function UpdateLiftForm({ selectedDate }) {
  const [newLiftTitle, setNewLiftTitle] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const liftDate = selectedDate.toISOString().split("T")[0];

    try {
      const res = await fetch("http://localhost:5000/api/lift", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ liftDate, newLiftTitle }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setNewLiftTitle("");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Update Lift</h2>

      <label className="block mb-1 text-sm">New Title</label>
      <input
        type="text"
        value={newLiftTitle}
        onChange={(e) => setNewLiftTitle(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        required
      />

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Update Title
      </button>
    </form>
  );
}

export default UpdateLiftForm;