import axios from "axios";
import { useState } from "react";
import React from "react";

export default function Sign(props) {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

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

  const handleClickLogOut = () => {
    console.log("logout");
  };

  const handleChangeLogin = (e) => {
    console.log("login: ", e.target.value);
    setLogin(e.target.value);
  };

  const handleChangePass = (e) => {
    console.log("pass: ", e.target.value);
    setPass(e.target.value);
  };

  const notLogged = (
    <div>
      <label>
        Login
        <input type="text" value={login} onChange={handleChangeLogin} />
      </label>
      <label>
        password
        <input type="text" value={pass} onChange={handleChangePass} />
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
