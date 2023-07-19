import "./App.css";
import Words from "./components/Words";
import Lists from "./components/lists";
import Sign from "./components/sign";
import { useState } from "react";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(["user"]);
  const [user, setUser] = useState(cookies.user || "");

  const onUserlogin = (user) => {
    setUser(user);
  };
 
   

  return (
    <div className="App">
      <Sign userlogged={onUserlogin} user={user}/>
      <h1>Witaj {user}</h1>
      <Lists user={user} />
      <Words user={user} />
    </div>
  );
}

export default App;
