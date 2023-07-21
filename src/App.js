import "./App.css";
import Lists from "./components/lists";
import Sign from "./components/sign";
import { useState } from "react";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(["user"]);
  const [user, setUser] = useState(cookies.user || "");
  
  // const [hasError, setHasError] = useState(false);


  let logged = !(user === "");
  const showLists = logged ? (
    <Lists user={user} />
  ) : (
    <span>zaloguj się aby móc dodawać słówka</span>
  );

  const onUserlogin = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      <Sign userlogged={onUserlogin} user={user} />
      {showLists}
    </div>
  );
}

export default App;
