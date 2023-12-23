import React, { useState } from "react";
import Authinicate from "./auth/Authinicate";
import Homepage from "./pages/Homepage";

const App = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    portfolioId: "",
  });
  return (
    <>
      {user["name"] === "" ? (
        <Authinicate setUser={setUser} user={user} />
      ) : (
        <Homepage setUser={setUser} user={user} />
      )}
    </>
  );
};

export default App;
