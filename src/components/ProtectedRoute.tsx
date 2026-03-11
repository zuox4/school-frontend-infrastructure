import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { LoadingFallback } from "./LoadingFallback";
import type { UserRole } from "../types/auth";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  allowedRoles = [],
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.some((role) => user?.roles.includes(role as UserRole))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
