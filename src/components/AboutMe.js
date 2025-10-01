import React from 'react';
import '../styles/AboutMe.css';

const AboutMe = () => {
  return (
    <section id="sobre-mi" className="about-me">
      <div className="container">
        <h2 className="section-title">Sobre Mí</h2>
        <div className="about-content">
          <div className="about-image">
            <div className="image-placeholder">
              {/* Aquí puedes colocar tu foto */}
            </div>
          </div>
          <div className="about-text">
            <p>¡Hola! Soy un desarrollador web apasionado por crear experiencias digitales atractivas y funcionales. Me especializo en desarrollo frontend con React y tengo experiencia en diseño UI/UX.</p>
            <p>Mi objetivo es combinar creatividad y tecnología para construir soluciones que no solo se vean bien, sino que también resuelvan problemas reales.</p>
            <div className="about-details">
              <div className="detail-item">
                <h4>Nombre:</h4>
                <p>Tu Nombre Completo</p>
              </div>
              <div className="detail-item">
                <h4>Email:</h4>
                <p>tuemail@ejemplo.com</p>
              </div>
              <div className="detail-item">
                <h4>Ubicación:</h4>
                <p>Tu Ciudad, País</p>
              </div>
              <div className="detail-item">
                <h4>Disponibilidad:</h4>
                <p>Disponible para proyectos</p>
              </div>
            </div>
            <a href="#contacto" className="btn primary">Contáctame</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;