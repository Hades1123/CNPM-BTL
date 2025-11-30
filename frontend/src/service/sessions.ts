import axios from './axios.customize';
import type {
  Session,
  SessionsApiResponse,
  RegisterApiResponse,
  MyRegistration,
  MyRegistrationsApiResponse,
  TutorSession,
  TutorSessionsApiResponse,
} from '@/types/sessions';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const sessionsApi = {
  /**
   * Get all sessions with optional search
   * @param search - search keyword for title or tutor name
   */
  getAllSessions: async (search?: string): Promise<Session[]> => {
    const params = new URLSearchParams();
    if (search && search.trim()) {
      params.append('search', search.trim());
    }

    const url = `${API_BASE}/sessions${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await axios.get<SessionsApiResponse>(url);
    return response.data.data;
  },

  /**
   * Register for a session
   * @param sessionId - the session ID to register for
   */
  registerSession: async (sessionId: number): Promise<RegisterApiResponse> => {
    const response = await axios.post<RegisterApiResponse>(`${API_BASE}/sessions/${sessionId}/register`);
    return response.data;
  },

  /**
   * Cancel registration for a session
   * @param sessionId - the session ID to cancel registration
   */
  cancelRegistration: async (sessionId: number): Promise<RegisterApiResponse> => {
    const response = await axios.delete<RegisterApiResponse>(`${API_BASE}/sessions/${sessionId}/register`);
    return response.data;
  },

  /**
   * Get current user's registrations with session details
   */
  getMyRegistrations: async (): Promise<MyRegistration[]> => {
    const response = await axios.get<MyRegistrationsApiResponse>(`${API_BASE}/sessions/my-registrations`);
    return response.data.data;
  },

  /**
   * Get tutor's own sessions
   */
  getTutorSessions: async (): Promise<TutorSession[]> => {
    const response = await axios.get<TutorSessionsApiResponse>(`${API_BASE}/tutor/sessions`);
    return response.data.data;
  },
};
