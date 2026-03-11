import type { Service } from "../types/services";
import { lazy } from "react";

export const servicesConfig: Service[] = [
  {
    id: "pass",
    name: "Система пропусков",
    icon: "🎫",
    path: "/pass-out",
    allowedRoles: ["student", "staff", "parent"],
    component: lazy(() => import("./pass-service/PassOutServiceApp")),
    description: "Оформление пропусков",
  },

  {
    id: "markbook",
    name: "Зачетная книжка",
    icon: "📚",
    path: "/markbook",
    allowedRoles: ["student"],
    component: lazy(() => import("./markbook-service/MarkBookServiceApp")),
    description: "Зачетная книжка учащегося профильно класса",
  },
];
