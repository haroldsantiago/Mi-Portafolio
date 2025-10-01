import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Mi Portafolio</h1>
        <nav>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#sobre-mi">Sobre Mí</a></li>
            <li><a href="#proyectos">Proyectos</a></li>
            <li><a href="#habilidades">Habilidades</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;