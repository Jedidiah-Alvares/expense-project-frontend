import React from "react";
import { Link } from "react-router-dom";

// the form which will be used my sign in and sign up feature
export const Form = (props) => {
  return (
    <div>
      <h2 className="text-center">{props.text.heading}</h2>
      <form onSubmit={props.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your Username"
            aria-describedby="emailHelp"
            ref={props.refs.name}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            placeholder="Enter your Password"
            ref={props.refs.password}
            required
          />
        </div>

        <div className=" py-2">
          <span
            id="changeName"
            className="text-danger"
            style={{ fontWeight: "bold" }}
          >
            {props.text.error}
          </span>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <div className="account">
          <Link to={props.text.path}>{props.text.message}</Link>
        </div>
      </form>
    </div>
  );
};
