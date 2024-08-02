import axiosInstance from '../axiosConfig';
import axios from 'axios'; // Ensure axios is imported
import { User } from '../utils/types';

// Function to send login information
export const loginUser = async (userData: { telegram_id: string }) => {
  try {
    const response = await axiosInstance.post('login/', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle errors specifically related to Axios
      console.error('Error during login API call:', {
        message: error.message,
        response: error.response?.data,
        code: error.code,
      });
    } else {
      // Handle other types of errors
      console.error('Unexpected error:', error);
    }
    throw error; // Re-throw the error to be caught in the component
  }
};
