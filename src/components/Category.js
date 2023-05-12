import React, { Component } from "react";
import { AddCategory } from "./AddCategory";
import axios from "axios";
import { EditBudget } from "./EditBudget";
import { connect } from "react-redux";
import Loading, { changeLoadingDispatch } from "./Loading";

export class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      expenseTotal: 0,
      budgetTotal: 0,
    };
  }

  componentDidMount() {
    this.getMonthlyBudget();
  }

  // Get the monthly budget
  // addOrEdit will tell if we need the loading screen
  getMonthlyBudget = (addOrEdit = false) => {
    if (!addOrEdit) this.props.changeLoading(true);
    axios
      .get(
        `http://localhost:4000/category/getcategorybudget/${this.props.name}`
      )
      .then((res) => {
        this.setState(
          {
            data: res.data,
          },
          () => this.getMonthExpense(addOrEdit)
        );
      });
  };

  // get the month expense
  getMonthExpense = (addOrEdit) => {
    const todayDate = new Date();
    const month = todayDate.getMonth() + 1;
    const year = todayDate.getFullYear();

    axios
      .get(
        `http://localhost:4000/expense/getMonthExpense/${this.props.name}/${month}/${year}`
      )
      .then((res) => {
        this.addExpenseToBudgetData(addOrEdit, res.data);
      });
  };

  // combine the expense and budget data
  addExpenseToBudgetData(addOrEdit, allExpenses) {
    const combinedData = [];
    let expenseTotal = 0;
    let budgetTotal = 0;

    this.state.data.forEach((budgetData) => {
      // get the same category
      const expenseData = allExpenses.find(
        (data) => data._id.category === budgetData._id
      );

      // set expense and budget data to be viewed
      const expense = expenseData?.totalAmount ?? "-";
      const budget = budgetData.budget >= 0 ? budgetData.budget : "-";

      // setting the row background color
      let bgColor = "";
      if (budget === "-") {
        bgColor = "table-primary";
      } else if (expense === "-" || expense <= budget) {
        bgColor = "table-success";
      } else bgColor = "table-danger";

      // adding the category
      combinedData.push({
        category: budgetData._id,
        expense: expense,
        budget: budget,
        rowColor: bgColor,
      });

      // computing the Total
      expenseTotal += isNaN(expense) ? 0 : expense;
      budgetTotal += isNaN(budget) ? 0 : budget;
    });

    this.setState(
      {
        data: combinedData,
        expenseTotal: expenseTotal,
        budgetTotal: budgetTotal,
      },
      () => {
        if (!addOrEdit) this.props.changeLoading(false);
      }
    );
  }

  render() {
    return (
      <Loading>
        <div className="container my-5">
          <button
            className="btn btn-secondary my-2 text-center"
            data-bs-toggle="modal"
            data-bs-target="#addcategory"
          >
            + Add Category
          </button>
          <table className="table w-100 table-secondary table-hover  shadow">
            <thead className="table-light">
              <tr>
                <th scope="col">NO.</th>
                <th scope="col">Category</th>
                <th scope="col">Expense</th>
                <th scope="col">Budget</th>
                <th scope="col" style={{ width: "10%" }}></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {this.state.data.map((data, i) => (
                <tr id={data.category} className={data.rowColor}>
                  <th scope="row">{i + 1}</th>
                  <td>{data.category}</td>
                  <td>{data.expense}</td>
                  <td className="d-flexs">{data.budget}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn text-dark"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-auto-close="outside"
                      >
                        &#128393;
                      </button>
                      <EditBudget
                        getmonthdata={this.getMonthlyBudget}
                        category={data.category}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td>Total</td>
                <td>{this.state.expenseTotal}</td>
                <td>{this.state.budgetTotal}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <AddCategory getmonthdata={this.getMonthlyBudget} />
        </div>
      </Loading>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
});

export default connect(mapStateToProps)(changeLoadingDispatch(Category));
