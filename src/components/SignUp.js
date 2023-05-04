import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form } from "./Form";

// contains the signup feature
export const SignUp = () => {
  // name and password are refs to handle their respective input tag in the form
  const name = useRef("");
  const password = useRef("");

  // Since sign in and sign up use the same form, few payloads has to be sent to the form
  const text = {
    heading: "Sign Up",
    error: "",
    path: "/signin",
    message: "Already have an Account? Sign In",
  };

  const navigate = useNavigate();

  // To handle some classes in the form
  // may remove from js and handle it in css/bootstrap
  useEffect(() => {
    document.getElementById("main").classList.remove("text-center");

    document.getElementById("alert").innerHTML = "The Username already exist";
    document.getElementById("alert").style.display = "none";

    name.current.focus();
    return () => {
      document.getElementById("main").classList.add("text-center");
    };
  }, []);

  // adds data to the rdeux store and also sends it to the server
  const addData = () => {
    let payload = {
      name: name.current.value,
      password: password.current.value,
    };

    axios.post("http://localhost:4000/user", payload).then(() => {
      let category = ["Food", "Fuel", "Rent"];
      let allCategory = [];

      for (let i = 0; i < 3; i++) {
        allCategory.push({
          name: category[i],
          budget: [],
        });
      }

      payload = {
        name: name.current.value,
        category: allCategory,
      };

      axios.post("http://localhost:4000/category/add", payload);

      navigate("/");
    });
  };

  // handle submit of the form
  const handleSubmit = (e) => {
    e.preventDefault();

    document.getElementById("alert").style.display = "none";

    // checks if the user already exists
    axios
      .get(`http://localhost:4000/user/${name.current.value}`)
      .then((res) => {
        console.log(!res.data);
        if (!res.data) {
          addData();
        } else {
          document.getElementById("alert").style.display = "block";
        }
      });
  };

  return (
    <Form refs={{ name, password }} handleSubmit={handleSubmit} text={text} />
  );
};
