import type { ComponentType, LazyExoticComponent } from "react";
import type { LucideIcon } from 'lucide-react';

export type UserRole = "student" | "staff" | "parent" | "admin";
export interface Service {
  id: string;
  name: string;
  icon?: string | LucideIcon
  path: string;
  allowedRoles: UserRole[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: LazyExoticComponent<ComponentType<any>> | ComponentType<any>; // ✅ Правильный тип

  description: string;
}

export interface User {
  id: string;
  fullName: string;
  roles: UserRole[];
  role: UserRole;
}

// Тип для состояния пользователя с загрузкой
export interface UserState {
  user: User | null;
  loading: boolean;
  error: Error | null;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}
