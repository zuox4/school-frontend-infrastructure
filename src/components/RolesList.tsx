import { Container, Flex, Typography } from "@maxhub/max-ui";
import { ROLES } from "../constants/roles";
import type { UserRole } from "../types/services";

export default function RolesList({ roles }: { roles: UserRole[] }) {
  return (
    <Container fullWidth>
      <Flex gap={10} justify="center">
        <Typography.Label style={{ color: "gray" }}>
          {roles.map((role, index) => (
            <span key={role}>
              {ROLES[role]}
              {index < roles.length - 1 && ", "}
            </span>
          ))}
        </Typography.Label>
      </Flex>
    </Container>
  );
}
