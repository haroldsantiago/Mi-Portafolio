import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import '../styles/Contact.css';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Solución para problemas de entrada en dispositivos móviles en GitHub Pages
    setTimeout(() => {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Para usar EmailJS, necesitas:
    // 1. Crear una cuenta en https://www.emailjs.com/
    // 2. Configurar un servicio de email (Gmail, Outlook, etc.)
    // 3. Crear una plantilla de email
    // 4. Obtener tus IDs (serviceID, templateID, userID)
    
    try {
      const result = await emailjs.sendForm(
        'service_tzn84dd', // Tu Service ID
        'template_up0b04f', // Template ID correcto
        form.current,
        'FEE9LvNVWkA8VTfYE' // Tu User ID (Public Key)
      );
      
      if (result.text === 'OK') {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="contact">
      <div className="container">
        <h2 className="section-title">Contáctame</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <FaMapMarkerAlt />
              <div>
                <h3>Ubicación</h3>
                <p>Caicedonia, Colombia</p>
              </div>
            </div>
            <div className="info-item">
              <FaEnvelope />
              <div>
                <h3>Email</h3>
                <p>santitover1@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <FaPhone />
              <div>
                <h3>Teléfono</h3>
                <p>+57 3043515689</p>
              </div>
            </div>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
            </div>
          </div>
          <div className="contact-form">
            <form ref={form} onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Tu Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={(e) => e.target.setAttribute('autocomplete', 'off')}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Tu Email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={(e) => e.target.setAttribute('autocomplete', 'off')}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Asunto"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tu Mensaje"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
              {status === 'success' && <p className="success-message">¡Mensaje enviado con éxito!</p>}
              {status === 'error' && <p className="error-message">Error al enviar el mensaje. Inténtalo de nuevo.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;