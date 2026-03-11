import { Flex } from "@maxhub/max-ui";

export type TabType = "create" | "list";

// Выносим компонент табов отдельно
const ViewTabs = ({
  active,
  onChange,
  stats,
}: {
  active: TabType;
  onChange: (tab: TabType) => void;
  stats: { total: number; pending: number; approved: number };
}) => (
  <Flex
    style={{
      backgroundColor: "#3a3a3a",
      padding: 4,
      borderRadius: 10,
      marginBottom: 20,
      width: "100%",
    }}
  >
    <button
      onClick={() => onChange("create")}
      style={{
        flex: 1,
        padding: "10px 16px",
        border: "none",
        background: active === "create" ? "#7491cf" : "transparent",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: active === "create" ? 600 : 400,
        color: active === "create" ? "#ffffff" : "#666",
        boxShadow: active === "create" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
        transition: "all 0.2s",
      }}
    >
      Создать пропуск
    </button>
    <button
      onClick={() => onChange("list")}
      style={{
        flex: 1,
        padding: "10px 16px",
        border: "none",
        background: active === "list" ? "#7491cf" : "transparent",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: active === "list" ? 600 : 400,
        color: active === "list" ? "#ffffff" : "#666",
        boxShadow: active === "list" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      📋 Все заявки
      <span
        style={{
          backgroundColor: active === "list" ? "#007AFF" : "#e0e0e0",
          color: active === "list" ? "#fff" : "#666",
          padding: "2px 8px",
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {stats.pending}
      </span>
    </button>
  </Flex>
);
export default ViewTabs;
