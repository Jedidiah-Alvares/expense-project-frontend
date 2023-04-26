import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  useEffect(() => {
    let div = document.getElementById("signin");
    if (div.style.width <= 991) {
      div.classList.remove("float-end");
    }
  });
  return (
    <>
      <nav
        class="navbar navbar-expand-lg bg-body-tertiary"
        style={{ minHeight: "10vh" }}
      >
        <div class="container">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav col-11">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </div>
            <div className="navbar-nav float-end" id="signin">
              <NavLink className="nav-link" to="/signin">
                Sign In
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
