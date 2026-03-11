import { Flex, Typography } from "@maxhub/max-ui";
import React from "react";
import { AlertCircle, FilePlus, ListTodo } from "lucide-react";

export default function CustomTabs({
  activeTab,
  onTabChange,
  alert,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  alert?: boolean;
}) {
  return (
    <Flex
      gap={12}
      justify="center"
      style={{
        paddingBottom: "8px",
        width: "100%",
      }}
    >
      <TabButton
        active={activeTab === "create"}
        onClick={() => onTabChange("create")}
        icon={<FilePlus size={18} />}
        label="Создать пропуск"
      />
      <TabButton
        active={activeTab === "orders"}
        onClick={() => onTabChange("orders")}
        icon={<ListTodo size={18} />}
        label="Мои заявки"
        alert={alert}
      />
    </Flex>
  );
}

// Компонент для кастомной кнопки таба
const TabButton = ({
  active,
  onClick,
  icon,
  label,
  alert,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  alert?: boolean;
}) => (
  <Flex
    onClick={onClick}
    align="center"
    gap={8}
    style={{
      padding: "8px 16px",
      cursor: "pointer",
      borderBottom: active ? "2px solid #0066CC" : "2px solid transparent",
      color: active ? "#0066CC" : "#939597",
      fontWeight: active ? 500 : 400,
      transition: "all 0.2s ease",
      position: "relative",
    }}
  >
    {icon}
    <Typography.Title style={{ fontSize: "14px" }}>{label}</Typography.Title>
    {alert && <AlertCircle color="red" size={15} />}
  </Flex>
);
