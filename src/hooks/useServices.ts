import { useMemo } from "react";
import { servicesConfig } from "../services/services";
import type { UserRole, Service } from "../types/services";

export function useServices(userRole: UserRole) {
  const availableServices = useMemo((): Service[] => {
    return servicesConfig.filter((service) =>
      service.allowedRoles.includes(userRole),
    );
  }, [userRole]);

  const getServiceByPath = useMemo(
    () => (path: string) => servicesConfig.find((s) => s.path === path),
    [],
  );

  const checkAccess = useMemo(
    () => (serviceId: string) => {
      const service = servicesConfig.find((s) => s.id === serviceId);
      return service?.allowedRoles.includes(userRole) ?? false;
    },
    [userRole],
  );

  return {
    availableServices,
    getServiceByPath,
    checkAccess,
    allServices: servicesConfig,
  };
}
