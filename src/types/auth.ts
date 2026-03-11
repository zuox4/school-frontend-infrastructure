import type { Dispatch, SetStateAction } from "react";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  // user: User;
}

export interface User {
  id: string;
  fullName: string;
  roles: UserRole[];
  role: UserRole;
  email: string | null;
}

export type UserRole = "student" | "staff" | "parent" | "admin";

export interface DecodedToken {
  sub: string;
  roles: UserRole[];
  fullname: string;
  email: string | null;
  exp: number;
  role: UserRole;
}

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>; // Добавьте эту строку
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
};
