import React, { Component } from "react";
import withPageButton from "./withPageButton";
import axios from "axios";
import { Cards } from "./Cards";
import { AddExpense } from "./AddExpense";
import { connect } from "react-redux";
import Loading, { changeLoadingDispatch } from "./Loading";

class Expense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  // gets data after mounting
  componentDidMount() {
    this.getData();
  }

  // handles the retireval of data
  // from addData specifies if the loading screen is required
  getData = (fromAddData = false) => {
    let num = this.props.pageNo;

    if (!fromAddData) this.props.changeLoading(true);

    this.setState({
      data: [],
    });

    let skip = num * 12; // 12 cards per page

    // retrives data from server
    axios
      .get(`http://localhost:4000/expense/${this.props.name}/${skip}`)
      .then((res) => {
        // sets button visiblity of the previous and next button
        this.props.setButtonVisiblity(num, res.data.length - 12);

        let data = res.data;
        for (let i = 0; i < Math.min(12, data.length); i++) {
          // remove the timestamp
          let dateString = data[i].date.slice(0, 10);

          let date = new Date(dateString);
          this.setState((prevState) => ({
            data: [
              ...prevState.data,
              {
                id: data[i]._id,
                category: data[i].category,
                date: date.toDateString(),
                expense: data[i].expense,
              },
            ],
          }));
        }
        if (!fromAddData) this.props.changeLoading(false);
      });
  };

  render() {
    return (
      <Loading>
        <div className="container mx-auto">
          <button
            className="btn btn-secondary mt-2"
            data-bs-toggle="modal"
            data-bs-target="#addexpense"
          >
            + Add Expense
          </button>
          {this.state.data.length ? (
            <div class="row row-cols-1 row-cols-md-3 g-4 m-2">
              {this.state.data.map((data) => (
                <Cards
                  key={data.id}
                  category={data.category}
                  date={data.date}
                  expense={data.expense}
                />
              ))}
            </div>
          ) : (
            <div class="alert alert-light mt-2" role="alert">
              No Expenses Found
            </div>
          )}
          {this.props.children}

          <AddExpense getData={this.getData} />
        </div>
      </Loading>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
});

export default connect(mapStateToProps)(
  changeLoadingDispatch(withPageButton(Expense))
);
