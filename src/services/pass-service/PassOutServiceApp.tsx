import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import ParentView from "./ParentView";
import StudentView from "./StudentView";
import StaffView from "./StaffView";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

// Тип для роли
type UserRole = "parent" | "student" | "staff";

// Тип для состояния навигации
interface LocationState {
  role: UserRole;
  // другие поля, если есть
}

export default function PassOutServiceApp() {
  const { state } = useLocation();

  // Приводим state к нужному типу
  const locationState = state as LocationState | null;
  const role = locationState?.role;

  const renderViewByRole = (role?: UserRole) => {
    switch (role) {
      case "parent":
        return <ParentView />;
      case "student":
        return <StudentView />;
      case "staff":
        return <StaffView />;
      default:
        console.warn("Unknown role:", role);
        return null;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      {renderViewByRole(role)}
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
}
