import React, { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import Projects from "../components/Projects/Projects";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/SocialIcon/ScrollToTop";
import { useParams } from "react-router-dom";
import "../index.css";
import NoPage from "./NoPage";
import All from "./All";

function Home() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BACKEND_URL}/portfolios/portfolio/${id}`
        );
        const data = await response.json();
        if (data["status"] === 200) {
          setUserData(data["user"]);
        } else {
          setUserData(null);
        }

        setLoading(false);
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    };
    getUserById();
    setLoading(true);
  }, [id]);
  const [loading, setLoading] = useState(false);

  if (id === "all") {
    return <All />;
  }

  return (
    <>
      {userData === null ? (
        <NoPage />
      ) : loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
          </div>
        </div>
      ) : (
        <>
          <Hero data={userData} />
          <About data={userData} />
          <Projects data={userData} />
          <Contact data={userData} />
          <Footer />
          <ScrollToTop />
        </>
      )}
    </>
  );
}

export default Home;
