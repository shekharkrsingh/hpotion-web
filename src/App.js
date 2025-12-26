import { useEffect, useState } from 'react';
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
// import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
// import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
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
    <ThemeProvider>
      <div className={`App ${hasNotification ? 'has-notification' : ''}`}>
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
          {/* <Pricing /> */}
          <FAQ />
          {/* <Testimonials /> */}
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;