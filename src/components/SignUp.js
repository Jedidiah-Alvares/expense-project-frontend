import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../feature/userAuth/userAuthSlice";
import axios from "axios";
import { Form } from "./Form";

export const SignUp = () => {
  const name = useRef("");
  const password = useRef("");
  const text = {
    heading: "Sign Up",
    error: "",
    path: "/signin",
    message: "Already have an Account? Sign In",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById("main").classList.remove("text-center");
    name.current.focus();
    return () => {
      document.getElementById("main").classList.add("text-center");
    };
  }, []);

  const addData = () => {
    let payload = {
      name: name.current.value,
      password: password.current.value,
    };

    axios.post("http://localhost:4000/user", payload).then(() => {
      navigate("/");
    });

    dispatch(auth(payload.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:4000/user/${name.current.value}`)
      .then((res) => {
        console.log(!res.data);
        if (!res.data) {
          document.getElementById("changeName").innerHTML = "";
          addData();
        } else {
          document.getElementById("changeName").innerHTML =
            "*The Username already exist*";
        }
      });
  };

  return (
    <Form refs={{ name, password }} handleSubmit={handleSubmit} text={text} />
  );
};
