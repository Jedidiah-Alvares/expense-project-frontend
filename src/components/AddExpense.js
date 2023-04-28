import React, { useRef } from "react";
import { ExpenseForm } from "./ExpenseForm";
import { useSelector } from "react-redux";
import axios from "axios";

// contains the modal and form to add expense
export const AddExpense = (props) => {
  // category, date, amount are refs to handle their respective input tag in the form
  const category = useRef();
  const date = useRef();
  const amount = useRef();

  // gets name from the store to send it to the server
  const name = useSelector((state) => state.user.name);

  // handles the form
  const handleSubmit = (e) => {
    e.preventDefault();

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
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
