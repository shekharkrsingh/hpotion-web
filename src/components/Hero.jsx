import { Link } from 'react-scroll';
import '../style/Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-content">
        <h1>Powering the Future of Digital Healthcare.</h1>
        <p>
          H-Potion is a comprehensive platform helping doctors and clinics manage appointments,
          collaborate with staff, and track performance in real-time.
        </p>
        <div className="hero-btns">
          <Link 
            to="contact" 
            spy={true} 
            smooth={true} 
            offset={-80} 
            duration={500} 
            className="btn"
          >
            Get Started
          </Link>
          <Link 
            to="services" 
            spy={true} 
            smooth={true} 
            offset={-80} 
            duration={500} 
            className="btn btn-secondary"
          >
            View Features
          </Link>
        </div>
      </div>
      <div className="hero-bg"></div>
    </section>
  );
};

export default Hero;