import axios from './axios.customize';
import type { Session, SessionsApiResponse, RegisterApiResponse, TutorWithStats } from '@/types/sessions';

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
};

/**
 * Group sessions by tutor and calculate stats
 */
export const groupSessionsByTutor = (sessions: Session[]): TutorWithStats[] => {
  const tutorMap = new Map<number, TutorWithStats & { teachingSubjectsSet: Set<string> }>();

  sessions.forEach((session) => {
    const studentCount = session._count?.registrations || 0;
    const tutorId = session.tutor.id;

    if (!tutorMap.has(tutorId)) {
      tutorMap.set(tutorId, {
        ...session.tutor,
        totalStudents: studentCount,
        teachingSubjects: [],
        teachingSubjectsSet: new Set([session.title]),
      });
    } else {
      const existingTutor = tutorMap.get(tutorId)!;
      existingTutor.totalStudents += studentCount;
      existingTutor.teachingSubjectsSet.add(session.title);
    }
  });

  // Convert Set to Array
  return Array.from(tutorMap.values()).map((tutor) => ({
    id: tutor.id,
    username: tutor.username,
    name: tutor.name,
    email: tutor.email,
    role: tutor.role,
    faculty: tutor.faculty,
    avatar: tutor.avatar,
    totalStudents: tutor.totalStudents,
    teachingSubjects: Array.from(tutor.teachingSubjectsSet),
  }));
};
