import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Panel,
  Button,
  Input,
  Flex,
  Typography,
} from "@maxhub/max-ui";
import BackButton from "../services/pass-service/components/BackButton";

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ username: email, password });
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Ошибка входа";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Panel>
      <Container fullWidth>
        <Flex direction="column" gap={20} style={{ padding: 20 }}>
          <Flex align="center">
            <BackButton />
            <Typography.Headline>Вход в систему</Typography.Headline>
          </Flex>

          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <Flex direction="column" gap={15}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && (
                <Typography.Title style={{ color: "red", textAlign: "center" }}>
                  {error}
                </Typography.Title>
              )}

              <Button type="submit" stretched disabled={loading}>
                {loading ? "Вход..." : "Войти"}
              </Button>
            </Flex>
          </form>
        </Flex>
      </Container>
    </Panel>
  );
};
