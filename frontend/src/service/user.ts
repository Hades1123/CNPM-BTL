import axios from './axios.customize';
import type { User } from '../types/user';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

interface ProfileApiResponse {
  data: User;
  message: string;
  success: boolean;
}

export const getProfile = async (): Promise<User> => {
  const response = await axios.get<ProfileApiResponse>(`${API_BASE}/user/profile`);
  return response.data.data;
};
