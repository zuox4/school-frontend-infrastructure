import {
  CellHeader,
  CellList,
  CellSimple,
  Container,
  Typography,
} from "@maxhub/max-ui";
import { useNavigate } from "react-router-dom";

import type { UserRole } from "../types/services";
import { useServices } from "../hooks/useServices";

interface ServicesListProps {
  role: UserRole; // Компонент принимает роли и сам фильтрует сервисы
}

export function ServicesList({ role }: ServicesListProps) {
  const navigate = useNavigate();
  const { availableServices } = useServices(role);
  const roleDict: Record<UserRole, string> = {
    staff: "сотрудников",
    parent: "родителей",
    student: "учеников",
    admin: "Админа",
  };
  if (availableServices.length === 0) {
    return (
      <Container>
        <Typography.Title>Нет доступных сервисов</Typography.Title>
      </Container>
    );
  }

  return (
    <CellList
      key={role}
      header={<CellHeader>Для {roleDict[role]}</CellHeader>}
      style={{ padding: "0" }}
    >
      {availableServices
        .filter((service) => service.allowedRoles.includes(role))
        .map((service) => (
          <CellSimple
            before=<>{service.icon}</>
            showChevron
            key={service.id}
            onClick={() => navigate(service.path, { state: { role: role } })}
            style={{ color: "white", fontWeight: "400" }}
            title={service.name}
            subtitle={service.description}
          />
        ))}
    </CellList>
  );
}

export const OwnServices = () => {
  return (
    <Container fullWidth style={{ width: "100%" }}>
      <CellList
        filled
        mode="island"
        style={{ padding: 0 }}
        header={<CellHeader>Обшие</CellHeader>}
      >
        <CellSimple>Сайт школы</CellSimple>
        <CellSimple>Расписание</CellSimple>
        <CellSimple>Контакты</CellSimple>
      </CellList>
    </Container>
  );
};
