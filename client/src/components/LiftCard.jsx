import React from "react";

const LiftCard = ({ lift }) => {
  const formattedDate = new Date(lift.lift_date).toLocaleDateString();

  return (
    <div className="rounded-xl shadow-md p-4 border border-gray-200 bg-white mb-4">
      <h2 className="text-xl font-semibold">{lift.lift_title}</h2>
      <p className="text-gray-600">{formattedDate}</p>
    </div>
  );
};

export default LiftCard;