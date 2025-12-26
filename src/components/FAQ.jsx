import React, { useState } from 'react';
import '../style/FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: 'Is patient data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption for all data at rest and in transit. Our role-based access control ensures only authorized personnel can view sensitive patient information.'
    },
    {
      question: 'Can I invite my assistant to manage bookings?',
      answer: 'Yes! Our Collaborator Management Service allows you to send secure invitations to assistants, nurses, and other doctors, granting them specific roles within your clinic\'s workspace.'
    },
    {
      question: 'How do I generate reports?',
      answer: 'You can generate detailed PDF reports directly from your dashboard. Select your date range, and the service will email you a comprehensive report of appointments and clinic statistics.'
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Yes, H-Potion is built with React Native, offering a seamless native mobile experience for both iOS and Android devices, so you can manage your practice on the go.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`} 
              key={index}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
              >
                {item.question}
                <span className="faq-toggle">
                  <i className={`fas ${activeIndex === index ? 'fa-minus' : 'fa-plus'}`}></i>
                </span>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;