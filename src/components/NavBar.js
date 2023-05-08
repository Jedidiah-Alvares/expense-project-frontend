import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ProfileButton } from "./ProfileButton";
import { UserNav } from "./UserNav";

// contains the navigation bar
export const NavBar = () => {
  // used for reponsiveness to remove the float-end when the screen is made small
  // may remove from js and handle it in css/bootstrap
  useEffect(() => {
    let div = document.getElementById("signin");
    if (div.style.width <= 991) {
      div.classList.remove("float-end");
    }
  });
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ minHeight: "10vh" }}
      >
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav col-11">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
              <UserNav />
            </div>

            <ProfileButton />
          </div>
        </div>
      </nav>
    </>
  );
};
