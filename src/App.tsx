import { useEffect } from 'react';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Hero from './components/hero/Hero';
import CommandPalette from './components/layout/CommandPalette';
import Cursor from './components/layout/Cursor';
import Footer from './components/layout/Footer';
import Nav from './components/layout/Nav';
import ScrollProgress from './components/layout/ScrollProgress';
import Toast from './components/layout/Toast';
import Resume from './components/resume/Resume';
import Marquee from './components/ui/Marquee';
import Work from './components/work/Work';
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
      <a className="skip" href="#about">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Resume />
        <Contact />
      </main>
      <Footer />

      <CommandPalette />
      <Toast />
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </AppProvider>
  );
}
