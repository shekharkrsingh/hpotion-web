import React, { useState } from 'react';
import '../style/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contact: formData.number,
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          number: '',
          message: ''
        });
        alert("Message sent successfully!");
      } else {
        setSubmitStatus('error');
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setSubmitStatus('error');
      alert("An error occurred. Please check your connection or try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      text: 'cludfee@gmail.com'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Headquarters',
      text: 'Bengaluru, India'
    },
    {
      icon: 'fas fa-clock',
      title: 'Support Hours',
      text: 'Mon - Fri: 9AM - 6PM IST'
    }
  ];

  const socialLinks = [
    { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/company/hpotion/' },
    // { icon: 'fab fa-twitter', url: '#' },
    // { icon: 'fab fa-instagram', url: '#' }
  ];

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-container">
          {/* <div className="contact-form">
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name<span>*</span></label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="number">Contact No</label>
                <input
                  type="text"
                  id="number"
                  value={formData.number}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address<span>*</span></label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message<span>*</span></label>
                <textarea
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="form-success">
                  Message sent successfully!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="form-error">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div> */}
          
          <div className="contact-info">
            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <div className="contact-detail" key={index}>
                  <div className="contact-icon">
                    <i className={info.icon}></i>
                  </div>
                  <div>
                    <h3>{info.title}</h3>
                    <p>{info.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a 
                  href={link.url} 
                  className="social-link" 
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;