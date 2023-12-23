import React from "react";
import Hero from "../components/Hero/Hero";
import Projects from "../components/Projects/Projects";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/SocialIcon/ScrollToTop";
import { useParams } from "react-router-dom";
import "../index.css";

function Home() {
  const { id } = useParams();
  return (
    <>
      {console.log(id)}
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Home;
