import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import LilyDivider from "./components/LilyDivider";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { usePetalTrail } from "./hooks/usePetalTrail";
import { useScrollReveal } from "./hooks/useScrollReveal";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMounted, setChatMounted] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = !entry.isIntersecting;
        setShowChat(visible);
        if (visible) setChatMounted(true); // mount immediately on show
      },
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [loaded]);
  usePetalTrail();
  useScrollReveal();

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <Nav />
        <main className="pt-16">
          <Hero show={loaded} />
          <LilyDivider variant="a" />
          <About />
          <LilyDivider variant="b" />
          <Projects />
          <LilyDivider variant="a" />
          <Experience />
          <LilyDivider variant="b" />
          <Contact />
        </main>
        <Footer />
        {chatMounted && (
          <elevenlabs-convai
            agent-id="agent_7601kncsedaye66s90rwnc8g5f8v"
            style={
              {
                opacity: showChat ? 1 : 0,
                transform: showChat ? "translateY(0px)" : "translateY(20px)",
                transition: "opacity 0.45s ease, transform 0.45s ease",
              } as React.CSSProperties
            }
            onTransitionEnd={() => {
              if (!showChat) setChatMounted(false);
            }}
          />
        )}
      </div>
    </>
  );
}
