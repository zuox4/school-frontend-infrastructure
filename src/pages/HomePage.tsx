import { Flex, Panel, Typography, Container, Avatar } from "@maxhub/max-ui";

import { LoadingFallback } from "../components/LoadingFallback";
import { ServicesList } from "../components/ServicesList";
import RolesList from "../components/RolesList";
import { useAuth } from "../hooks/useAuth";

export function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingFallback />;
  }
  console.log(user);
  if (!user) return null;

  if (!user) {
    return (
      <Panel>
        <Typography.Title>Пользователь не найден</Typography.Title>
      </Panel>
    );
  }

  return (
    <Panel>
      <Flex direction="column" align="center" gap={20}>
        <Container fullWidth>
          <Flex gap={10} direction="column" align="center">
            <Avatar.Container size={100}>
              <Avatar.Text gradient="green">
                {user.fullName
                  .split(" ")
                  .slice(1)
                  .map((n: string) => n[0])
                  .join("")}
              </Avatar.Text>
            </Avatar.Container>
            <Typography.Headline
              style={{ fontWeight: "300", fontSize: "22px" }}
            >
              Личный кабинет
            </Typography.Headline>
            <Typography.Title style={{ fontWeight: "700", fontSize: "20px" }}>
              {user.fullName}
            </Typography.Title>
            <RolesList roles={user.roles} />
          </Flex>
        </Container>

        <ServicesList role={user.role} />

        {/* <Button onClick={() => logout()}>Выйти</Button> */}
      </Flex>
    </Panel>
  );
}
