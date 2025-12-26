import '../style/About.css';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About H-Potion</h2>
            <p className="about-subtitle">A unified platform for modern medical practices</p>
            <p>
              H-Potion is a secure and scalable healthcare platform designed to streamline clinic operations. 
              It brings together appointment scheduling, patient management, real-time notifications, and staff 
              collaboration into a single, intuitive interface.
            </p>
            <p>
              Built with reliability and performance in mind, H-Potion empowers healthcare providers to focus 
              less on administration and more on patient care, delivering consistent digital experiences at any scale.
            </p>
          </div>
          <div className="about-image">
            <div className="profile-image-placeholder">
              <i className="fas fa-stethoscope"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;