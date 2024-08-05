import React, { useState, useEffect } from "react";
import Login from "../pages/Login";
import Register from "../pages/Registor";
import Homepage from "../pages/Homepage";

const Authenticate = () => {
  const [toggle, setToggle] = useState(true);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser
      ? JSON.parse(savedUser)
      : {
          name: "",
          email: "",
          portfolioId: "",
          password: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleSetUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <>
      {user.name === "" ? (
        toggle ? (
          <Login
            setUser={handleSetUser}
            setToggle={setToggle}
            toggle={toggle}
            user={user}
          />
        ) : (
          <Register
            setUser={handleSetUser}
            setToggle={setToggle}
            toggle={toggle}
          />
        )
      ) : (
        <Homepage setUser={handleSetUser} user={user} />
      )}
    </>
  );
};

export default Authenticate;
