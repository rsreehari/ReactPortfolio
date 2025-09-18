import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import TextReveal from './TextReveal';
import ScrollReveal from './ScrollReveal';
import InteractiveCard from './InteractiveCard';
import MagneticButton from './MagneticButton';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the form data
    console.log('Form submitted:', formData);
    // You can integrate with a form service like Formspree, Netlify Forms, etc.
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: "Email",
      value: "rsreehari@example.com",
      link: "mailto:rsreehari@example.com"
    },
    {
      icon: <FiMapPin />,
      title: "Location",
      value: "Karunagappally, Kerala, India",
      link: null
    },
    {
      icon: <FiGithub />,
      title: "GitHub",
      value: "github.com/rsreehari",
      link: "https://github.com/rsreehari"
    },
    {
      icon: <FiLinkedin />,
      title: "LinkedIn",
      value: "linkedin.com/in/rsreehari0",
      link: "https://www.linkedin.com/in/rsreehari0/"
    }
  ];

  return (
    <section className="contact" id="contact">
      <div className="container">
        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ScrollReveal direction="up" delay={0.2}>
            <div className="contact-header">
              <TextReveal>Get In Touch</TextReveal>
              <p className="section-subtitle">
                Let's connect and discuss opportunities, projects, or just have a chat about technology
              </p>
            </div>
          </ScrollReveal>

          <div className="contact-grid">
            <ScrollReveal direction="left" delay={0.4}>
              <InteractiveCard className="glass-effect info-card">
                <h3>Let's Connect</h3>
                <p>
                  I'm always open to discussing new opportunities, collaborating on projects, 
                  or simply connecting with fellow developers and tech enthusiasts.
                </p>
                
                <div className="contact-methods">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      className="contact-method"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <div className="method-icon">
                        {item.icon}
                      </div>
                      <div className="method-info">
                        <h4>{item.title}</h4>
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            {item.value}
                          </a>
                        ) : (
                          <span>{item.value}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="availability">
                  <div className="status-indicator">
                    <div className="status-dot"></div>
                    <span>Available for opportunities</span>
                  </div>
                </div>
              </InteractiveCard>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <InteractiveCard className="glass-effect form-card">
                <h3>Send a Message</h3>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="form-input form-textarea"
                    ></textarea>
                  </div>
                  <MagneticButton>
                    <button
                      type="submit"
                      className="submit-button button-primary"
                    >
                      <FiSend />
                      <span>Send Message</span>
                    </button>
                  </MagneticButton>
                </form>
              </InteractiveCard>
            </ScrollReveal>
          </div>
        </motion.div>
      </div>

      <motion.footer className="footer" variants={itemVariants}>
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2024 R Sreehari. Built with React and lots of ☕</p>
            <div className="footer-links">
              <a href="https://github.com/rsreehari" target="_blank" rel="noopener noreferrer">
                <FiGithub />
              </a>
              <a href="https://www.linkedin.com/in/rsreehari0/" target="_blank" rel="noopener noreferrer">
                <FiLinkedin />
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </section>
  );
};

export default Contact;
