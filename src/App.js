import "./App.css";
import Words from "./components/Words";
import Lists from "./components/lists";
import Sign from "./components/sign";
import { useState } from "react";

function App() {
  
  const [user, setUser] = useState("");

  const onUserlogin = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      <Sign userlogged={onUserlogin} />
      <h1>Witaj {user}</h1>
      <Lists user={user} />
      <Words user={user} />
    </div>
  );
}

export default App;
