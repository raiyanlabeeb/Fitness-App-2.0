import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import React, { useState, useEffect } from "react";
import { fetchLiftByDate } from "../services/lifts";
import LiftList from "./LiftList";

// 🔁 Utility to format date as MM-DD-YYYY
function formatDateToMMDDYYYY(dateObj) {
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const yyyy = dateObj.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}

function WorkoutCalendar({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [lift, setLift] = useState([]);
  const [liftTitle, setLiftTitle] = useState("");

  // // Fetch lift when date changes
  // useEffect(() => {
  //   fetchLiftByDate(formattedDate)
  //     .then((data) => setLift(data))
  //     .catch((error) => console.error("Error fetching lifts:", error.message));
  // }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", formatDateToMMDDYYYY(date));
    onDateChange(date);
  };

  const handleAddLift = async () => {
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

      alert("Lift added!");
      setLift([...lift, data.lift]); // Append new lift
    } catch (err) {
      alert("Add failed: " + err.message);
    }
  };

  // ✅ Update Lift
  const handleUpdateLift = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/liftupdate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          newLiftTitle: liftTitle,
          liftDate: formattedDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update lift");

      alert("Lift updated!");
      setLift([data.lift]); // Replace with updated lift
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  // ✅ Delete Lift
  const handleDeleteLift = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/liftdelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          liftDate: formattedDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete lift");

      alert("Lift deleted!");
      setLift([]); // Clear lift
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      {/* <LiftList lifts={lift} /> */}
    </div>
  );
}

export default WorkoutCalendar;
