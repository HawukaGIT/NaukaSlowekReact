import { useState, useEffect } from "react";
import Words from "./Words";
import List from "./list";
import axios from "axios";
import useInput from "../utils/useInput";

export default function Lists(props) {
  const [words, setWords] = useState([]);
  const [lists, setLists] = useState([]);
  const inputName = useInput("");
  const inputDescription = useInput("");
  const [showAddList, setShowAddList] = useState(false);

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
        console.log(res.data);
        setLists([...lists, res.data]);
        inputName.value = "";
        inputDescription.value = "";
      })
      .catch((err) => {
        // setHasError(true);
        console.log(err.response.data);
      });
    setShowAddList(false);
    inputName.reset();
    inputDescription.reset();
  };

  const handleDelete = (list) => {
    console.log("handledelete: ", list.name);
    let url = "http://localhost:3001/api/list/" + list._id;
    axios
      .delete(url, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        // setHasError(false);
        let newlists = [...lists];
        console.log(newlists);
        let index = lists.indexOf(list);
        console.log(index);
        newlists.splice(index, 1);
        console.log(newlists);
        setLists([...newlists]);
        console.log(`usunięto listę ${list.name}`);
      })
      .catch((err) => {
        // setHasError(true);
        console.log(err.response.data);
      });
  };

  let listsList =
    lists.length > 0
      ? lists.map((el) => {
          return <List key={el._id} list={el} delete={handleDelete} />;
        })
      : undefined;

  const handleClickButton = () => {
    setShowAddList(true);
  };

  const addlist = showAddList ? (
    <>
      <label>
        Nazwa:{" "}
        <input
          type="text"
          onChange={inputName.onChange}
          value={inputName.value}
        />
      </label>
      <label>
        Opis:{" "}
        <input
          type="text"
          onChange={inputDescription.onChange}
          value={inputDescription.value}
        />
      </label>
      <button onClick={handleAddList}>Dodaj listę</button>
    </>
  ) : (
    <button onClick={handleClickButton}>Dodaj listę</button>
  );

  return (
    <>
      <div>
        Twoje listy:
        {addlist}
        {listsList}
      </div>
      <Words user={props.user} words={words} list={activelist} />
    </>
  );
}
