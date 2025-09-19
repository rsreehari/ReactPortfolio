import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCode, 
  FiDatabase, 
  FiGitBranch, 
  FiSmartphone,
  FiGlobe,
  FiTool
} from 'react-icons/fi';
import TextReveal from './TextReveal';
import TextScramble from './TextScramble';
import ScrollReveal from './ScrollReveal';
import InteractiveCard from './InteractiveCard';
import './Skills.css';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const skillCategories = [
    {
      icon: <FiCode />,
      title: "Programming Languages",
      skills: ["JavaScript", "Python", "Java", "C++", "HTML/CSS"]
    },
    {
      icon: <FiGlobe />,
      title: "Web Development",
      skills: ["React", "Node.js", "Express", "REST APIs", "Responsive Design"]
    },
    {
      icon: <FiSmartphone />,
      title: "Mobile Development",
      skills: ["React Native", "Mobile UI/UX", "Cross-platform Development"]
    },
    {
      icon: <FiDatabase />,
      title: "Database & Backend",
      skills: ["MongoDB", "MySQL", "Firebase", "API Development"]
    },
    {
      icon: <FiGitBranch />,
      title: "Version Control",
      skills: ["Git", "GitHub", "Collaborative Development", "Code Review"]
    },
    {
      icon: <FiTool />,
      title: "Tools & Technologies",
      skills: ["VS Code", "Postman", "Chrome DevTools", "NPM/Yarn"]
    }
  ];

  const currentlyLearning = [
    "React Native Advanced Concepts",
    "State Management (Redux)",
    "TypeScript",
    "GraphQL",
    "Docker & DevOps"
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <motion.div
          className="skills-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ScrollReveal direction="up" delay={0.2}>
            <div className="skills-header">
              <TextReveal><TextScramble>Skills & Technologies</TextScramble></TextReveal>
              <p className="section-subtitle">
                Technologies I work with and tools I use to bring ideas to life
              </p>
            </div>
          </ScrollReveal>

          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <ScrollReveal key={index} direction="up" delay={0.4 + index * 0.1}>
                <InteractiveCard className="skill-category glass-effect" intensity={0.1}>
                  <div className="category-header">
                    <div className="category-icon">
                      {category.icon}
                    </div>
                    <h3>{category.title}</h3>
                  </div>
                  <div className="skills-list">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="skill-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIndex * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </InteractiveCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.8}>
            <div className="currently-learning">
              <InteractiveCard className="glass-effect learning-card" intensity={0.12}>
                <h3>Currently Learning</h3>
                <p>Expanding my skillset with these technologies:</p>
                <div className="learning-list">
                  {currentlyLearning.map((item, index) => (
                    <motion.span
                      key={index}
                      className="learning-tag"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </InteractiveCard>
            </div>
          </ScrollReveal>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
