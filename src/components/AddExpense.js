import React, { useRef } from "react";
import { ExpenseForm } from "./ExpenseForm";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "./Alert";

// contains the modal and form to add expense
export const AddExpense = (props) => {
  // category, date, amount are refs to handle their respective input tag in the form
  const category = useRef();
  const date = useRef();
  const amount = useRef();
  const alerts = useRef();

  // gets name and categories from the store
  const name = useSelector((state) => state.user.name);
  const categories = useSelector((state) => state.category.categories);

  // handles the form
  const handleSubmit = (e) => {
    e.preventDefault();

    document.getElementById("alert").style.display = "block";

    let payload = {
      name: name,
      category: category.current.value,
      date: date.current.value,
      expense: amount.current.value,
    };

    // Sends the payload to the server
    // Retrieves the new expense in background by calling getData of Expense component
    axios.post("http://localhost:4000/expense/add", payload).then(() => {
      props.getData();
      console.log(alerts);
      alerts.current.getMonthExpense(payload);
    });
  };

  return (
    <div class="modal fade" id="addexpense" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Add Expense</h1>
            <button
              id="closeModal"
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <ExpenseForm
              refs={{ category, date, amount }}
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
