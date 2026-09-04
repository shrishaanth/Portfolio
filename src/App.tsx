import Background from './components/Background';
import Cursor from './components/Cursor';
import ClickRipple from './components/ClickRipple';
import GlobalEffects from './components/GlobalEffects';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { ResumeProvider } from './components/ResumeContext';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Resume from './components/sections/Resume';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <ResumeProvider>
      <GlobalEffects />
      <ClickRipple />
      <Background />
      <Cursor />

      <div className="page">
        <Nav />
        <main className="wrap">
          <About />
          <Projects />
          <Resume />
          <Contact />
          <Footer />
        </main>
      </div>
    </ResumeProvider>
  );
}
