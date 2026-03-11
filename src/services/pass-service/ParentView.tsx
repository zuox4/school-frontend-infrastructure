import { Panel, Typography, Flex, Container } from "@maxhub/max-ui";
import CreatePassPanel from "./components/CreatePassPanel";
import { useState } from "react";
import { Info } from "lucide-react";
import BackButton from "./components/BackButton";
import Orders from "./components/Orders";
import CustomTabs from "./components/CustomTabs";

export default function ParentView() {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [activeTab, setActiveTab] = useState("create");

  return (
    <Panel>
      <Container fullWidth>
        <Flex direction="column" gap={20}>
          <Flex style={{ position: "relative", width: "100%" }} align="center">
            <BackButton />
            <Typography.Title style={{ fontWeight: "700", fontSize: "18px" }}>
              Пропуск на выход
            </Typography.Title>
            <Info
              size={18}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: 0,
                right: 0,
              }}
              onClick={() => setIsOpenInfo((prev) => !prev)}
            />
          </Flex>

          {isOpenInfo && <Instruction />}

          <CustomTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <Container fullWidth style={{ width: "100%" }}>
            <Flex direction="column" gap={30}>
              {activeTab === "create" && <CreatePassPanel role="parent" />}
              {activeTab === "orders" && <Orders role="parent" />}
            </Flex>
          </Container>
        </Flex>
      </Container>
    </Panel>
  );
}

const Instruction = () => {
  return (
    <Container
      style={{
        borderRadius: "12px",
        padding: "16px",
        border: "1px solid #e9ecef",
      }}
    >
      <Typography.Title style={{ fontSize: "16px", marginBottom: "12px" }}>
        Как выписать пропуск:
      </Typography.Title>
      <Typography.Label style={{ color: "#939597", lineHeight: "1.7" }}>
        1. Выберите ребенка из списка ниже
        <br />
        2. Укажите дату и время выхода
        <br />
        3. Опишите причину отсутствия
        <br />
        4. Нажмите "Подтвердить" для отправки заявки
        <br />
        После отправки классный руководитель должен подтвердить заявку.
      </Typography.Label>
    </Container>
  );
};
