// Types for Session and Tutor data

export interface Tutor {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  faculty: string;
  avatar?: string;
}

export interface Registration {
  id: number;
  sessionId: number;
  registeredAt: string;
  status: string;
}

export interface Session {
  id: number;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  maxStudents: number;
  createdAt: string;
  updatedAt: string;
  tutor: Tutor;
  _count: {
    registrations: number;
  };
  userRegistration?: Registration | null;
}

// Tutor with aggregated data from sessions
export interface TutorWithStats extends Tutor {
  totalStudents: number;
  teachingSubjects: string[];
}

export interface SessionsApiResponse {
  success: boolean;
  message: string;
  data: Session[];
}

export interface RegisterApiResponse {
  success: boolean;
  message: string;
  data: Registration;
}

// Material attached to a session
export interface Material {
  id: number;
  fileName: string;
  fileUrl: string;
  createdAt: string;
}

// Session with materials for student's registered sessions
export interface SessionWithMaterials {
  id: number;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  maxStudents: number;
  createdAt: string;
  updatedAt: string;
  currentStudents: number;
  availableSlots: number;
  tutor: Pick<Tutor, 'id' | 'username' | 'name' | 'email'>;
  materials: Material[];
}

// My registration with session details
export interface MyRegistration {
  registration: {
    id: number;
    status: string;
    registeredAt: string;
  };
  session: SessionWithMaterials;
}

export interface MyRegistrationsApiResponse {
  success: boolean;
  message: string;
  data: MyRegistration[];
}
