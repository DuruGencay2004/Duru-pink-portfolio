import Nav from "./components/Nav";
import Hero from "./components/Hero";
import LilyDivider from "./components/LilyDivider";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { usePetalTrail } from "./hooks/usePetalTrail";
import { useScrollReveal } from "./hooks/useScrollReveal";

export default function App() {
  usePetalTrail();
  useScrollReveal();

  return (
    <>
      <Nav />
      <main className="pt-16">
        <Hero />
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
      <elevenlabs-convai agent-id="agent_7601kncsedaye66s90rwnc8g5f8v" />
    </>
  );
}
