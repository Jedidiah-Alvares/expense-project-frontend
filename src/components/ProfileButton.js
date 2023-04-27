import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "../feature/userAuth/userAuthSlice";

export const ProfileButton = () => {
  const user = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  if (user) {
    return (
      <div className="navbar-nav float-end" id="signin">
        <Link
          className="nav-link"
          onClick={() => {
            dispatch(signOut());
          }}
          to={"/"}
        >
          Sign out
        </Link>
      </div>
    );
  } else {
    return (
      <div className="navbar-nav float-end" id="signin">
        <NavLink className="nav-link" to="/signin">
          Sign In
        </NavLink>
      </div>
    );
  }
};
