import '../style/DownloadApp.css';

import appFrontScreen from "../asserts/appfrontscreen.jpg"

const DownloadApp = () => {
  const appFeatures = [
    'Real-time notifications',
    'Patient management on mobile',
    'Secure messaging with staff',
    'Access to analytics dashboard'
  ];

  const url="https://t.me/hportion";

  const handleDownloadClick = (platform) => {
    // alert(`Thank you for your interest! The H-Potion app for ${platform} will be available for download soon.`);
        window.open(url, '_blank');
  };

  return (
    <section id="download-app">
      <div className="container">
        <h2 className="section-title">Download Our Mobile App</h2>
        <div className="download-container">
          <div className="download-content">
            <div className="download-text">
              <h3>Manage Your Clinic On The Go</h3>
              <p>Access all H-Potion features from your mobile device. Available for both iOS and Android platforms.</p>
              <div className="app-features">
                {appFeatures.map((feature, index) => (
                  <div className="app-feature" key={index}>
                    <i className="fas fa-check-circle"></i>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="download-buttons">
                {/* <button 
                  className="download-btn ios-btn" 
                  onClick={() => handleDownloadClick('iOS')}
                >
                  <i className="fab fa-apple"></i>
                  <div>
                    <span>Download on the</span>
                    <strong>App Store</strong>
                  </div>
                </button> */}
                <button 
                  className="download-btn ios-btn" 
                  onClick={() => handleDownloadClick('iOS')}
                >
                  <i className="fa-solid fa-download"></i>
                  <div>
                    <span>Download </span>
                    <strong>MVP</strong>
                  </div>
                </button>
                {/* <button 
                  className="download-btn android-btn" 
                  onClick={() => handleDownloadClick('Android')}
                >
                  <i className="fab fa-google-play"></i>
                  <div>
                    <span>Get it on</span>
                    <strong>Google Play</strong>
                  </div>
                </button> */}
              </div>
            </div>
            <div className="download-image">
              <div className="phone-mockup">
                <div className="phone-screen">
                  <div className="app-preview">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;