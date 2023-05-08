import axios from "axios";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

export const EditCategory = (props) => {
  const amount = useRef(-1);
  const name = useSelector((state) => state.user.name);

  const handleEdit = (e) => {
    e.preventDefault();

    const payload = {
      category: e.target.id,
      amount: Number(amount.current.value),
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
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>
    </div>
  );
};
