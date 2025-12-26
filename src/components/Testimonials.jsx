import React, { useState, useEffect } from 'react';
import '../style/Testimonials.css';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      quote: "H-Potion has completely transformed how we manage our clinic. The real-time notifications and appointment management features have saved us countless hours every week.",
      author: "Dr. Sarah Thompson",
      role: "Chief Physician, HealthFirst Clinic"
    },
    {
      quote: "The collaborator management system is brilliant. I can easily onboard new staff and manage permissions without any hassle. H-Potion is a game-changer for our practice.",
      author: "Dr. Michael Chen",
      role: "Medical Director, WellCare Medical Group"
    },
    {
      quote: "The analytics and reporting features give us invaluable insights into our clinic's performance. We've improved our patient care significantly since implementing H-Potion.",
      author: "Dr. Priya Patel",
      role: "Founder, CarePlus Healthcare"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section id="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-container">
          <div className="testimonial-slider">
            <div 
              className="testimonials-track" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div className="testimonial-slide" key={index}>
                  <div className="testimonial">
                    <div className="testimonial-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                    <p className="testimonial-quote">"{testimonial.quote}"</p>
                    <p className="testimonial-author">{testimonial.author}</p>
                    <p className="testimonial-role">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="testimonial-controls">
            <button className="testimonial-btn prev-btn" onClick={prevSlide}>
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button className="testimonial-btn next-btn" onClick={nextSlide}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;