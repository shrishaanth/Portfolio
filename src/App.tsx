import { useEffect } from 'react';
import CommandPalette from './components/layout/CommandPalette';
import Footer from './components/layout/Footer';
import Nav from './components/layout/Nav';
import Toast from './components/layout/Toast';
import About from './components/sections/About';
import Approach from './components/sections/Approach';
import Contact from './components/sections/Contact';
import Hero from './components/sections/Hero';
import Stack from './components/sections/Stack';
import Work from './components/sections/Work';
import { AppProvider } from './context/AppContext';

export default function App() {
  // the browser tries to jump to #hash before React has rendered the target —
  // redo it once the sections exist, so deep links like /#work land properly
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const el = id && document.getElementById(id);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
  }, []);

  return (
    <AppProvider>
      <a className="skip" href="#work">
        Skip to content
      </a>
      <Nav />

      <main>
        <Hero />
        <Work />
        <Approach />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />

      <CommandPalette />
      <Toast />
    </AppProvider>
  );
}
