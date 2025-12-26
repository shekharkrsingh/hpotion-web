import { useState } from 'react';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';
import '../style/Navbar.css';
import largeLogo from '../asserts/HP-largeLogo.png'



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLightTheme, toggleTheme } = useTheme();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Features' },
    { id: 'download-app', label: 'Download App' },
    { id: 'app-gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav id="navbar" className="navbar">
      <div className="container nav-container">
        <a href="#" className="logo">
          <img src={largeLogo} alt="HPotion" />
           {!largeLogo &&(<span>H<span>Potion</span></span>)}
        </a>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.id}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button id="theme-toggle" className="theme-toggle-btn" onClick={toggleTheme}>
          <i className={isLightTheme ? 'fas fa-sun' : 'fas fa-moon'}></i>
        </button>

        <div className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;