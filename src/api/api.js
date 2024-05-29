import axios from 'axios';

// Set up the base URL for your API
const API_BASE_URL = 'http://localhost:5000/api';

const getAuthToken = () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NGRjMTZlNDFlZDNkYzA1OTIwMGFiIn0sImlhdCI6MTcxNjk3MzY0NSwiZXhwIjoxNzE3MDYwMDQ1fQ.TjCeCTnOn7qkGdxEI84NHfn05NPeexYn3RRf8hYyFww';
};

// Create an Axios instance with common configurations
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define API functions
export const fetchExercises = () => {
  return axiosInstance.get('/exercises');
};

export const fetchWorkouts = () => {
  return axiosInstance.get('/workouts');
};

export const createWorkout = (workoutData) => {
  return axiosInstance.post('/workouts', workoutData);
};

export default axiosInstance;
