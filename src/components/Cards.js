import React from "react";

// Contins the card display of expenses
export const Cards = (props) => {
  return (
    <div class="col ">
      <div className="card shadow mx-auto">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{props.category}</li>
          <li className="list-group-item">{props.date}</li>
          <li className="list-group-item">Expended: {props.expense}</li>
        </ul>
      </div>
    </div>
  );
};

/*
<div className="card shadow text-bg-light  mx-auto ">
        <div className="card-body">
          <div className="card-title ">{props.category}</div>
          <div className="card-text ">{props.date}</div>
          <div className="card-text ">Expended: {props.expense}</div>
        </div>
      </div>

*/
