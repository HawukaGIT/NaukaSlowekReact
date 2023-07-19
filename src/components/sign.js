import axios from "axios";
import { useState } from "react";
import React from "react";

export default function Sign(props) {
  const [inputValue, setInputValue] = useState({
    login: "",
    pass: "",
  });
  const [message, setMessage] = useState("");

  const handleClickSignUp = () => {
    console.log("up");
    setMessage("");
    axios
      .post("http://localhost:3001/api/auth/signup", {
        login: inputValue.login,
        password: inputValue.pass,
      })
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.msg);
        setInputValue({
          login: "",
          pass: "",
        });
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        setMessage(error.response.data.err);
      });
  };

  const handleClickSignIn = () => {
    console.log("in");
    setMessage("");
    axios
      .post(
        "http://localhost:3001/api/auth/signin",
        {
          login: inputValue.login,
          password: inputValue.pass,
        },
        { withCredentials: "true", credentials: "include" }
      )
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.msg);
        props.userlogged(inputValue.login);
        setInputValue({
          login: "",
          pass: "",
        });
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        setMessage(error.response.data.err);
      });
  };

  const handleClickLogOut = () => {
    axios
      .post(
        "http://localhost:3001/api/auth/logout",
        {},
        { withCredentials: "true", credentials: "include" }
      )
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.msg);
        props.userlogged("");
        console.log("logout");
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        setMessage(error.response.data.err);
      });
  };

  const handleChange = (e) => {
    console.log("target: ", e.target);
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
