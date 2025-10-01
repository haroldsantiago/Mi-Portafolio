import './App.css';
import './styles/index.css';

// Importando componentes con extensión .jsx
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import AboutMe from './components/AboutMe.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <AboutMe />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
