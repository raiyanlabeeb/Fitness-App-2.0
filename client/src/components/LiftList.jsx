import React from "react";
import LiftCard from "./LiftCard";
import { useState } from "react";
import { useEffect } from "react";
import { fetchLifts } from "../services/lifts";
const LiftList = ( {lifts}) => {
  // useEffect(() => {
  //   fetchLifts()
  //     .then((data) => {
  //       setLifts(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching lifts:", error.message);
  //     });
  // }, []);

  return (
    <div className="space-y-4">
      {lifts.map((lift, index) => (
        <LiftCard key={index} lift={lift} />
      ))}
    </div>
  );
};

export default LiftList;
