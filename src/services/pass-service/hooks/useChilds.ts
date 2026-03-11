import type { UserRole } from "../../../types/services";

export const childrenQueryKeys = {
  all: ["children"] as const,
  my: (role: UserRole) => [...childrenQueryKeys.all, "my", role] as const,
};
