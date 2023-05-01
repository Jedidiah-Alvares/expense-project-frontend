import axios from "axios";
import React, { Component, createRef } from "react";
import withPageButton from "./withPageButton";

class ExpensesWeeklyMonthly extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.categoryRef = createRef();
    this.filterRef = createRef("Week");
  }

  componentDidMount() {
    this.getExpense();
  }

  setDate(data) {
    if (this.filterRef.current.value === "Weekly") {
      let dateString = data._id.weekStart.slice(0, 10);
      let dateStart = new Date(dateString);

      dateString = data.weekEnd.slice(0, 10);
      let dateEnd = new Date(dateString);

      return `${dateStart.toDateString()} - ${dateEnd.toDateString()}`;
    } else return `${data.month}/${data.year}`;
  }

  getExpense() {
    let num = this.props.pageNo;
    let skip = num * 10; // 10 records per page
    axios
      .get(
        `http://localhost:4000/expense/get${this.filterRef.current.value}/jed/${this.categoryRef.current.value}/${skip}`
      )
      .then((res) => {
        this.setState({
          data: [],
        });
        let data = res.data;
        this.props.setButtonVisiblity(num, data.length - 10);

        for (let i = 0; i < Math.min(10, data.length); i++) {
          let date = this.setDate(data[i]);

          this.setState((prevState) => ({
            data: [
              ...prevState.data,
              {
                id: skip + i,
                date: date,
                amount: data[i].totalAmount,
              },
            ],
          }));
        }
      });
  }

  getData = () => this.getExpense();

  render() {
    return (
      <div className="container my-5">
        <div className="d-flex justify-content-evenly">
          <div>
            <span className="text-body">Filter By: </span>
            <select
              class="form-select mb-3 w-auto d-inline"
              onChange={this.props.reset}
              ref={this.categoryRef}
            >
              <option selected>Food</option>
              <option>Fuel</option>
              <option>Rent</option>
              <option>Stuffs</option>
            </select>
          </div>
          <div>
            <span className="text-body">Filter Expense: </span>
            <select
              class="form-select mb-3 w-auto d-inline"
              onChange={this.props.reset}
              ref={this.filterRef}
            >
              <option selected>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
        <table class="table  bg-light">
          <thead>
            <tr>
              <th scope="col">NO.</th>
              <th scope="col">Dates</th>
              <th scope="col">Expense</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {this.state.data.map((data) => (
              <tr>
                <th scope="row">{data.id + 1}</th>
                <td>{data.date}</td>
                <td>{data.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.props.children}
      </div>
    );
  }
}

export default withPageButton(ExpensesWeeklyMonthly);
