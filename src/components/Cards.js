import React from "react";

// Contins the card display of expenses
export const Cards = (props) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{props.category}</li>
        <li className="list-group-item">{props.date}</li>
        <li className="list-group-item">Expended: {props.expense}</li>
      </ul>
    </div>
  );
};
