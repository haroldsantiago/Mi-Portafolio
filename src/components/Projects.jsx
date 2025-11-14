import React from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Proyecto SRP',
      description: 'Proyecto dedicado a la gestion de notas y gestion administrativa del colegio Rafael Pombo de Tulua, Valle del Cauca.',
      image: 'project1.jpg',
      tags: ['React', 'CSS', 'JavaScript', 'Django', 'Python', 'MySQL'],
      demoLink: '#',
      codeLink: '#'
    },
    {
      id: 2,
      title: 'RICA',
      description: 'Proyecto dedicado al control de acceso y regitro de usuarios de la Universidad del Valle sede Caicedonia y Nodo Sevilla',
      image: 'project2.jpg',
      tags: ['React', 'CSS', 'JavaScript', 'Django', 'Python', 'MySQL'],
      demoLink: '#',
      codeLink: '#'
    },
    {
      id: 3,
      title: 'Proyecto 3',
      description: 'Descripción breve del proyecto 3. Tecnologías utilizadas y resultados obtenidos.',
      image: 'project3.jpg',
      tags: ['React', 'Node.js', 'MongoDB'],
      demoLink: '#',
      codeLink: '#'
    }
  ];

  return (
    <section id="proyectos" className="projects">
      <div className="container">
        <h2 className="section-title">Mis Proyectos</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <div className="image-placeholder">
                  {/* Aquí irá la imagen del proyecto */}
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.demoLink} className="btn small">Demo</a>
                  <a href={project.codeLink} className="btn small secondary">Código</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;