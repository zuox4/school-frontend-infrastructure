import { CellHeader, CellList, Container, Typography } from "@maxhub/max-ui";
import { useMemo } from "react";
import OrderPassCart from "./OrderPassCart";
import type { OrderWithExtendStatus, OrderStatus } from "../types/order";
import type { UserRole } from "../../../types/services";
import { useOrders } from "../hooks/useOrders";
import { SkeletonCellList } from "./CreatePassPanel";

// Конфигурация статусов для отображения
const STATUS_CONFIG: Record<OrderStatus, { title: string; color: string }> = {
  "На согласовании": { title: "На согласовании", color: "#fa8c16" },
  Согласовано: { title: "Согласованные", color: "#52c41a" },
  Отклонено: { title: "Отклонённые", color: "#ff4d4f" },
  Отменено: { title: "Отменённые", color: "#999" },
};

// Порядок отображения статусов
const STATUS_ORDER: OrderStatus[] = [
  "На согласовании",
  "Согласовано",
  "Отклонено",
  "Отменено",
];

// Компонент-заглушка для загрузки

export default function Orders({ role }: { role: UserRole }) {
  const { data: orders = [], isLoading } = useOrders(role);

  // Группируем заявки по статусам
  const groupedOrders = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        if (!acc[order.status]) {
          acc[order.status] = [];
        }
        acc[order.status].push(order);
        return acc;
      },
      {} as Record<OrderStatus, OrderWithExtendStatus[]>,
    );
  }, [orders]);

  // Проверяем, есть ли активные заявки (на рассмотрении)

  // Фильтруем только те статусы, по которым есть заявки
  const availableStatuses = STATUS_ORDER.filter(
    (status) => groupedOrders[status]?.length > 0,
  );

  // Показываем заглушку во время загрузки
  if (isLoading) {
    return (
      <Container style={{ width: "100%" }} fullWidth>
        <Typography.Label
          style={{
            marginBottom: "16px",
            color: "#666",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          Ближайшие пропуска
        </Typography.Label>
        <SkeletonCellList />
      </Container>
    );
  }

  // Если заявок нет вообще
  if (orders.length === 0) {
    return (
      <Container fullWidth style={{ width: "100%" }}>
        <Typography.Label
          style={{
            marginBottom: "16px",
            color: "#666",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          Ближайшие пропуска
        </Typography.Label>
        <Typography.Title style={{ color: "#999", marginBottom: 8 }}>
          Нет заявок
        </Typography.Title>
        <Typography.Action style={{ color: "#666" }}>
          Здесь будут отображаться все созданные заявки
        </Typography.Action>
      </Container>
    );
  }

  return (
    <Container fullWidth style={{ width: "100%" }}>
      {/* Заголовок "Активные заявки" только если есть заявки на рассмотрении */}
      <Typography.Label
        style={{
          marginBottom: "16px",
          color: "#666",
          fontSize: "15px",
          fontWeight: "500",
        }}
      >
        Ближайшие пропуска
      </Typography.Label>
      {/* Единый CellList со всеми заявками */}
      <CellList style={{ padding: 0 }} mode="island" filled>
        {availableStatuses.map((status) => (
          <div
            key={status}
            style={{
              marginBottom:
                status !== availableStatuses[availableStatuses.length - 1]
                  ? "8px"
                  : 0,
            }}
          >
            <CellHeader
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                backgroundColor: "#575757",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: STATUS_CONFIG[status].color,
                }}
              />
              <span style={{ fontWeight: "600", color: "#ada7a7" }}>
                {STATUS_CONFIG[status].title}
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  backgroundColor: STATUS_CONFIG[status].color + "20",
                  color: STATUS_CONFIG[status].color,
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                {groupedOrders[status].length}
              </span>
            </CellHeader>
            {groupedOrders[status].map((order) => (
              <OrderPassCart key={order.id} order={order} roleType={role} />
            ))}
          </div>
        ))}
      </CellList>
    </Container>
  );
}
