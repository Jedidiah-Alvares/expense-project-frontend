import React, { Component } from "react";
import withPageButton from "./withPageButton";
import axios from "axios";
import { Cards } from "./Cards";
import { AddExpense } from "./AddExpense";
import Loading from "./Loading";
import { compose } from "@reduxjs/toolkit";
import withLoading from "./withLoading";

class Expense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      load: true,
    };

    console.log(props);
  }
  // display 5 expenses in card format
  // so previous and next buttons have been added
  //onst [pageNo, changePage] = useState(0);

  // gets data after mounting

  componentDidMount() {
    console.log("componentDidMount");
    this.getData();
    //Dispatch(changeLoading());
  }

  // handles the retireval of data
  // also change load and pageNo

  getData = () => {
    let num = this.props.pageNo;
    this.props.changeLoading();
    console.log("Getting data");

    this.setState({
      load: true,
      data: [],
    });

    let skip = num * 5; // 5 cards per page

    // retrives data from server
    // will change the hard coded user "jed" after finishing protected routes
    axios.get(`http://localhost:4000/expense/jed/${skip}`).then((res) => {
      this.props.setButtonVisiblity(num, res.data.length - 5);
      let data = res.data;
      for (let i = 0; i < Math.min(5, data.length); i++) {
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

      this.setState({
        load: false,
      });

      this.props.changeLoading();
      console.log("Got Data");
    });
  };

  render() {
    console.log("Render");
    return (
      <div className="card-container ">
        <button
          className="btn btn-secondary mt-2"
          data-bs-toggle="modal"
          data-bs-target="#addexpense"
        >
          + Add Expense
        </button>
        {this.state.load ? (
          <div>
            <div class="spinner-border my-4" role="status" id="spinner"></div>
          </div>
        ) : this.state.data.length ? (
          <>
            {this.state.data.map((data) => (
              <Cards
                key={data.id}
                category={data.category}
                date={data.date}
                expense={data.expense}
              />
            ))}
          </>
        ) : (
          <div>No Expenses Found</div>
        )}
        {this.props.children}

        <AddExpense getData={this.getData} />
      </div>
    );
  }
}
console.log(withLoading);
export default withPageButton(withLoading(Expense));
