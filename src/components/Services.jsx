import '../style/Services.css'

const Services = () => {
  const services = [
    {
      icon: 'fas fa-calendar-check',
      title: 'Appointment Management',
      description: 'Manages the full lifecycle of patient appointments, including scheduling, cancellation, status updates, and daily clinic operations.'
    },
    {
      icon: 'fas fa-bell',
      title: 'Real-Time Notifications',
      description: 'Delivers instant alerts via WebSockets and maintains a history of user notifications with read/unread tracking.'
    },
    {
      icon: 'fas fa-user-md',
      title: 'Collaborator Management',
      description: 'Handles the addition, role management, and removal of doctors and clinic staff members.'
    },
    {
      icon: 'fas fa-envelope-open-text',
      title: 'Secure Invitation Service',
      description: 'Generates and validates secure tokens to safely onboard new staff without public registration.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Analytics & Statistics',
      description: 'Aggregates clinic data to provide actionable insights on patient volume and operational performance.'
    },
    // {
    //   icon: 'fas fa-headset',
    //   title: 'Support Ticket Service',
    //   description: 'Enables users to report issues and allows administrators to track and resolve technical inquiries.'
    // },
    // {
    //   icon: 'fas fa-cogs',
    //   title: 'Runtime Configuration',
    //   description: 'Manages dynamic feature flags and enforces mandatory application version updates.'
    // },
    // {
    //   icon: 'fas fa-shield-alt',
    //   title: 'Identity & Access (IAM)',
    //   description: 'Handles secure user authentication, profile management, and role-based access control.'
    // },
    {
      icon: 'fas fa-file-pdf',
      title: 'Report Generation',
      description: 'Generates and emails detailed PDF reports of appointment history and clinic statistics for specified date ranges.'
    }
  ];

  return (
    <section id="services">
      <div className="container">
        <h2 className="section-title">Core Features & Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;