import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

//  additional navigation bar links that is visble after signing in
export const UserNav = () => {
  const user = useSelector((state) => state.user.name);

  return (
    user && (
      <NavLink className="nav-link" to="/expense">
        Expense
      </NavLink>
    )
  );
};
