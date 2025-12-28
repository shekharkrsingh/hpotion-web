import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import NotificationStrip from './components/NotificationStrip';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import DownloadApp from './components/DownloadApp';
import Expectations from './components/Expectations';
import HowItWorks from './components/HowItWorks';
import AppGallery from './components/AppGallery';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DoctorProfile from './components/DoctorProfile';
import './App.css';

// Home Page Component
const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  useEffect(() => {
    // Check if notification was closed
    const wasClosed = localStorage.getItem('notificationClosed');
    if (wasClosed === 'true') {
      setHasNotification(false);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`home-page ${hasNotification ? 'has-notification' : ''}`}>
      <NotificationStrip />
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <About />
        <Services />
        <DownloadApp />
        <Expectations />
        <HowItWorks />
        <AppGallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

// Main App Component
function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <ThemeProvider>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:doctorId" element={<DoctorProfile />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;