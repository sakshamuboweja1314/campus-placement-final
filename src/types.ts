export  interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'recruiter';
  college?: string;
  company?: string;
  skills?: string[];
  experience?: string;
  tier?: 1 | 2 | 3;
}

export interface LoginData {
  email: string;
  password: string;
  role: 'student' | 'recruiter';
  name?: string;
  college?: string;
  company?: string;
}
 