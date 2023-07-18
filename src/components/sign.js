import axios from "axios";
import { useState } from "react";
import React from "react";

export default function Sign(props) {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const [logged, setLogged] = useState(false);

  const handleClickSignUp = () => {
    console.log("up");
    setMessage("");
    axios
      .post("http://localhost:3001/api/auth/signup", {
        login: login,
        password: pass,
      })
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.msg);
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
          login: login,
          password: pass,
        },
        { withCredentials: "true", credentials: "include" }
      )
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.msg);
        props.userlogged(login);
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        setMessage(error.response.data.err);
      });
  };

  const handleChangeLogin = (e) => {
    console.log("login: ", e.target.value);
    setLogin(e.target.value);
  };

  const handleChangePass = (e) => {
    console.log("pass: ", e.target.value);
    setPass(e.target.value);
  };

  return (
    <>
      <label>Login</label>
      <input type="text" value={login} onChange={handleChangeLogin} />
      <label>password</label>
      <input type="text" value={pass} onChange={handleChangePass} />
      <button onClick={handleClickSignIn}>signin</button>
      <button onClick={handleClickSignUp}>signup</button>
      <div>{message}</div>
    </>
  );
}
