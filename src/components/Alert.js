import React, { Component } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";

export class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toast: null,
      category: "",
    };
  }

  componentDidMount() {
    this.setState({
      toast: new bootstrap.Toast(document.getElementById("toast")),
    });
  }

  checkBudget = (payload, category) => {
    let i = 0;
    let expended = payload[0]?.totalAmount ?? 0;

    axios.get("http://localhost:4000/category/get/jed").then((res) => {
      let data = res.data;
      let amount = 0;
      for (; i < data.length; i++) {
        if (data[i]._id === category) {
          amount = data[i].budget;
          break;
        }
      }

      if (amount !== -1 && amount < expended) {
        //alert(`Expenses for ${data[i]._id} has gone over the Monthly Budget`);
        this.setState({ category: category });
        console.log(this.state.toast);
        this.state.toast.show();
      }
    });
  };

  getMonthExpense = (payload) => {
    let date = new Date(payload.date);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    axios
      .get(
        `http://localhost:4000/expense/getMonthly/${payload.name}/${payload.category}/${month}/${year}`
      )
      .then((resMonth) => {
        this.checkBudget(resMonth.data, payload.category);
      });
  };

  render() {
    return (
      <div className="toast-container position-fixed  top-0 start-0 p-3">
        <div className="toast" role="alert" id="toast">
          <div className="toast-header">
            <strong className="me-auto">Alert</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            Expenses for {this.state.category} has gone over the Monthly Budget
          </div>
        </div>
      </div>
    );
  }
}
