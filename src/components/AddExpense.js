import React, { useRef } from "react";
import { ExpenseForm } from "./ExpenseForm";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "./Alert";

// contains the modal and form to add expense
export const AddExpense = (props) => {
  // category, date, amount are refs to handle their respective input tag in the form
  const form = useRef();
  const alerts = useRef();

  // gets name and categories from the store
  const name = useSelector((state) => state.user.name);
  const categories = useSelector((state) => state.category.categories);

  const checkCategory = (category) => {
    return categories.find((cat) => cat === category);
  };

  // handles the form
  const handleSubmit = (e) => {
    e.preventDefault();

    let payload = {
      name: name,
      category: form.current[0].value,
      date: form.current[1].value,
      expense: form.current[2].value,
    };

    // Sends the payload to the server
    // Retrieves the new expense in background by calling getData of Expense component
    if (checkCategory(payload.category)) {
      document.getElementById("success").style.display = "block";
      axios.post("http://localhost:4000/expense/add", payload).then(() => {
        props.getData();
        alerts.current.getMonthExpense(payload);
      });
    } else {
      document.getElementById("danger").style.display = "block";
    }
  };

  return (
    <div
      className="modal fade"
      id="addexpense"
      tabindex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Add Expense</h1>
            <button
              id="closeModal"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <ExpenseForm
              refs={form}
              categories={categories}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>

      <Alert ref={alerts} />
    </div>
  );
};
