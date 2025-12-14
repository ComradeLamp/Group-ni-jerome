import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Vehicles API
export const getVehicles = async (filters = {}) => {
  const params = {};
  if (filters.type && filters.type !== 'all') params.type = filters.type;
  if (filters.minPrice !== undefined) params.minPrice = filters.minPrice;
  if (filters.maxPrice !== undefined) params.maxPrice = filters.maxPrice;
  if (filters.search) params.search = filters.search;
  
  const response = await axios.get(`${API}/vehicles`, { params });
  return response.data;
};

export const getVehicle = async (id) => {
  const response = await axios.get(`${API}/vehicles/${id}`);
  return response.data;
};

// Appointments API
export const createAppointment = async (appointmentData) => {
  const response = await axios.post(`${API}/appointments`, appointmentData);
  return response.data;
};

// Inquiries API
export const createInquiry = async (inquiryData) => {
  const response = await axios.post(`${API}/inquiries`, inquiryData);
  return response.data;
};
