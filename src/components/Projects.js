import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiSmartphone, FiGlobe } from 'react-icons/fi';
import TextReveal from './TextReveal';
import TextScramble from './TextScramble';
import ScrollReveal from './ScrollReveal';
import InteractiveCard from './InteractiveCard';
import MagneticButton from './MagneticButton';
import './Projects.css';

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const projects = [
    {
      title: "React Native Learning App",
      description: "A comprehensive cross-platform mobile application built with React Native and Expo. Features include user authentication, data persistence with AsyncStorage, smooth navigation, and responsive UI components. Implements modern mobile development patterns and best practices.",
      tech: ["React Native", "Expo", "JavaScript", "AsyncStorage", "React Navigation", "Styled Components"],
      icon: <FiSmartphone />,
      status: "In Progress",
      github: "https://github.com/rsreehari",
      demo: "#",
      features: ["Cross-platform compatibility", "Offline data storage", "Smooth animations", "Modern UI/UX"]
    },
    {
      title: "Interactive Portfolio Website",
      description: "A modern, fully responsive portfolio website showcasing advanced React concepts and smooth animations. Built with performance optimization in mind, featuring lazy loading, custom hooks, and interactive elements powered by Framer Motion.",
      tech: ["React.js", "Framer Motion", "CSS3", "JavaScript", "Responsive Design", "Performance Optimization"],
      icon: <FiGlobe />,
      status: "Completed",
      github: "https://github.com/rsreehari/Portfolio2",
      demo: window.location.origin,
      features: ["Dark theme design", "Smooth scroll animations", "Interactive components", "Mobile-first approach"]
    },
    {
      title: "Full-Stack Web Applications",
      description: "Collection of full-stack web applications demonstrating proficiency in both frontend and backend development. Includes RESTful API integration, database management, and modern authentication systems.",
      tech: ["React.js", "Node.js", "Express.js", "MySQL", "Firebase", "RESTful APIs"],
      icon: <FiCode />,
      status: "Ongoing",
      github: "https://github.com/rsreehari",
      demo: "#",
      features: ["Database integration", "User authentication", "API development", "Responsive design"]
    }
  ];

  return (
    <section className="projects" id="projects">
      <div className="container">
        <motion.div
          className="projects-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ScrollReveal direction="up" delay={0.2}>
            <div className="projects-header">
              <TextReveal><TextScramble>Featured Projects</TextScramble></TextReveal>
              <p className="section-subtitle">
                A showcase of my recent work and ongoing learning projects
              </p>
            </div>
          </ScrollReveal>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ScrollReveal key={index} direction="up" delay={0.4 + index * 0.1}>
                <InteractiveCard
                  className="project-card glass-effect"
                  enableEffects={false}
                  tabIndex={0}
                  role="article"
                  aria-label={`${project.title} project card`}
                >
                  <div className="project-header">
                    <div className="project-icon">{project.icon}</div>
                    <div className="project-status">
                      <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  {project.features && (
                    <div className="project-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <MagneticButton>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        <FiGithub />
                        <span>Code</span>
                      </a>
                    </MagneticButton>
                    <MagneticButton>
                      <a 
                        href={project.demo} 
                        target={project.demo === window.location.origin ? "_self" : "_blank"} 
                        rel="noopener noreferrer" 
                        className="project-link"
                      >
                        <FiExternalLink />
                        <span>Demo</span>
                      </a>
                    </MagneticButton>
                  </div>
                </InteractiveCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={1.0}>
            <div className="more-projects">
              <p>More projects coming soon as I continue my learning journey!</p>
              <MagneticButton>
                <a
                  href="https://github.com/rsreehari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary"
                >
                  View All on GitHub
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
