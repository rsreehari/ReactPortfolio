import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiSmartphone, FiGlobe, FiZap } from 'react-icons/fi';
import TextReveal from './TextReveal';
import ScrollReveal from './ScrollReveal';
import InteractiveCard from './InteractiveCard';
import './About.css';

const About = () => {
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

  const interests = [
    {
      icon: <FiCode />,
      title: "Problem Solving",
      description: "Passionate about tackling complex coding challenges and finding elegant solutions."
    },
    {
      icon: <FiGlobe />,
      title: "Web Development",
      description: "Building responsive and interactive web applications with modern technologies."
    },
    {
      icon: <FiSmartphone />,
      title: "App Development",
      description: "Currently learning React Native to create cross-platform mobile applications."
    },
    {
      icon: <FiZap />,
      title: "Emerging Tech",
      description: "Always exploring new technologies and staying updated with industry trends."
    }
  ];

  return (
    <section className="about" id="about">
      <div className="container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ScrollReveal direction="up" delay={0.2}>
            <div className="about-header">
              <TextReveal>About Me</TextReveal>
              <p className="section-subtitle">
                Get to know more about my journey and interests
              </p>
            </div>
          </ScrollReveal>

          <div className="about-grid">
            <ScrollReveal direction="left" delay={0.4}>
              <InteractiveCard className="glass-effect about-card" enableEffects={false}>
                <h3>My Journey</h3>
                <p>
                  I'm R Sreehari, a Computer Science Engineering student at the College of 
                  Engineering Karunagappally. My passion for technology drives me to constantly 
                  learn and explore new possibilities in the digital world.
                </p>
                <p>
                  Currently, I'm diving deep into React Native development, expanding my skills 
                  in mobile app development. I believe in the power of code to solve real-world 
                  problems and create meaningful user experiences.
                </p>
                <div className="education-info">
                  <h4>Education</h4>
                  <p><strong>College of Engineering Karunagappally</strong></p>
                  <p>Computer Science Engineering</p>
                </div>
              </InteractiveCard>
            </ScrollReveal>

            <div className="interests-grid">
              {interests.map((interest, index) => (
                <ScrollReveal key={index} direction="right" delay={0.6 + index * 0.1}>
                  <InteractiveCard className="interest-card glass-effect" intensity={0.15} enableEffects={false}>
                    <div className="interest-icon">
                      {interest.icon}
                    </div>
                    <h4>{interest.title}</h4>
                    <p>{interest.description}</p>
                  </InteractiveCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
