import { useState, useEffect, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "../api/axios";
import { AuthContext } from "./AuthContext";
import type {
  User,
  LoginCredentials,
  AuthResponse,
  DecodedToken,
  UserRole,
  AuthContextType,
} from "../types/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (!storedRefreshToken) throw new Error("No refresh token");

      const response = await api.post("/auth/refresh", {
        refreshToken: storedRefreshToken,
      });
      const { access_token, user: userData } = response.data;

      localStorage.setItem("access_token", access_token);
      setUser(userData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      logout();
    }
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }

      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.exp * 1000 < Date.now()) {
        await refreshToken();
        return;
      }

      // const response = await api.post("/users/profile/me");
      const user: User = {
        id: decoded.sub,
        email: decoded.email,
        roles: decoded.roles,
        role: decoded.role,
        fullName: decoded.fullname,
      };
      setUser(user);
    } catch (error) {
      console.error("Auth check failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await api.post<AuthResponse>(
      "/users/auth/login",
      credentials,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    const { access_token, refresh_token: refresh_token } = response.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    const decoded = jwtDecode<DecodedToken>(access_token);
    const user: User = {
      id: decoded.sub,
      email: decoded.email,
      roles: decoded.roles,
      role: decoded.role,
      fullName: decoded.fullname,
    };
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  const hasRole = (role: string): boolean => {
    return user?.roles.includes(role as UserRole) ?? false;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return (
      roles.some((role) => user?.roles.includes(role as UserRole)) ?? false
    );
  };

  const value: AuthContextType = {
    user,
    loading,
    setUser,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole,
    hasAnyRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
