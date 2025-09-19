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
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

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

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
    
    // Clear submit status when user modifies form
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    setFormErrors({});
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would integrate with a form service like Formspree, Netlify Forms, etc.
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: "Email",
      value: "rsreehari091@gmail.com",
      link: "mailto:rsreehari091@gmail.com"
    },
    {
      icon: <FiMapPin />,
      title: "Location",
      value: "Varkala, Kerala, India",
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

          {/* Minimal Connect strip above footer */}
          <div className="connect-strip" aria-label="Connect with me">
            <span className="connect-label">Connect with me</span>
            <div className="connect-icons">
              <a href="https://github.com/rsreehari" target="_blank" rel="noopener noreferrer" className="connect-link" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href="https://www.linkedin.com/in/rsreehari0/" target="_blank" rel="noopener noreferrer" className="connect-link" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="mailto:rsreehari091@gmail.com" className="connect-link" aria-label="Email">
                <FiMail />
              </a>
            </div>
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
                
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    className="form-message success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✅ Thank you for your message! I'll get back to you soon.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    className="form-message error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ❌ Sorry, there was an error sending your message. Please try again.
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input ${formErrors.name ? 'error' : ''}`}
                      disabled={isSubmitting}
                    />
                    {formErrors.name && (
                      <motion.span
                        className="error-text"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {formErrors.name}
                      </motion.span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${formErrors.email ? 'error' : ''}`}
                      disabled={isSubmitting}
                    />
                    {formErrors.email && (
                      <motion.span
                        className="error-text"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {formErrors.email}
                      </motion.span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className={`form-input form-textarea ${formErrors.message ? 'error' : ''}`}
                      disabled={isSubmitting}
                    ></textarea>
                    {formErrors.message && (
                      <motion.span
                        className="error-text"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {formErrors.message}
                      </motion.span>
                    )}
                  </div>
                  
                  <MagneticButton>
                    <button
                      type="submit"
                      className={`submit-button button-primary ${isSubmitting ? 'loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="loading-spinner"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FiSend />
                          <span>Send Message</span>
                        </>
                      )}
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
