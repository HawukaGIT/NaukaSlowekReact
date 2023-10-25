import axios from "axios";
import { useState } from "react";
import React from "react";
import API_URL from "../config";

export default function Sign(props) {
  const [inputValue, setInputValue] = useState({
    login: "",
    pass: "",
  });
  const [message, setMessage] = useState("");

  const clearForm = () => {
    setInputValue({
      login: "",
      pass: "",
    });
  };

  const handleClickSignUp = () => {
    setMessage("");
    axios
      .post(API_URL + "auth/signup", {
        login: inputValue.login,
        password: inputValue.pass,
      })
      .then((response) => {
        setMessage(response.data.msg);
        clearForm();
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        setMessage(error.response.data.err);
      });
  };

  const handleClickSignIn = () => {
    setMessage("");
    axios
      .post(
        API_URL + "auth/signin",
        {
          login: inputValue.login,
          password: inputValue.pass,
        },
        { withCredentials: "true", credentials: "include" } 
      )
      .then((response) => {
        setMessage(response.data.msg);
        props.userlogged(inputValue.login);
        clearForm();
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        setMessage(error.response.data.err);
      });
  };

  const handleClickLogOut = () => {
    axios
      .post(
        API_URL + "auth/logout",
        {},
        { withCredentials: "true", credentials: "include" }
      )
      .then((response) => {
        setMessage(response.data.msg);
        props.userlogged("");
        console.log("logout");
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        setMessage(error.response.data.err);
        props.userlogged("");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const notLogged = (
    <div>
      <label>
        Login
        <input
          type="text"
          name="login"
          value={inputValue.login}
          onChange={handleChange}
        />
      </label>
      <label>
        password
        <input
          type="password"
          name="pass"
          value={inputValue.pass}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleClickSignIn}>signin</button>
      <button onClick={handleClickSignUp}>signup</button>
    </div>
  );

  const logged = (
    <div>
      <button onClick={handleClickLogOut}>logout</button>
      <h1>Witaj {props.user}</h1>
    </div>
  );

  const userForm = props.user ? <>{logged}</> : <>{notLogged}</>;

  return (
    <>
      {userForm}
      <div>{message}</div>
    </>
  );
}
