import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <h1>¡Hola! Soy <span className="highlight">Harold Vergara</span></h1>
        <h2>Desarrollador de aplicaciones web</h2>
        <p>La clave es crear una solucion digital que satisfaga las necesidades de los usuarios y mejore la experiencia de uso.</p>
        <div className="hero-buttons">
          <a href="#proyectos" className="btn primary">Ver Proyectos</a>
          <a href="#contacto" className="btn secondary">Contáctame</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;