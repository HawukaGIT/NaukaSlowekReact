import { useState } from "react";
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const reset = () => {
    setValue("");
    console.log("reset");
  };
  return {
    value,
    onChange: handleChange,
    reset,
  };
};

export default useInput;
