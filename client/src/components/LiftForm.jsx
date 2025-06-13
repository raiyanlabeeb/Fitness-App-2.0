import { useState } from "react";

function LiftForm() {
  const [liftTitle, setLiftTitle] = useState("");
  const [liftDate, setLiftDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/lift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ liftTitle, liftDate }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create lift");
      }

      console.log("Lift created successfully:", data);
    } catch (error) {
      console.error("Error creating lift:", error.message, error.stack);
      return;
    }

    // TODO: send `newLift` to backend API
    // fetch("/api/lifts", { method: "POST", body: JSON.stringify(newLift), headers: { "Content-Type": "application/json" } })

    // Clear form
    setLiftTitle("");
    setLiftDate("");
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

      <div>
        <label className="block mb-1 font-medium">Lift Date</label>
        <input
          type="date"
          value={liftDate}
          onChange={(e) => setLiftDate(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
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
