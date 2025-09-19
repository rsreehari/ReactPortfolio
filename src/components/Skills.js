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
      skills: ["JavaScript (ES6+)", "Python", "Java", "C++", "HTML5", "CSS3", "TypeScript"]
    },
    {
      icon: <FiGlobe />,
      title: "Frontend Development",
      skills: ["React.js", "React Hooks", "JSX", "Responsive Design", "CSS Grid & Flexbox", "Framer Motion", "Material-UI", "Bootstrap"]
    },
    {
      icon: <FiSmartphone />,
      title: "Mobile Development",
      skills: ["React Native", "Expo", "AsyncStorage", "Mobile UI/UX", "Cross-platform Development", "Touch Gestures"]
    },
    {
      icon: <FiDatabase />,
      title: "Backend & Database",
      skills: ["Node.js", "Express.js", "MySQL", "Firebase", "RESTful APIs", "JSON", "MongoDB (Learning)"]
    },
    {
      icon: <FiGitBranch />,
      title: "Version Control & Deployment",
      skills: ["Git", "GitHub", "Netlify", "Vercel", "CI/CD", "Code Review", "Collaborative Development"]
    },
    {
      icon: <FiTool />,
      title: "Tools & Development",
      skills: ["VS Code", "NPM/Yarn", "Webpack", "Chrome DevTools", "Figma", "Postman", "ESLint", "Prettier"]
    }
  ];

  const currentlyLearning = [
    "React Native Advanced Navigation",
    "Redux Toolkit & State Management",
    "TypeScript for React",
    "Next.js Framework",
    "GraphQL & Apollo Client",
    "Docker & DevOps",
    "MongoDB & Mongoose",
    "AWS Cloud Services"
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
