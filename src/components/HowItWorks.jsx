import '../style/HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'Register & Verify',
      description: 'Sign up securely using your medical credentials. We verify your identity to ensure a safe environment for all patients and practitioners.'
    },
    {
      number: '2',
      title: 'Onboard Your Staff',
      description: 'Send secure, tokenized invitations to your doctors and assistants. They can join your workspace instantly without complex setup.'
    },
    {
      number: '3',
      title: 'Manage Your Practice',
      description: 'Start scheduling appointments, tracking patient status, and viewing real-time analytics immediately from your dashboard.'
    }
  ];

  return (
    <section id="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <div className="process-steps">
          {steps.map((step, index) => (
            <div className="process-step" key={index}>
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;