import React, { useEffect, useRef, useState } from "react";
import { ExpenseForm } from "./ExpenseForm";
import { useSelector } from "react-redux";
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";

// contains the modal and form to add expense
export const AddExpense = (props) => {
  // category, date, amount are refs to handle their respective input tag in the form
  const category = useRef();
  const date = useRef();
  const amount = useRef();

  // gets name and categories from the store
  const name = useSelector((state) => state.user.name);
  const categories = useSelector((state) => state.category.categories);

  let toast;
  const toastCategory = useState("");

  useEffect(() => {
    initializeToast();
  });

  const initializeToast = () => {
    toast = new bootstrap.Toast(document.getElementById("toast"));
  };

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

      getMonthExpense(payload);
    });
  };

  const checkBudget = (payload, category) => {
    let i = 0;
    let expended = payload[0]?.totalAmount ?? 0;

    axios.get(`http://localhost:4000/category/get/${name}`).then((res) => {
      let data = res.data;
      let amount = 0;
      for (; i < data.length; i++) {
        if (data[i]._id === category) {
          amount = data[i].budget;
          break;
        }
      }

      if (amount !== -1 && amount < expended) {
        alert(`Expenses for ${data[i]._id} has gone over the Monthly Budget`);
        toast.show();
      }
    });
  };

  const getMonthExpense = (payload) => {
    let date = new Date(payload.date);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    axios
      .get(
        `http://localhost:4000/expense/getMonthly/${name}/${payload.category}/${month}/${year}`
      )
      .then((resMonth) => {
        checkBudget(resMonth.data, payload.category);
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
      <div class="toast" role="alert" id="toast">
        <div class="toast-header">
          <strong class="me-auto">Alert</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">
          Expenses for {} has gone over the Monthly Budget
        </div>
      </div>
    </div>
  );
};
