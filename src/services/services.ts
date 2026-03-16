import type { Service } from "../types/services";
import { lazy } from "react";

export const servicesConfig: Service[] = [
  {
    id: "pass",
    name: "Система пропусков",
    icon: "🎫",
    path: "/pass-out",
    allowedRoles: ["staff"],
    component: lazy(() => import("./pass-service/PassOutServiceApp")),
    description: "Оформление пропусков",
  },
  {
    id: "apcents",
    name: "Отсутствующие",
    icon: "🚫",
    path: "/apcents",
    allowedRoles: ["staff"],
    component: lazy(() => import("./contacts-service/ContactsServiceApp")),
    description: "Отсутствующие сегодня",
  },
  {
    id: "markbook",
    name: "Зачетная книжка",
    icon: "📚",
    path: "/markbook",
    allowedRoles: ["student", "staff"],
    component: lazy(() => import("./markbook-service/MarkBookServiceApp")),
    description: "Зачетная книжка учащегося",
  },
  {
    id: "contacts",
    name: "Контакты",
    icon: "📞",
    path: "/contacts",
    allowedRoles: ["staff"],
    component: lazy(() => import("./contacts-service/ContactsServiceApp")),
    description: "Поиск контактов сотрудника",
  },
];
