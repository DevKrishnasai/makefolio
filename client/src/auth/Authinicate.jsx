import React, { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Registor";
import Homepage from "../pages/Homepage";

const Authinicate = () => {
  const [toggle, setToggle] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    portfolioId: "",
  });
  return (
    <>
      {user["name"] === "" ? (
        toggle ? (
          <Login
            setUser={setUser}
            setToggle={setToggle}
            toggle={toggle}
            user={user}
          />
        ) : (
          <Register setUser={setUser} setToggle={setToggle} toggle={toggle} />
        )
      ) : (
        <Homepage setUser={setUser} user={user} />
      )}
    </>
  );
};

export default Authinicate;
