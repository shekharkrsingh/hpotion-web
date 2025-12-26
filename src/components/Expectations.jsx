import '../style/Expectations.css';

const Expectations = () => {
  const expectations = [
    {
      icon: 'fas fa-bolt',
      title: 'Streamlined Efficiency',
      description: 'Expect a significant reduction in administrative overhead with automated appointment scheduling, status tracking, and quick filtering options.'
    },
    {
      icon: 'fas fa-wifi',
      title: 'Always-On Connectivity',
      description: 'Expect to stay constantly closely coordinated with your clinic\'s pulse through instant, real-time notifications about new patient bookings and emergencies.'
    },
    {
      icon: 'fas fa-lock',
      title: 'Enterprise-Grade Security',
      description: 'Expect complete peace of mind knowing that patient data and practice access are protected by industry-standard authentication and RBAC.'
    },
    {
      icon: 'fas fa-users',
      title: 'Collaborative Workflow',
      description: 'Expect a system built for teams, allowing doctors to seamlessly invite, manage, and coordinate with assistants and other staff members.'
    },
    {
      icon: 'fas fa-brain',
      title: 'Actionable Intelligence',
      description: 'Expect to make informed decisions for your practice using detailed statistics and comprehensive PDF reports that clearly visualize patient trends.'
    },
    {
      icon: 'fas fa-life-ring',
      title: 'Reliability & Support',
      description: 'Expect a robust, modern application experience with proactive support channels and seamless over-the-air updates.'
    }
  ];

  return (
    <section id="expectations">
      <div className="container">
        <h2 className="section-title">Why H-Potion?</h2>
        <div className="expectations-grid">
          {expectations.map((item, index) => (
            <div className="expectation-card" key={index}>
              <div className="expectation-icon">
                <i className={item.icon}></i>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expectations;