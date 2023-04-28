import React, { useEffect, useState } from "react";
import { Cards } from "./Cards";
import axios from "axios";
import { AddExpense } from "./AddExpense";

// Contains the expense feature
// Display the expenses by latest date
// Addition of expenses
// May change this component to a class component due to lifcycles
export const Expense = () => {
  // contains the data retrieved from the server
  const [data, appendData] = useState([]);

  // load handles the spinner
  const [load, changeload] = useState(true);

  // display 5 expenses in card format
  // so previous and next buttons have been added
  const [pageNo, changePage] = useState(0);

  // gets data after mounting
  useEffect(() => {
    getData();
  }, []);

  // changes the button visiblity of previous and next button
  const setButtonVisiblity = (prev, next) => {
    if (prev === 0) document.getElementById("prev").style.visibility = "hidden";
    else document.getElementById("prev").style.visibility = "visible";

    if (next <= 0) document.getElementById("next").style.visibility = "hidden";
    else document.getElementById("next").style.visibility = "visible";
  };

  // handles the retireval of data
  // also change load and pageNo
  const getData = (num = 0) => {
    changeload(true);
    changePage(num);
    appendData([]);

    let skip = num * 5; // 5 cards per page

    // retrives data from server
    // will change the hard coded user "jed" after finishing protected routes
    axios.get(`http://localhost:4000/expense/jed/${skip}`).then((res) => {
      setButtonVisiblity(num, res.data.length - 5);
      let data = res.data;
      for (let i = 0; i < Math.min(5, data.length); i++) {
        let dateString = data[i].date.slice(0, 10);
        let date = new Date(dateString);
        appendData((prevdata) => [
          ...prevdata,
          {
            id: data[i]._id,
            category: data[i].category,
            date: date.toDateString(),
            expense: data[i].expense,
          },
        ]);
      }
      changeload(false);
    });
  };

  // handles the change in page
  const handlePage = (e) => {
    switch (e.target.id) {
      case "prev":
        getData(pageNo - 1);
        break;
      case "next":
        getData(pageNo + 1);
        break;
      default:
        break;
    }
  };

  // Add expense button and the page buttons are displayed all the time
  // The data part is first replaced by a spinner and then the data is displayed if exist or "no result" meassage
  return (
    <>
      <div className="card-container ">
        <button
          className="btn btn-secondary mt-2"
          data-bs-toggle="modal"
          data-bs-target="#addexpense"
        >
          + Add Expense
        </button>
        {load ? (
          <div>
            <div class="spinner-border my-4" role="status" id="spinner"></div>
          </div>
        ) : data.length ? (
          <>
            {data.map((data) => (
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

        <div className="page">
          <button
            type="button"
            class="btn btn-dark"
            id="prev"
            onClick={handlePage}
          >
            Previous
          </button>
          <button
            type="button"
            class="btn btn-dark"
            id="next"
            onClick={handlePage}
          >
            Next
          </button>
        </div>

        <AddExpense getData={getData} />
      </div>
    </>
  );
};
