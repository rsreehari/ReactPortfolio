import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiSmartphone, FiGlobe } from 'react-icons/fi';
import TextReveal from './TextReveal';
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
      description: "Currently building a cross-platform mobile application using React Native. This project showcases my journey in mobile development with modern UI components and smooth animations.",
      tech: ["React Native", "JavaScript", "Expo", "AsyncStorage"],
      icon: <FiSmartphone />,
      status: "In Progress",
      github: "#",
      demo: "#"
    },
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and Framer Motion. Features dark theme, smooth animations, and optimized performance inspired by React Bits design.",
      tech: ["React", "Framer Motion", "CSS3", "Responsive Design"],
      icon: <FiGlobe />,
      status: "Completed",
      github: "https://github.com/rsreehari",
      demo: "#"
    },
    {
      title: "Web Development Projects",
      description: "Collection of web development projects showcasing various technologies and problem-solving approaches. Includes interactive components and modern design patterns.",
      tech: ["HTML5", "CSS3", "JavaScript", "React", "Node.js"],
      icon: <FiCode />,
      status: "Ongoing",
      github: "https://github.com/rsreehari",
      demo: "#"
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
              <TextReveal>Featured Projects</TextReveal>
              <p className="section-subtitle">
                A showcase of my recent work and ongoing learning projects
              </p>
            </div>
          </ScrollReveal>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ScrollReveal key={index} direction="up" delay={0.4 + index * 0.2}>
                <InteractiveCard className="project-card glass-effect" intensity={0.15}>
                  <div className="project-header">
                    <div className="project-icon">
                      {project.icon}
                    </div>
                    <div className="project-status">
                      <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    <MagneticButton>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiGithub />
                        <span>Code</span>
                      </a>
                    </MagneticButton>
                    <MagneticButton>
                      <a
                        href={project.demo}
                        target="_blank"
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
