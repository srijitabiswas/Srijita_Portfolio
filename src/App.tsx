import { useEffect, useState } from "react";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Preloader from "./components/Preloader";

const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Cursor />
      <Preloader done={ready} />
      <div className={`site-body ${ready ? "site-body--visible" : ""}`}>
        <Navbar />
        <main>
          <Landing />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>

      <style>{`
        .site-body {
          opacity: 0;
          transition: opacity 0.6s ease 0.2s;
        }
        .site-body--visible {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default App;