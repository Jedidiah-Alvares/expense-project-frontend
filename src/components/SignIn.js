import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../feature/userAuth/userAuthSlice";
import axios from "axios";
import { Form } from "./Form";

export const SignIn = () => {
  const name = useRef("");
  const password = useRef("");
  const text = {
    heading: "Sign In",
    error: "",
    path: "/signUp",
    message: "Do not have an Account? Sign up",
  };
  let payload;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById("main").classList.remove("text-center");
    document.getElementsByTagName("input")[1].removeAttribute("pattern");
    document.getElementsByTagName("input")[1].removeAttribute("title");
    name.current.focus();
    return () => {
      document.getElementById("main").classList.add("text-center");
    };
  }, []);

  const addData = () => {
    dispatch(auth(payload.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    payload = {
      name: name.current.value,
      password: password.current.value,
    };

    axios.post("http://localhost:4000/user/verify", payload).then((res) => {
      if (res.data) {
        document.getElementById("changeName").innerHTML = "";
        addData();
      } else {
        document.getElementById("changeName").innerHTML =
          "*The Username or Password is incorrect*";
      }
    });
  };

  return (
    <Form refs={{ name, password }} handleSubmit={handleSubmit} text={text} />
  );
};
