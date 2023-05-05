import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "../feature/userAuth/userAuthSlice";
import { resetCategory } from "../feature/category/categorySlice";

// contains the profile button or the sign in button on the right of navbar
// also has profile and signout option
export const ProfileButton = () => {
  const user = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  return (
    <div className="navbar-nav float-end" id="signin">
      {user ? (
        <Link
          className="nav-link"
          onClick={() => {
            dispatch(signOut());
            dispatch(resetCategory());
          }}
          to={"/"}
        >
          Sign out
        </Link>
      ) : (
        <NavLink className="nav-link" to="/signin">
          Sign In
        </NavLink>
      )}
    </div>
  );
};
