import { useState } from "react";
import { Container, Flex, Typography } from "@maxhub/max-ui";

import BackButton from "./components/BackButton";

import CustomTabs from "./components/CustomTabs";
import Orders from "./components/Orders";
import CreatePassPanel from "./components/CreatePassPanel";
import PermanentOut from "./components/PermanentOut";

// Выносим константы из компонента

export default function StaffView() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <Container fullWidth style={{ paddingTop: "15px" }}>
      {/* Шапка с заголовком и кнопкой назад */}
      <Flex
        align="center"
        justify="center"
        style={{ marginBottom: "20px", position: "relative" }}
      >
        <div style={{ position: "absolute", left: 0 }}>
          <BackButton />
        </div>
        <Typography.Title
          style={{
            fontWeight: "700",
            fontSize: "18px",
            margin: 0,
          }}
        >
          Сервис пропусков
        </Typography.Title>
      </Flex>

      {/* Табы с переключением между созданием и списком заявок */}
      <CustomTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <Container fullWidth style={{ width: "100%", marginTop: "10px" }}>
        <Flex direction="column" gap={30}>
          {activeTab === "create" && <CreatePassPanel role="staff" />}
          {activeTab === "orders" && <Orders role="staff" />}
          {activeTab === "permanent" && <PermanentOut />}
        </Flex>
        {/* <Orders role="staff" /> */}
      </Container>
    </Container>
  );
}
