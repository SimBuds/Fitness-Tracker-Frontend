import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Cache-Control': 'no-store',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User API
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    await AsyncStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    await AsyncStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('token');
    return api.post('/users/logout');
  } catch (error) {
    throw error;
  }
};

// Exercise API
export const getExercises = async () => {
  try {
    const response = await api.get('/exercises');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExerciseById = async (id) => {
  try {
    const response = await api.get(`/exercises/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createExercise = async (exerciseData) => {
  try {
    const response = await api.post('/exercises', exerciseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Workout API
export const getWorkouts = async () => {
  try {
    const response = await api.get('/workouts');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getWorkoutById = async (id) => {
  try {
    const response = await api.get(`/workouts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createWorkout = async (workoutData) => {
  try {
    const response = await api.post('/workouts', workoutData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateWorkout = async (id, workoutData) => {
  try {
    const response = await api.put(`/workouts/${id}`, workoutData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkout = async (id) => {
  try {
    const response = await api.delete(`/workouts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;