import axios from "axios";
import React, { Component, createRef } from "react";
import withPageButton from "./withPageButton";
import { connect } from "react-redux";
import Loading, { changeLoadingDispatch } from "./Loading";

class ExpensesWeeklyMonthly extends Component {
  constructor(props) {
    super(props);

    this.months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    this.state = {
      data: [],
    };

    // categoryRef is ref for the category dropdown
    // filterRef is ref for the weekly/monthly dropdown
    this.categoryRef = createRef();
    this.filterRef = createRef();
  }

  componentDidMount() {
    this.getExpense();
  }

  // return date string for weekly or monthly
  setDate(data) {
    if (this.filterRef.current.value === "Weekly") {
      let dateString = data._id.weekStart.slice(0, 10);
      let dateStart = new Date(dateString);

      dateString = data.weekEnd.slice(0, 10);
      let dateEnd = new Date(dateString);

      return `${dateStart.toDateString()} - ${dateEnd.toDateString()}`;
    } else return `${this.months[data.month - 1]} ${data.year}`;
  }

  // gets the expense
  getExpense() {
    this.props.changeLoading(true);
    let num = this.props.pageNo;
    let skip = num * 10; // 10 records per page
    axios
      .get(
        `http://localhost:4000/expense/get${this.filterRef.current.value}/${this.props.name}/${this.categoryRef.current.value}/${skip}`
      )
      .then((res) => {
        this.setState({
          data: [],
        });
        let data = res.data;

        // sets the button visiblity of previous and next button
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

        this.props.changeLoading(false);
      });
  }

  // used by withPageButton to execute getData
  getData = () => this.getExpense();

  render() {
    return (
      <Loading>
        <div className="container my-5 w-100 mx-auto ">
          <div className="d-flex justify-content-evenly">
            <div>
              <span className="fs-5">Filter By: </span>
              <select
                className="form-select mb-3 w-auto d-inline"
                onChange={this.props.reset}
                ref={this.categoryRef}
                defaultValue={
                  this.categoryRef.current?.value ?? this.props.categories[0]
                }
              >
                {this.props.categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <span className="fs-5">Filter Expense: </span>
              <select
                className="form-select mb-3 w-auto d-inline"
                onChange={this.props.reset}
                ref={this.filterRef}
                defaultValue={this.filterRef.current?.value ?? "Weekly"}
              >
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>
          {this.state.data.length ? (
            <table className="table table-primary table-sm table-hover overflow-hidden rounded-3 shadow table-bordered ">
              <thead className="table-light">
                <tr>
                  <th scope="col">NO.</th>
                  <th scope="col">Dates</th>
                  <th scope="col">Expense</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {this.state.data.map((data) => (
                  <tr>
                    <th scope="row">{data.id + 1}</th>
                    <td>{data.date}</td>
                    <td>{data.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div class="alert alert-light mt-2 w-25 mx-auto" role="alert">
              No Expenses On{" "}
              {this.categoryRef.current?.value ?? this.props.categories[0]}
            </div>
          )}
          {this.props.children}
        </div>
      </Loading>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  categories: state.category.categories,
});

export default connect(mapStateToProps)(
  changeLoadingDispatch(withPageButton(ExpensesWeeklyMonthly))
);
