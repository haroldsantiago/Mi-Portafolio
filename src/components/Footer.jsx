import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Mi Portafolio. Todos los derechos reservados.</p>
          <div className="social-links">
            <a href="#" className="social-icon"><i className="fab fa-github"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;