import React, { useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// contains the modal and form to add categories
export const AddCategory = (props) => {
  // category, month, budget are refs to handle their respective input tag in the form
  const category = useRef();
  const budget = useRef();

  // gets name and categories from the store
  const name = useSelector((state) => state.user.name);
  const categories = useSelector((state) => state.category.categories);

  // handles the form
  const handleSubmit = (e) => {
    e.preventDefault();

    let cont = true;
    categories.every((cat) => {
      if (cat.toLowerCase() === category.current.value.toLowerCase()) {
        cont = false;
      }
      return cont;
    });

    if (cont) {
      let date = new Date();
      let payload = {
        name: category.current.value,
        budget: budget.current.disabled
          ? []
          : [
              {
                month: date.getMonth() + 1,
                year: date.getFullYear(),
                amount: Number(budget.current.value),
              },
            ],
      };

      // Sends the payload to the server
      // Retrieves the new expense in background by calling getData of Expense component

      axios
        .put(`http://localhost:4000/category/edit/${name}`, payload)
        .then(() => {
          props.getmonthdata();
        });
    }
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      budget.current.disabled = false;
      document
        .getElementById("budgetLabel")
        .classList.replace("text-secondary", "text-dark");
    } else {
      budget.current.disabled = true;
      document
        .getElementById("budgetLabel")
        .classList.replace("text-dark", "text-secondary");
    }
  };

  return (
    <div
      className="modal fade"
      id="addcategory"
      tabindex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Add Category</h1>
            <button
              id="closeModal"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              className="text-start mx-auto"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                  className="form-control"
                  id="catselected"
                  placeholder="Enter The Category Name"
                  ref={category}
                />
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="setBudget"
                  style={{ minWidth: "1em" }}
                  onChange={handleCheckbox}
                />
                <label className="form-check-label text-secondary">
                  Enter Budget for the Month
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label text-secondary" id="budgetLabel">
                  Budget
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="budgt"
                  placeholder="Enter the Budget"
                  ref={budget}
                  disabled
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
