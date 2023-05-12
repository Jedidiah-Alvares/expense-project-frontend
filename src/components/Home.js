import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const name = useSelector((state) => state.user.name);
  return (
    <div>
      <h2>Welcome To Expense Manager</h2>
      <h3>
        {name ?? (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        )}
      </h3>
    </div>
  );
};
