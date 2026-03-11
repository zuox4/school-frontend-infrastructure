import { useState, useMemo } from "react";
import { Container, Flex, Typography } from "@maxhub/max-ui";

import CreatePassPanel from "./components/CreatePassPanel";
import Orders from "./components/Orders";
import BackButton from "./components/BackButton";

import { useOrders } from "./hooks/useOrders";
import CustomTabs from "./components/CustomTabs";

// Выносим константы из компонента

export default function StaffView() {
  const [activeTab, setActiveTab] = useState("create");
  // const [showScan, setShowScan] = useState(false);
  const { data: orders = [] } = useOrders("staff");

  // Мемоизируем статистику
  const stats = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((order) => order.status === "На согласовании")
        .length,
      approved: orders.filter((order) => order.status === "Согласовано").length,
    }),
    [orders],
  );

  return (
    <Container fullWidth>
      {/* Шапка с заголовком и кнопкой назад */}
      <Flex align="center" style={{ marginBottom: 24 }}>
        <BackButton />
        <Typography.Title style={{ fontWeight: "700", fontSize: "18px" }}>
          Пропуск на выход
        </Typography.Title>
      </Flex>

      {/* Табы с переключением между созданием и списком заявок */}
      <CustomTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        alert={!!stats.pending}
      />

      <Container fullWidth style={{ width: "100%" }}>
        <Flex direction="column" gap={30}>
          {activeTab === "create" && <CreatePassPanel role="staff" />}
          {activeTab === "orders" && <Orders role="staff" />}
        </Flex>
      </Container>
      {/* <div
        onClick={() => setShowScan(true)}
        style={{
          position: "fixed",
          right: "30px",
          bottom: 40,
          background: "#2eaa08",
          padding: "20px",
          borderRadius: "50%",
        }}
      >
        <QrCodeIcon size={30} />
      </div> */}
      {/* {showScan && (
        <ModalFromBottom
          component={<SimpleQRCode url="" />}
          closeModal={() => setShowScan(false)}
        />
      )} */}
    </Container>
  );
}
