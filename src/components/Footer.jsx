import React from 'react';
import { Link } from 'react-scroll';
import '../style/Footer.css';
import largeLogo from '../asserts/HP-largeLogo.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Features' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'expectations', label: 'Why Us' },
    { id: 'download-app', label: 'Download App' },
    { id: 'app-gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={largeLogo} alt="H-Potion Logo" />
            {!largeLogo &&(<span>H<span>Potion</span></span>)}
          </div>
          
          <ul className="footer-links">
            {footerLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.id}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="footer-link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} H-Potion Team - Innovating Healthcare Management</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;