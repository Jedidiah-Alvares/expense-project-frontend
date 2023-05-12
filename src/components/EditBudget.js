import axios from "axios";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

export const EditBudget = (props) => {
  // amount is a ref to its input tag
  const amount = useRef();
  const name = useSelector((state) => state.user.name);

  // handles the budget
  const handleEdit = (e) => {
    e.preventDefault();

    const budget = Number(amount.current.value);

    // set budget to -1 if the budget is not set
    const payload = {
      category: e.target.id,
      amount: budget ? budget : -1,
    };

    axios
      .put(`http://localhost:4000/category/edit/budget/${name}`, payload)
      .then(() => {
        props.getmonthdata();
      });
  };
  return (
    <div className="dropdown-menu">
      <form className="px-4 py-3" onSubmit={handleEdit} id={props.category}>
        <div className="mb-3">
          <label className="form-label">Edit {props.category} Budget</label>
          <input
            ref={amount}
            type="number"
            min={0}
            className="form-control"
            placeholder="Enter the Budget"
          />
        </div>
        <p className="text-info" style={{ fontSize: "75%" }}>
          Submit without any value to not set the Budget
        </p>

        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>
    </div>
  );
};
