import "./list.css";
import { useState } from "react";
export default function List(props) {
  const [buttonClass, setButtonClass] = useState("hidden");
  const handleDelete = () => {
    console.log("handledelete: ", props.list.name);
  };
  const handleEdit = () => {
    console.log("handleEdit: ", props.list.name);
  };

  const handleStartTest = () => {
    console.log("handlestarttest: ", props.list.name);
  };
  const buttons = (
    <div className={buttonClass}>
      <button className="starttest" onClick={handleStartTest}>
        start test
      </button>
      <button onClick={handleEdit}>edit list</button>
      <button onClick={handleDelete}>delete list</button>
    </div>
  );

  const handlerOnMouseEnter = () => {
    setButtonClass("");
  };

  const handlerOnMouseLeave = () => {
    setButtonClass("hidden");
  };

  return (
    <div
      className="list"
      onMouseEnter={handlerOnMouseEnter}
      onMouseLeave={handlerOnMouseLeave}
    >
      <div>{props.list.name}</div>
      <div>({props.list.description})</div>
      {buttons}
    </div>
  );
}
