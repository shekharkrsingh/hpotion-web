import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/AppointmentBooking.css';
import { sendOtp, bookAppointment } from '../services/publicService';

const AppointmentBooking = ({ doctorId, doctorName, doctorSpecialization }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    contact: '',
    email: '',
    appointmentDateTime: null,
    doctorId: doctorId || '',
    otp: '',
    description: ''
  });

  const [step, setStep] = useState(1); // 1: Personal Details, 2: OTP Verification, 3: Confirmation
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      appointmentDateTime: date
    }));
  };

  const handleSendOtp = async () => {
    if (!formData.email || !formData.patientName || !formData.contact || !formData.appointmentDateTime) {
      alert('Please fill all required fields before sending OTP');
      return;
    }



    setLoading(true);
    try {
      const response = await sendOtp(formData.email);
      if (response.success) {
        setOtpSent(true);
        setStep(2);
        alert('OTP sent successfully!');
      } else {
        alert('Failed to send OTP');
      }
    } catch (error) {
      console.error("OTP Error:", error);
      alert('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (formData.otp.length < 4) {
      alert('Please enter a valid OTP');
      return;
    }
    // Frontend just moves to next step, actual verification happens during booking or can be separate check if needed.
    // However, usually booking verifies OTP. But here looking at backend `selfBookAppointment` it calls `otpService.validateOtp`.
    // So we can assume verification happens at booking time unless we have a specific verify endpoint (which we don't in PublicController).
    // Wait, let's check backend... `selfBookAppointment` validates OTP.
    // So we just "accept" the OTP input here and proceed to confirmation step.

    setLoading(true);
    setTimeout(() => {
      setOtpVerified(true);
      setStep(3);
      setLoading(false);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert('Please verify OTP first (Click Verify OTP button)');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        doctorId,
        patientName: formData.patientName,
        contact: formData.contact,
        email: formData.email,
        otp: formData.otp, // Send the collected OTP
        appointmentDateTime: formData.appointmentDateTime,
        description: formData.description || 'Web Booking'
      };

      const response = await bookAppointment(payload);
      if (response.success) {
        const appointmentId = response.data.appointmentId;
        // Store in local storage with expiration
        const storageData = {
          appointmentId,
          expiry: new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // 30 days
        };
        localStorage.setItem('bookedAppointment', JSON.stringify(storageData));

        alert(`Appointment booked successfully!\n\nID: ${appointmentId}`);
        // Reset form or redirect
        setFormData({
          patientName: '',
          contact: '',
          email: '',
          appointmentDateTime: null,
          doctorId: doctorId || '',
          otp: '',
          description: ''
        });
        setStep(1);
        setOtpSent(false);
        setOtpVerified(false);
      } else {
        alert(response.message || 'Booking Failed');
      }

    } catch (error) {
      console.error("Booking Error:", error);
      alert(error.response?.data?.message || 'Booking Failed');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.patientName &&
      formData.contact &&
      formData.email &&
      formData.appointmentDateTime &&
      formData.doctorId;
  };

  return (
    <div className="appointment-booking">
      <div className="booking-header">
        <h2><i className="fas fa-calendar-check"></i> Book Appointment</h2>
        <p className="doctor-info">
          With: <strong>Dr. {doctorName}</strong> - {doctorSpecialization}
        </p>
      </div>

      <div className="booking-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <span>Personal Details</span>
        </div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span>OTP Verification</span>
        </div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span>Confirmation</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        {/* Step 1: Personal Details & Date/Time Selection */}
        {step === 1 && (
          <div className="form-step">
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="patientName">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact">
                    Contact Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Any specific concerns or notes for the doctor"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Select Date & Time</h3>

              <div className="form-group">
                <label>
                  Appointment Date & Time <span className="required">*</span>
                </label>
                <div className="datetime-picker-container">
                  <DatePicker
                    selected={formData.appointmentDateTime}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    placeholderText="Select date and time"
                    className="datetime-input"
                  />
                  <i className="fas fa-calendar-alt"></i>
                </div>
              </div>

            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={handleSendOtp}
                disabled={!isFormValid() || loading}
              >
                {loading ? 'Sending...' : 'Send OTP for Verification'}
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <div className="form-step otp-step">
            <div className="otp-header">
              <i className="fas fa-shield-alt"></i>
              <h3>Email Verification</h3>
              <p>We've sent a 6-digit OTP to <strong>{formData.email}</strong></p>
              <p className="otp-instruction">Please enter the OTP below to verify your email</p>
            </div>

            <div className="form-group">
              <label htmlFor="otp">Enter 6-digit OTP <span className="required">*</span></label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                maxLength="6"
                placeholder="Enter OTP"
                className="otp-input"
              />
              <div className="otp-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  Resend OTP
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleVerifyOtp}
                  disabled={formData.otp.length !== 6 || loading}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </div>

            <div className="back-action">
              <button
                type="button"
                className="btn-link"
                onClick={() => setStep(1)}
              >
                <i className="fas fa-arrow-left"></i> Back to Details
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && otpVerified && (
          <div className="form-step confirmation-step">
            <div className="confirmation-header">
              <i className="fas fa-check-circle"></i>
              <h3>Appointment Details</h3>
            </div>

            <div className="appointment-summary">
              <div className="summary-item">
                <strong>Doctor:</strong>
                <span>Dr. {doctorName} ({doctorSpecialization})</span>
              </div>
              <div className="summary-item">
                <strong>Patient Name:</strong>
                <span>{formData.patientName}</span>
              </div>
              <div className="summary-item">
                <strong>Contact:</strong>
                <span>{formData.contact}</span>
              </div>
              <div className="summary-item">
                <strong>Email:</strong>
                <span>{formData.email}</span>
              </div>
              <div className="summary-item">
                <strong>Appointment Date:</strong>
                <span>{formData.appointmentDateTime?.toLocaleDateString()}</span>
              </div>
              <div className="summary-item">
                <strong>Appointment Time:</strong>
                <span>{formData.appointmentDateTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              {formData.description && (
                <div className="summary-item">
                  <strong>Description:</strong>
                  <span>{formData.description}</span>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn-success"
                disabled={loading}
              >
                {loading ? 'Booking...' : 'Confirm Appointment'}
                <i className="fas fa-calendar-check"></i>
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStep(2)}
              >
                <i className="fas fa-edit"></i> Edit Details
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AppointmentBooking;