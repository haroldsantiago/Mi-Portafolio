import React from 'react';
import '../styles/Footer.css';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Mi Portafolio. Todos los derechos reservados.</p>
          <div className="social-links">
            <a href="https://github.com/haroldsantiago" target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/harold-vergara-torres-639661321?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin /></a>
            <a href="https://x.com/Santitover?t=7db1_1TEue-oJCt62hxtIQ&s=09" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
            <a href="https://www.instagram.com/__haarold?igsh=MXZob2I1M2V2aWVoZw==" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;