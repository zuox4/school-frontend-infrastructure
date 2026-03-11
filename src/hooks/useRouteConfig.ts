import { useMemo } from "react";
import type { Service } from "../types/services";

export function useRouteConfig(availableServices: Service[]) {
  const routes = useMemo(() => {
    return availableServices.map((service) => ({
      id: service.id,
      path: service.path,
      Component: service.component,
      allowedRoles: service.allowedRoles,
    }));
  }, [availableServices]);

  return { routes };
}
