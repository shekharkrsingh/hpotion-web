import { useState, useEffect, useRef } from 'react';
import '../style/AppGallery.css';

const AppGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const galleryRef = useRef(null);
  
  const galleryItems = [
    {
      icon: 'fas fa-calendar-alt',
      title: 'Appointment Dashboard',
      description: 'Manage and view all appointments in one intuitive dashboard',
      tag: 'Dashboard'
    },
    {
      icon: 'fas fa-user-injured',
      title: 'Patient Profiles',
      description: 'Access detailed patient information and medical history',
      tag: 'Patients'
    },
    {
      icon: 'fas fa-chart-bar',
      title: 'Analytics Dashboard',
      description: 'Real-time clinic performance metrics and insights',
      tag: 'Analytics'
    },
    {
      icon: 'fas fa-comments',
      title: 'Staff Collaboration',
      description: 'Secure messaging and collaboration with your team',
      tag: 'Messaging'
    },
    {
      icon: 'fas fa-file-medical',
      title: 'Reports Section',
      description: 'Generate and view detailed medical reports',
      tag: 'Reports'
    },
    {
      icon: 'fas fa-cog',
      title: 'Settings Panel',
      description: 'Customize app preferences and clinic settings',
      tag: 'Settings'
    },
    {
      icon: 'fas fa-bell',
      title: 'Notifications Center',
      description: 'Real-time alerts for appointments and updates',
      tag: 'Alerts'
    },
    {
      icon: 'fas fa-prescription',
      title: 'Prescription Manager',
      description: 'Create and manage patient prescriptions digitally',
      tag: 'Prescriptions'
    }
  ];

  // Calculate items per view based on screen width
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 576) return 1; // 1 item on mobile
      if (window.innerWidth < 768) return 2; // 2 items on tablet
      return 2; // 2 items on desktop
    }
    return 2; // Default
  };

  const scrollToSlide = (index) => {
    if (galleryRef.current) {
      const galleryItem = galleryRef.current.querySelector('.gallery-item');
      if (galleryItem) {
        const itemWidth = galleryItem.offsetWidth + 20; // width + gap
        const scrollPosition = index * itemWidth * getItemsPerView();
        galleryRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
        setCurrentSlide(index);
      }
    }
  };

  const nextSlide = () => {
    const itemsPerView = getItemsPerView();
    const totalSlides = Math.ceil(galleryItems.length / itemsPerView);
    const next = (currentSlide + 1) % totalSlides;
    scrollToSlide(next);
  };

  const prevSlide = () => {
    const itemsPerView = getItemsPerView();
    const totalSlides = Math.ceil(galleryItems.length / itemsPerView);
    const prev = currentSlide - 1 < 0 ? totalSlides - 1 : currentSlide - 1;
    scrollToSlide(prev);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Reset to first slide on resize
      scrollToSlide(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const itemsPerView = getItemsPerView();
  const visibleDots = Math.ceil(galleryItems.length / itemsPerView);

  return (
    <section id="app-gallery">
      <div className="container">
        <h2 className="section-title">App UI Gallery</h2>
        <div className="gallery-container">
          <div className="gallery-scroll" ref={galleryRef}>
            {galleryItems.map((item, index) => (
              <div className="gallery-item" key={index}>
                <div className="gallery-image">
                  <i className={item.icon}></i>
                </div>
                <div className="gallery-caption">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <span className="gallery-tag">{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="gallery-controls">
            <button className="gallery-btn prev-btn" onClick={prevSlide}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="gallery-btn next-btn" onClick={nextSlide}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="gallery-dots">
            {Array.from({ length: visibleDots }).map((_, index) => (
              <span 
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => scrollToSlide(index)}
                data-index={index}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppGallery;