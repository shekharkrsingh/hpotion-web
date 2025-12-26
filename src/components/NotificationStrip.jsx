import React, { useState, useEffect } from 'react';
import '../style/NotificationStrip.css';

const NotificationStrip = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  // Check if notification was previously closed
  useEffect(() => {
    const wasClosed = localStorage.getItem('notificationClosed');
    if (wasClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('notificationClosed', 'true');
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`notification-strip ${isClosing ? 'closing' : ''}`}>
      <div className="container strip-content">
        <span className="strip-text">
          <i className="fas fa-bullhorn"></i>
          <strong>Coming Soon:</strong>The complete MVP version will be available soon. Stay tuned for updates!
        </span>
        <button className="strip-close" onClick={handleClose} aria-label="Close notification">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default NotificationStrip;