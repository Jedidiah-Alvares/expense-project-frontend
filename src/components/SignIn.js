import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../feature/userAuth/userAuthSlice";
import axios from "axios";
import { Form } from "./Form";
import { addCategory } from "../feature/category/categorySlice";
import Loading, { changeLoadingDispatch } from "./Loading";

// contains the signin feature
const SignIn = ({ changeLoading }) => {
  // name and password are refs to handle their respective input tag in the form
  const name = useRef("");
  const password = useRef("");

  // Since sign in and sign up use the same form, few payloads has to be sent to the form
  const text = {
    heading: "Sign In",
    error: "The Username or Password is incorrect",
    path: "/signUp",
    message: "Do not have an Account? Sign up",
  };

  // This payload is the payload to be send to the server and the redux store
  let payload;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const redirectPath = location.state?.path ?? "/expense";

  // To handle some classes in the form
  // may remove from js and handle it in css/bootstrap
  useEffect(() => {
    document.getElementsByTagName("input")[1].removeAttribute("pattern");
    document.getElementsByTagName("input")[1].removeAttribute("title");
  }, []);

  // adds data to the rdeux store
  const addData = () => {
    dispatch(auth(payload.name));
    axios
      .get(`http://localhost:4000/category/getAll/${payload.name}`)
      .then((res) => {
        console.log(res.data);
        res.data[0].category.forEach((cat) => {
          dispatch(addCategory(cat));
        });
        changeLoading();
        navigate(redirectPath);
      });
  };

  // handle submit of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    changeLoading();
    payload = {
      name: name.current.value,
      password: password.current.value,
    };

    // send data to the server
    axios.post("http://localhost:4000/user/verify", payload).then((res) => {
      if (res.data) {
        addData();
      } else {
        document.getElementById("alert").style.display = "block";
      }
    });
  };

  return (
    <Loading>
      <Form refs={{ name, password }} handleSubmit={handleSubmit} text={text} />
    </Loading>
  );
};

export default changeLoadingDispatch(SignIn);
