import { Panel, Flex, Typography, Button } from "@maxhub/max-ui";
import { useNavigate } from "react-router-dom";

export function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <Panel>
      <Flex
        direction="column"
        align="center"
        gap={20}
        style={{ padding: "40px" }}
      >
        <Typography.Headline>Доступ запрещен</Typography.Headline>
        <Typography.Title>
          У вас нет прав для доступа к этой странице
        </Typography.Title>
        <Button onClick={() => navigate("/")}>Вернуться на главную</Button>
      </Flex>
    </Panel>
  );
}
