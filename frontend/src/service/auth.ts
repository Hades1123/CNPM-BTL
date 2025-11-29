import axios from './axios.customize';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  mssv: string;
  name: string;
  role: string;
  faculty: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: 'STUDENT' | 'TUTOR';
    name: string;
  };
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const res = await axios.post(`${API_URL}/login`, payload);
    return res.data;
  },

  register: async (payload: RegisterPayload): Promise<void> => {
    await axios.post(`${API_URL}/register`, payload);
  },
};
