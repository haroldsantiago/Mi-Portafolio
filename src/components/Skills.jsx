import React from 'react';
import '../styles/Skills.css';

const Skills = () => {
  const skills = [
    { name: 'HTML', level: 60 },
    { name: 'CSS', level: 60 },
    { name: 'JavaScript', level: 60 },
    { name: 'React', level: 75 },
    { name: 'Node.js', level: 70 },
    { name: 'UI/UX Design', level: 65 },
    { name: 'Django', level: 70 },
    { name: 'Python', level: 80 },
    { name: 'MySQL', level: 90 }
  ];

  return (
    <section id="habilidades" className="skills">
      <div className="container">
        <h2 className="section-title">Mis Habilidades</h2>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <div className="skill-item" key={index}>
              <div className="skill-info">
                <h3>{skill.name}</h3>
                <p>{skill.level}%</p>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;