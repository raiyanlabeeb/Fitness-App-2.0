import { useState } from "react";

const UpdateLiftForm = () => {
  const [liftDate, setLiftDate] = useState("");
  const [newLiftTitle, setNewLiftTitle] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/lift", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          liftDate,
          newLiftTitle,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      // alert("Lift updated!");
    } catch (err) {
      console.error(err);
      // alert("Error: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Update Lift Title</h2>

      <label className="block mb-1 text-sm">Lift Date</label>
      <input
        type="date"
        value={liftDate}
        onChange={(e) => setLiftDate(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        required
      />

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
};

export default UpdateLiftForm;
