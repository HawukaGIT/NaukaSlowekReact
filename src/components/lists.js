import { useState, useEffect } from "react";
import Words from "./Words";
import List from "./list";
import useInput from "../utils/useInput";
import axios from "axios";

export default function Lists(props) {
  const [words, setWords] = useState([]);
  const [lists, setLists] = useState([]);
  const inputName = useInput("");
  const inputDescription = useInput("");
  const activelist = "bogdan list";

  const fetchLists = () => {
    axios
      .get("http://localhost:3001/api/list/", {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        // setHasError(false);
        setLists(res.data);
        console.log(`pobrano listy użytkownika ${props.user}`);
      })
      .then(fetchWords())
      .catch((err) => {
        // setHasError(true);
        setLists([]);
        setWords([]);
        console.log(err.response.data);
      });
  };
  const fetchWords = () => {
    axios
      .get("http://localhost:3001/api/word/", {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        // setHasError(false);
        setWords(res.data);
        console.log(`pobrano słówka użytkownika ${props.user}`);
      })
      .catch((err) => {
        // setHasError(true);
        setWords([]);
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    fetchLists();
  }, [props.user]);

  const handleAddList = (e) => {
    axios
      .post(
        "http://localhost:3001/api/list",
        {
          name: inputName.value,
          description: inputDescription.value,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((res) => {
        // setHasError(false);
        console.log(`dodano listę ${inputName.value}`);
        console.log(res);
        setLists([...lists, res.data]);
      })
      .catch((err) => {
        // setHasError(true);
        console.log(err.response.data);
      });
  };
  let listsList = lists.map((el) => {
    return <List key={el._id} list={el} />;
  });

  return (
    <>
      <div>Twoje listy:{listsList}</div>
      <label>
        Nazwa: <input type="text" {...inputName} />
      </label>
      <label>
        Opis: <input type="text" {...inputDescription} />
      </label>
      <button onClick={handleAddList}>Dodaj listę</button>
      <Words user={props.user} words={words} list={activelist} />
    </>
  );
}
