import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../feature/userAuth/userAuthSlice";
import axios from "axios";
import { Form } from "./Form";

// contains the signin feature
export const SignIn = () => {
  // name and password are refs to handle their respective input tag in the form
  const name = useRef("");
  const password = useRef("");

  // Since sign in and sign up use the same form, few payloads has to be sent to the form
  const text = {
    heading: "Sign In",
    error: "",
    path: "/signUp",
    message: "Do not have an Account? Sign up",
  };

  // This payload is the payload to be send to the server and the redux store
  let payload;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // To handle some classes in the form
  // may remove from js and handle it in css/bootstrap
  useEffect(() => {
    document.getElementById("main").classList.remove("text-center");
    document.getElementsByTagName("input")[1].removeAttribute("pattern");
    document.getElementsByTagName("input")[1].removeAttribute("title");
    name.current.focus();
    return () => {
      document.getElementById("main").classList.add("text-center");
    };
  }, []);

  // adds data to the rdeux store
  const addData = () => {
    dispatch(auth(payload.name));
  };

  // handle submit of the form
  const handleSubmit = (e) => {
    e.preventDefault();

    payload = {
      name: name.current.value,
      password: password.current.value,
    };

    // send data to the server
    axios.post("http://localhost:4000/user/verify", payload).then((res) => {
      if (res.data) {
        document.getElementById("changeName").innerHTML = "";
        addData();
        navigate("/expense");
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
