import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Expense Manager</h2>
      <button className="btn btn-primary" onClick={() => navigate("/signup")}>
        Sign Up
      </button>
    </div>
  );
};
