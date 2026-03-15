import { Button, Flex, Typography } from "@maxhub/max-ui";
import { useMemo } from "react";
import type { OrderWithExtendStatus, OrderStatus } from "../types/order";
import type { UserRole } from "../../../types/services";

import { useApproveOrder, useCancelOrder } from "../hooks/useOrders";
import toast from "react-hot-toast";

const STATUS_STYLES: Record<OrderStatus, { bg: string; color: string }> = {
  "На согласовании": { bg: "#fafafa", color: "#666" },
  Согласовано: { bg: "#f6ffed", color: "#52c41a" },
  Отклонено: { bg: "#fff2f0", color: "#ff4d4f" },
  Отменено: { bg: "#f5f5f5", color: "#999" },
};

const ACTION_BUTTONS: Partial<
  Record<
    UserRole,
    Partial<Record<OrderStatus, { text: string; action: string }>>
  >
> = {
  parent: {
    "На согласовании": { text: "Отменить", action: "cancel" },
  },
  staff: {
    "На согласовании": { text: "Подтвердить", action: "approve" },

    Отклонено: { text: "Подтвердить", action: "approve" },
    Согласовано: { text: "Отменить", action: "cancel" },
  },
};

// Компонент для строки информации
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Flex gap={8}>
    <Typography.Label style={{ color: "#999", width: "80px" }}>
      {label}:
    </Typography.Label>
    <Typography.Label>{value}</Typography.Label>
  </Flex>
);

// Компонент бейджа статуса
const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const style = STATUS_STYLES[status];

  return (
    <div
      style={{
        padding: "1px 8px",
        background: style.bg,
        borderRadius: "14px",
        fontSize: "12px",
        color: style.color,
      }}
    >
      {status}
    </div>
  );
};

export default function OrderInfo({
  order,
  roleType,
  close,
}: {
  order: OrderWithExtendStatus;
  roleType: UserRole;
  close: () => void;
}) {
  // Закрываем модалку при успехе

  // Получаем конфигурацию действия для текущей роли и статуса
  const actionConfig = useMemo(() => {
    return ACTION_BUTTONS[roleType]?.[order.status];
  }, [roleType, order.status]);
  const approveMutation = useApproveOrder();
  const cancelMutation = useCancelOrder();
  console.log(order.date_time_out);
  const handleAction = async () => {
    if (!actionConfig) return;

    // Здесь ваша логика обработки действий
    console.log(`${actionConfig.action} order ${order.id}`);

    switch (actionConfig.action) {
      case "cancel":
        close();
        await toast.promise(
          cancelMutation.mutateAsync(order.id),
          {
            loading: "Отменяем заявку...",
            success: <b>Отменено!</b>,
            error: <b>Ошибка при отмене пропуска</b>,
          },
          {
            position: "bottom-center",
          },
        );
        break;
      case "approve":
        close();
        await toast.promise(
          approveMutation.mutateAsync(order.id),
          {
            loading: "Согласование пропуска...",
            success: <b>Пропуск успешно согласован! 👏</b>,
            error: <b>Ошибка при создании пропуска</b>,
          },
          {
            position: "bottom-center",
          },
        );
        break;
      case "delete":
        break;
    }

    // Можно добавить switch для разных действий
  };
  return (
    <Flex direction="column" gap={16} style={{ width: "100%" }}>
      <Typography.Headline>Детали пропуска</Typography.Headline>

      <Flex justify="space-between" align="center" gap={10}>
        <Typography.Title style={{ fontSize: "18px" }}>
          {order.student_fullname}
        </Typography.Title>
        <StatusBadge status={order.status} />
      </Flex>

      <Flex direction="column" gap={12}>
        <InfoRow label="Дата" value={order.date_time_out} />
        <InfoRow label="Причина" value={order.reason} />
      </Flex>

      {/* Кнопка действия если есть */}

      {actionConfig && !approveMutation.isPending && (
        <Button
          disabled={approveMutation.isPending}
          style={{ width: "100%", marginTop: "8px" }}
          loading={approveMutation.isPending}
          onClick={handleAction}
        >
          {actionConfig.text}
        </Button>
      )}
    </Flex>
  );
}
