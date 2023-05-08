import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// the form which will be used my sign in and sign up feature
export const Form = (props) => {
  useEffect(() => {
    document.getElementById("alert").style.display = "none";
    props.refs.name.current.focus();
  });

  const changeAlert = () => {
    document.getElementById("alert").style.display = "none";
  };

  return (
    <div>
      <h2 className="text-center">{props.text.heading}</h2>
      <form
        onSubmit={props.handleSubmit}
        className="text-start"
        onFocus={changeAlert}
      >
        <div className="mb-3">
          <label className="form-label ">Username</label>
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

        <button type="submit" className="btn btn-primary mb-2">
          Submit
        </button>
        <div className="alert alert-danger" role="alert" id="alert">
          {props.text.error}
        </div>
        <div className="account">
          <Link to={props.text.path}>{props.text.message}</Link>
        </div>
      </form>
    </div>
  );
};
