import { Routes, Route } from "react-router-dom";
import { memo, useMemo } from "react";

import { HomePage } from "../pages/HomePage";
import { NotFound } from "../components/NotFound";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { LoadingFallback } from "../components/LoadingFallback";
import { useAuth } from "../hooks/useAuth";
import { useRouteConfig } from "../hooks/useRouteConfig";
import { useServices } from "../hooks/useServices";

export const AppRoutes = memo(function AppRoutes() {
  const { user, loading } = useAuth();

  const { availableServices } = useServices(user?.role || "admin");
  const { routes } = useRouteConfig(availableServices);

  const routeElements = useMemo(
    () =>
      routes.map(({ id, path, Component, allowedRoles }) => (
        <Route
          key={id}
          path={path}
          element={
            <ProtectedRoute allowedRoles={allowedRoles}>
              <Component />
            </ProtectedRoute>
          }
        />
      )),
    [routes],
  );

  // Показываем загрузку только пока проверяем авторизацию
  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      {routeElements}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
});
