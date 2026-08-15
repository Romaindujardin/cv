import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ParticleCanvas from "./components/ParticleCanvas";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

const App: React.FC = () => {
  const [showWelcomeParticles, setShowWelcomeParticles] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeParticles(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app" id="top">
      <Navbar />
      <section className="particles-section">
        <ParticleCanvas mode={showWelcomeParticles ? "welcome" : "default"} />
      </section>
      <Hero />
      <Timeline />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
};

export default App;
