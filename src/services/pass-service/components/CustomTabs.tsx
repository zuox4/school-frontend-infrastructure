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
        label="Создать"
      />
      <TabButton
        active={activeTab === "permanent"}
        onClick={() => onTabChange("permanent")}
        icon={<FilePlus size={18} />}
        label="Самовыход"
      />
      <TabButton
        active={activeTab === "orders"}
        onClick={() => onTabChange("orders")}
        icon={<ListTodo size={18} />}
        label="Заявки"
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
      padding: "5px 15px",
      cursor: "pointer",
      height: "35px",
      color: active ? "#ffffff" : "#999999",
      fontWeight: active ? 500 : 400,
      transition: "all 0.2s ease",
      position: "relative",
      background: active
        ? "rgba(6, 172, 0, 0.16)"
        : "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
      }
    }}
  >
    {icon}
    <Typography.Title style={{ fontSize: "14px", margin: 0 }}>
      {label}
    </Typography.Title>
    {alert && <AlertCircle color="red" size={15} />}
  </Flex>
);
