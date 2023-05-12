import React, { Component } from "react";
import { NavLink, Outlet } from "react-router-dom";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";

class FilterExpenses extends Component {
  // sets the tab menu buttons after mounting
  componentDidMount() {
    const triggerTabList = document.querySelectorAll("#myTab a");

    triggerTabList.forEach((triggerEl) => {
      const tabTrigger = new bootstrap.Tab(triggerEl);

      triggerEl.addEventListener("click", () => {
        tabTrigger.show();
      });
    });
  }

  render() {
    return (
      <div className="container-fluid align-self-stretch">
        <div>
          <ul className="nav nav-tabs mt-4" id="myTab">
            <li className="nav-item">
              <NavLink
                className="nav-link border-light-subtle"
                to="weekly-monthly"
                id="default"
              >
                Weekly/Monthly
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                className="nav-link border-light-subtle"
                to="custom-filter"
              >
                Custom Filter
              </NavLink>
            </li>
          </ul>
        </div>
        <div
          style={{ height: "80%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <Outlet />
        </div>
      </div>
    );
  }
}

export default FilterExpenses;
