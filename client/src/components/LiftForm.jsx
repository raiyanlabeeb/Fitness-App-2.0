import React, { useState } from "react";

function LiftForm({ selectedDate }) {
  const [liftTitle, setLiftTitle] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   try {
  //     const res = await fetch("http://localhost:5000/api/lift", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ liftTitle, selectedDate }),
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.error || "Failed to create lift");

  //     setLiftTitle("");
  //     window.location.reload();
  //   } catch (err) {
  //     console.error("Error:", err.message);
  //   }
  // };

    const handleSubmit = async () => {
    try {
      console.log("Adding lift:", liftTitle, "for date:", selectedDate);
      const res = await fetch("http://localhost:5000/api/lift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          liftTitle: liftTitle,
          liftDate: selectedDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add lift");

      setLift([...lift, data.lift]); // Append new lift
      console.log("Lift added:", data.lift);
    } catch (err) {
      console.error("Add failed:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <div>
        <label className="block mb-1 font-medium">Lift Title</label>
        <input
          type="text"
          value={liftTitle}
          onChange={(e) => setLiftTitle(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="e.g. Bench Press"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Lift
      </button>
    </form>
  );
}

export default LiftForm;
