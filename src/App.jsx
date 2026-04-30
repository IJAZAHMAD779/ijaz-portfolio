import React from "react";
import Background from "./components/Background";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Chatbot from "./components/Chatbot";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App relative min-h-screen w-screen text-white antialiased selection:bg-violet-400/30 selection:text-white overflow-x-hidden dark">
      <Background />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Skills />
        <Chatbot />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
