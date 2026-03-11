import { Container, Flex, Panel, Typography } from "@maxhub/max-ui";

import BackButton from "./components/BackButton";

import Orders from "./components/Orders";

export default function StudentView() {
  return (
    <Panel>
      <Container fullWidth>
        <Flex align="center" style={{ marginBottom: 24 }}>
          <BackButton />
          <Typography.Title style={{ fontWeight: "700", fontSize: "18px" }}>
            Пропуск на выход
          </Typography.Title>
        </Flex>
        <Orders role="student" />
      </Container>
    </Panel>
  );
}
