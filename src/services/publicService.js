import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/public';

export const getDoctorProfile = async (doctorId) => {
    try {
        const response = await axios.get(`${API_URL}/${doctorId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendOtp = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/send-otp`, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bookAppointment = async (bookingData) => {
    try {
        const response = await axios.post(`${API_URL}/appointments/book`, bookingData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
