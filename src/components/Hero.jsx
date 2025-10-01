import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <h1>¡Hola! Soy <span className="highlight">Tu Nombre</span></h1>
        <h2>Desarrollador Web & Diseñador</h2>
        <p>Creando soluciones digitales con pasión y creatividad</p>
        <div className="hero-buttons">
          <a href="#proyectos" className="btn primary">Ver Proyectos</a>
          <a href="#contacto" className="btn secondary">Contáctame</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;