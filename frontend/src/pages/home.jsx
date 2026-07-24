import Hero from "../components/Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Education from "./Education";
import Certificates from "./Certificates";
import Contact from "./Contact";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Certificates />
      <Contact />
    </>
  );
}

export default Home;