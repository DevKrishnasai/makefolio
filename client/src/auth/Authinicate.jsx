import React, { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Registor";

const Authinicate = ({ user, setUser }) => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      {toggle ? (
        <Login
          setUser={setUser}
          setToggle={setToggle}
          toggle={toggle}
          user={user}
        />
      ) : (
        <Register setUser={setUser} setToggle={setToggle} toggle={toggle} />
      )}
    </>
  );
};

export default Authinicate;
