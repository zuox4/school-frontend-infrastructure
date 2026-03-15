import { CellSimple, Flex, Typography } from "@maxhub/max-ui";
import { Clock, Check, X } from "lucide-react";
import { useState } from "react";
import ModalFromBottom from "../../../components/ModalFromBottom";
import type { OrderStatus, OrderWithExtendStatus } from "../types/order";
import OrderInfo from "./OrderInfo";
import type { UserRole } from "../../../types/services";
const StatusIcon = ({ status }: { status: OrderStatus }) => {
  const iconProps = { size: 16 };

  switch (status) {
    case "На согласовании":
      return <Clock {...iconProps} color="#fa8c16" />;
    case "Согласовано":
      return <Check {...iconProps} color="#52c41a" />;
    case "Отменено":
      return <X {...iconProps} color="#999" />;
    default:
      return null;
  }
};
export default function OrderPassCart({
  roleType,
  order,
}: {
  roleType: UserRole;
  order: OrderWithExtendStatus;
}) {
  const [isOpenForm, setIsOpenForm] = useState(false);

  return (
    <div style={{ marginBottom: "8px" }}>
      <CellSimple
        onClick={() => setIsOpenForm(true)}
        title={
          <Flex align="center" justify="space-between">
            <Typography.Title style={{ fontSize: "16px", margin: 0 }}>
              {order.student_fullname}
            </Typography.Title>
            <StatusIcon status={order.status} />
          </Flex>
        }
        subtitle={
          <Flex direction="column" gap={4}>
            <Typography.Label style={{ color: "#666", fontSize: "13px" }}>
              {order.date_time_out}
            </Typography.Label>
            <Typography.Label style={{ color: "#6e6e6e", fontSize: "14px" }}>
              {order.reason}
            </Typography.Label>
          </Flex>
        }
      />

      {isOpenForm && (
        <ModalFromBottom
          key={order.id}
          component={
            <OrderInfo
              order={order}
              roleType={roleType}
              close={() => setIsOpenForm(false)}
            />
          }
          closeModal={() => setIsOpenForm(false)}
        />
      )}
    </div>
  );
}
