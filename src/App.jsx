import { AppProvider } from "./context/AppContext.jsx";
import { TopBar } from "./components/TopBar.jsx";
import { Hero } from "./components/Hero.jsx";
import { Experience } from "./components/Experience.jsx";
import { Skills } from "./components/Skills.jsx";
import { Education } from "./components/Education.jsx";
import { Contact } from "./components/Contact.jsx";
import { Footer } from "./components/Footer.jsx";

export default function App() {
  return (
    <AppProvider>
      <TopBar />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </AppProvider>
  );
}
