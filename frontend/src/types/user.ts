export interface User {
  id: number;
  username: string;
  email: string;
  mssv: string | null;
  name: string;
  faculty: string;
  role: 'STUDENT' | 'TUTOR' | 'ADMIN';
}

export interface ProfileApiResponse {
  data: User;
  message: string;
  success: boolean;
}
