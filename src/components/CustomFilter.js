import axios from "axios";
import React, { Component, createRef } from "react";
import PieChart from "./PieChart";
import { connect } from "react-redux";
import Loading, { changeLoadingDispatch } from "./Loading";

class CustomFilter extends Component {
  constructor(props) {
    super(props);

    // display and errorText is for the alert box
    this.state = {
      display: "none",
      expenses: [],
      categories: [],
      errorText: "",
    };

    this.fromDate = createRef();
    this.toDate = createRef();
  }

  // valiadates returns the max date that is allowed
  validateDate() {
    const dateToday = new Date();

    let day = dateToday.getDate();
    day = day < 10 ? "0" + day : day;
    let month = dateToday.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let year = dateToday.getFullYear();

    return `${year}-${month}-${day}`;
  }

  // sets the display and error message for the alert box
  errorVisiblity(isVisible, errorText = "") {
    if (isVisible) this.setState({ display: "block", errorText: errorText });
    else this.setState({ display: "none", errorText: "" });
  }

  // sets the state data
  changeData(expenses, categories) {
    this.setState({
      expenses: expenses,
      categories: categories,
    });
  }

  // handles the form submit
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.changeLoading(true);

    const fromDate = new Date(this.fromDate.current.value);
    const toDate = new Date(this.toDate.current.value);

    // valiadates the date if fromDate is lower than the toDate
    if (fromDate > toDate) {
      this.errorVisiblity(true, "From Date should be lower than To Date");
      this.changeData([], []);
      this.props.changeLoading(false);
    } else {
      this.errorVisiblity(false);
      this.getFilteredData(fromDate, toDate);
    }
  };

  // Gets the data from the server
  getFilteredData = (fromDate, toDate) => {
    const payload = {
      name: this.props.name,
      fromDate: fromDate,
      toDate: toDate,
    };

    axios
      .post(`http://localhost:4000/expense/customFilter`, payload)
      .then((res) => {
        const expenses = [];
        const categories = [];
        const data = res.data;

        if (data.length === 0) {
          this.errorVisiblity(true, "No Expenses Found");
        } else {
          data.forEach((data) => {
            categories.push(data._id.category);
            expenses.push(data.totalAmount);
          });
        }

        this.changeData(expenses, categories);

        this.props.changeLoading(false);
      });
  };

  render() {
    return (
      <Loading>
        <div className="mt-4">
          <form
            className="px-4 py-3 text-start row row-cols-lg-auto g-3 align-items-center"
            onSubmit={this.handleSubmit}
          >
            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">From</div>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Enter the Start Date"
                  ref={this.fromDate}
                  max={this.validateDate()}
                  defaultValue={this.fromDate.current?.value}
                  required
                />
              </div>
            </div>
            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">To</div>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Enter the End Date"
                  ref={this.toDate}
                  max={this.validateDate()}
                  defaultValue={this.toDate.current?.value}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </form>

          <div
            className="alert alert-info w-75 mx-auto"
            role="alert"
            id="error"
            style={{ display: this.state.display }}
          >
            {this.state.errorText}
          </div>
          <PieChart
            expenses={this.state.expenses}
            categories={this.state.categories}
          />
        </div>
      </Loading>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  categories: state.category.categories,
});

export default connect(mapStateToProps)(changeLoadingDispatch(CustomFilter));
