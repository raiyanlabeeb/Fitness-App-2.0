import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LiftForm from "../components/LiftForm";
import UpdateLiftForm from "../components/UpdateLiftForm";
import LiftList from "../components/LiftList";
import DeleteLiftForm from "../components/DeleteLiftForm";
const MainPage = () => {
  const navigate = useNavigate();

  const user = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Welcome to the Main Page, {user.name}!
      </h1>
      <LiftForm/>
      <UpdateLiftForm/>
      <LiftList />
      <DeleteLiftForm />
      <br></br>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Logout

      </button>
    </div>
  );
};

export default MainPage;
