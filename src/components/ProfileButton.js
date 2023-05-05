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

  if (user) {
    return (
      <div className="navbar-nav float-end">
        <div className="dropdown ">
          <div
            className="dropdown-toggle profile"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {user}
          </div>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item" type="button">
                Profile
              </button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" type="button">
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
              </button>
            </li>
          </ul>
        </div>
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
