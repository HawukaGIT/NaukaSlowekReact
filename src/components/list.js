import "./list.css";
import { useState } from "react";

export default function List(props) {
  const [buttonClass, setButtonClass] = useState("hidden");
  const [listClass, setListClass] = useState("list");

  const handleEdit = () => {
    console.log("handleEdit: ", props.list.name);
  };
  const handleDelete = () => {
    props.delete(props.list);
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

  const handleOnMouseEnter = () => {
    setButtonClass("");
    setListClass("mouseover");
  };

  const handleOnMouseLeave = () => {
    setButtonClass("hidden");
    setListClass("list");
  };

  const random = Math.random() * 360;
  const background = `hsl(${random},80%,70%`;
  const color = `hsl(${random},40%,30%`;
  const description = props.list.description
    ? `(${props.list.description})`
    : undefined;

  return (
    <div
      className={listClass}
      style={{ backgroundColor: background, color: color, borderColor: color }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div>{props.list.name}</div>
      <div>{description}</div>
      {buttons}
    </div>
  );
}
