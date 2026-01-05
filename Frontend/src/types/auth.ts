export type UserRole = 'admin' | 'faculty' | 'student';

export type OrganizationType = 'school' | 'college';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId?: string;
  createdAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  adminId: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
