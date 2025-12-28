import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppointmentBooking from './AppointmentBooking';
import '../style/DoctorProfile.css';

import { getDoctorProfile } from '../services/publicService';

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  useEffect(() => {
    const fetchDoctorData = async () => {
      setLoading(true);
      try {
        const response = await getDoctorProfile(doctorId);
        if (response.success) {
          setDoctor(response.data);
        } else {
          console.error("Failed to load doctor profile");
        }
      } catch (err) {
        console.error("Error fetching doctor data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctorData();
    }
  }, [doctorId]);

  const handleBookAppointment = () => {
    setShowAppointmentForm(true);
    // Scroll to appointment section
    setTimeout(() => {
      document.getElementById('appointment-section')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  };

  if (loading) {
    return (
      <div className="doctor-loading">
        <div className="loading-spinner"></div>
        <p>Loading doctor profile...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="doctor-error">
        <i className="fas fa-user-md"></i>
        <h3>Doctor not found</h3>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="doctor-profile">
      <div className='container'>
        {/* Doctor Header */}
        <div className="doctor-header-section">
          <div className="doctor-avatar-container">
            <img
              src={doctor.profilePicture || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"}
              alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
              className="doctor-avatar-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop";
              }}
            />
          </div>
          <div className="doctor-header-info">
            <h1 className="doctor-name">Dr. {doctor.firstName} {doctor.lastName}</h1>
            <p className="doctor-specialty">{doctor.specialization}</p>

            <div className="doctor-quick-info">
              <div className="info-item">
                <i className="fas fa-award"></i>
                <span>{doctor.yearsOfExperience} Years Experience</span>
              </div>
              <div className="info-item">
                <i className="fas fa-hospital"></i>
                <span>{doctor.clinicName}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <span>{doctor.consultationHours}</span>
              </div>
            </div>

            <div className="doctor-actions">
              <button
                className="book-now-btn"
                onClick={handleBookAppointment}
              >
                <i className="fas fa-calendar-plus"></i>
                Book Now
              </button>

              {/* <div className="doctor-features">
                <div className="feature-item">
                  <i className="fas fa-clock"></i>
                  <span>45 min session</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-video"></i>
                  <span>Video consult available</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-file-medical"></i>
                  <span>Digital prescriptions</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="doctor-details-section">
          <div className="details-grid">
            {/* Left Column */}
            <div className="details-left">
              {/* About Section */}
              <div className="info-card">
                <h3 className="info-card-title">
                  <i className="fas fa-user-md"></i> About Doctor
                </h3>
                <p className="doctor-about">{doctor.about}</p>
                <p className="doctor-bio">{doctor.bio}</p>
              </div>

              {/* Education & Awards */}
              <div className="info-card">
                <h3 className="info-card-title">
                  <i className="fas fa-graduation-cap"></i> Education & Qualifications
                </h3>
                <ul className="info-list">
                  {doctor.education.map((item, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="details-right">
              {/* Clinic Information */}
              <div className="info-card">
                <h3 className="info-card-title">
                  <i className="fas fa-hospital"></i> Clinic Information
                </h3>
                <div className="contact-info-list">
                  <div className="contact-item">
                    <i className="fas fa-building"></i>
                    <div>
                      <strong>Clinic Name</strong>
                      <p>{doctor.clinicName}</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <div>
                      <strong>Email</strong>
                      <p>{doctor.clinicEmail}</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <div>
                      <strong>Contact</strong>
                      <p>{doctor.clinicContactNumber}</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                      <strong>Address</strong>
                      <p>{doctor.clinicAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Awards Section */}
              <div className="info-card">
                <h3 className="info-card-title">
                  <i className="fas fa-trophy"></i> Awards & Achievements
                </h3>
                <ul className="info-list">
                  {doctor.achievementsAndAwards.map((item, index) => (
                    <li key={index}>
                      <i className="fas fa-award"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Booking Section - Now at the bottom */}
        <div id="appointment-section" className="appointment-section">
          {showAppointmentForm ? (
            <AppointmentBooking
              doctorId={doctor.doctorId}
              doctorName={`${doctor.firstName} ${doctor.lastName}`}
              doctorSpecialization={doctor.specialization}
            />
          ) : (
            <div className="appointment-cta">
              <h3>Ready to Book an Appointment?</h3>
              <p>Schedule a consultation with Dr. {doctor.firstName} {doctor.lastName}</p>
              <button
                className="book-now-btn large"
                onClick={handleBookAppointment}
              >
                <i className="fas fa-calendar-plus"></i>
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;