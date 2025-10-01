import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import '../styles/Contact.css';

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
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
        'YOUR_SERVICE_ID', // Reemplaza con tu Service ID
        'YOUR_TEMPLATE_ID', // Reemplaza con tu Template ID
        form.current,
        'YOUR_USER_ID' // Reemplaza con tu User ID (Public Key)
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
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Ubicación</h3>
                <p>Tu Ciudad, País</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>tuemail@ejemplo.com</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Teléfono</h3>
                <p>+123 456 7890</p>
              </div>
            </div>
            <div className="social-links">
              <a href="#" className="social-icon"><i className="fab fa-github"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="contact-form">
            <form ref={form} onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Tu Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="user_email"
                  placeholder="Tu Email"
                  value={formData.email}
                  onChange={handleChange}
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