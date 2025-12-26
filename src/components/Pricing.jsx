import { Link } from 'react-scroll';
import '../style/Pricing.css';

const Pricing = () => {
  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      period: '',
      description: 'For independent doctors',
      features: [
        '1 Doctor Account',
        'Basic Appointment Management',
        '100 Appointments/mo',
        'Standard Support'
      ],
      buttonText: 'Get Started',
      buttonLink: 'contact',
      featured: false
    },
    {
      name: 'Professional',
      price: '$49',
      period: '/mo',
      description: 'For growing clinics',
      features: [
        '5 Doctor Accounts',
        'Unlimited Collaborators',
        'Advanced Analytics & Reports',
        'Real-time Notifications'
      ],
      buttonText: 'Start Free Trial',
      buttonLink: 'contact',
      featured: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large hospitals',
      features: [
        'Unlimited Accounts',
        'Custom Integrations',
        'Dedicated Account Manager',
        'SLA Support'
      ],
      buttonText: 'Contact Sales',
      buttonLink: 'contact',
      featured: false
    }
  ];

  return (
    <section id="pricing">
      <div className="container">
        <h2 className="section-title">Simple, Transparent Pricing</h2>
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <div className={`pricing-card ${plan.featured ? 'featured' : ''}`} key={index}>
              {plan.featured && <div className="popular-tag">Most Popular</div>}
              
              <div className="pricing-header">
                <h3>{plan.name}</h3>
                <div className="price">
                  {plan.price}
                  {plan.period && <span>{plan.period}</span>}
                </div>
                <p>{plan.description}</p>
              </div>
              
              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link 
                to={plan.buttonLink} 
                smooth={true} 
                offset={-80} 
                duration={500}
                className={`btn ${plan.featured ? '' : 'btn-secondary'}`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;