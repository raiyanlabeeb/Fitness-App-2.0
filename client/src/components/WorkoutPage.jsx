import React, { useState } from "react";
import WorkoutCalendar from "./WorkoutCalendar";
import LiftForm from "./LiftForm";
import UpdateLiftForm from "./UpdateLiftForm";
import DeleteLiftForm from "./DeleteLiftForm";

function WorkoutPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Workout Tracker</h1>

      {/* Calendar to select a date */}
      <WorkoutCalendar onDateChange={setSelectedDate} />

      <hr className="my-6" />

      {/* Forms use the selected date */}
      <LiftForm selectedDate={selectedDate} />
      {/* <UpdateLiftForm selectedDate={selectedDate} />
      <DeleteLiftForm selectedDate={selectedDate} /> */}
    </div>
  );
}

export default WorkoutPage;
