import {
  CellHeader,
  CellList,
  CellSimple,
  Container,
  Flex,
  Typography,
} from "@maxhub/max-ui";
import { useNavigate } from "react-router-dom";

import type { UserRole } from "../types/services";
import { useServices } from "../hooks/useServices";

interface ServicesListProps {
  roles: UserRole[]; // Компонент принимает роли и сам фильтрует сервисы
}

export function ServicesList({ roles }: ServicesListProps) {
  const navigate = useNavigate();
  const { availableServices } = useServices(roles);
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
    <Flex direction="column" gap={20} style={{ width: "100%" }}>
      {roles.map((role) => (
        <CellList
          key={role}
          filled
          header={<CellHeader>Для {roleDict[role]}</CellHeader>}
          mode="island"
          style={{ padding: 0 }}
        >
          {availableServices
            .filter((service) => service.allowedRoles.includes(role))
            .map((service) => (
              <CellSimple
                before={service.icon}
                showChevron
                key={service.id}
                onClick={() =>
                  navigate(service.path, { state: { role: role } })
                }
                style={{ color: "white", fontWeight: "400" }}
              >
                {service.name}
              </CellSimple>
            ))}
        </CellList>
      ))}
      <OwnServices />
    </Flex>
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
