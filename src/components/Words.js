import React, { useEffect, useState } from "react";
import axios from "axios";
import Word from "./Word";

function Words(props) {
  const [words, setWords] = useState([]);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/word/", {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        console.log(res.data);
        setWords(res.data);
        console.log(`pobrano dane użytkownika ${props.user}`);
      })
      .catch((err) => {
        setHasError(true);
        setWords(err.response.data.msg);
        console.log(err);
      });
  }, [props.user]); //pusty parametr umożliwia jednorazowe odpalenie efectu tylko podczas renderowania
  const wordsList = hasError ? <div>{words}</div> : words.map((el) => <Word key={el._id} word={el} />) ;

  return <div>{wordsList}</div>;
}

export default Words;
