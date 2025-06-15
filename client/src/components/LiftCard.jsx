import React from "react";

const LiftCard = ({ lift }) => {
  const dateObj = new Date(lift.lift_date);

  // Format as MM/DD/YY using UTC to avoid timezone shifts
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  const year = dateObj.getUTCFullYear().toString().slice(-2);

  const formattedDate = `${month}/${day}/${year}`;

  return (
    <div className="rounded-xl shadow-md p-4 border border-gray-200 bg-white mb-4">
      <h2 className="text-xl font-semibold">{lift.lift_title}</h2>
      <p className="text-gray-600">{formattedDate}</p>
    </div>
  );
};

export default LiftCard;
