import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Preloader from "./components/Preloader";
import CaseSavor from "./components/pages/CaseSavor";
import CaseLuxeStay from "./components/pages/CaseLuxeStay";
import CaseSplitX from "./components/pages/CaseSplitX";
import CaseWellness from "./components/pages/CaseWellness";
import CaseFakeNews from "./components/pages/CaseFakeNews";
import CaseZeroShield from "./components/pages/CaseZeroShield";
import CaseMediFlow from "./components/pages/CaseMediFlow";
import CaseDeskGuard from "./components/pages/CaseDeskGuard";
import CaseTeamForge from "./components/pages/CaseTeamForge";
import CaseGlowAI from "./components/pages/CaseGlowAI";

const Home = () => (
  <main>
    <Landing />
    <About />
    <Projects />
    <Skills />
    <Contact />
  </main>
);

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case/savor" element={<CaseSavor />} />
          <Route path="/case/luxestay" element={<CaseLuxeStay />} />
          <Route path="/case/splitx" element={<CaseSplitX />} />
          <Route path="/case/wellness" element={<CaseWellness />} />
          <Route path="/case/fakenews" element={<CaseFakeNews />} />
          <Route path="/case/zeroshield" element={<CaseZeroShield />} />
          <Route path="/case/mediflow" element={<CaseMediFlow />} />
          <Route path="/case/deskguard" element={<CaseDeskGuard />} />
          <Route path="/case/teamforge" element={<CaseTeamForge />} />
          <Route path="/case/glowai" element={<CaseGlowAI />} />
        </Routes>
      </div>

      <style>{`
        .site-body {
          opacity:1;
        }
        .site-body--visible {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default App;