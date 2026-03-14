import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { Panel, Button, Container, Flex, Typography } from "@maxhub/max-ui";
import LoaderPreLogin from "../components/LoaderPreLogin";
import { OwnServices } from "../components/ServicesList";
import type { DecodedToken, User } from "../types/auth";
import { jwtDecode } from "jwt-decode";

export const LoginPage = () => {
  const { setUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isAutoLogging, setIsAutoLogging] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  // Определяем, запущено ли приложение в Telegram
  const initData = window?.WebApp?.initData;
  const isRealMaxApp = !!initData;

  // Логика авто-входа через Telegram
  useEffect(() => {
    const tryTelegramAuth = async () => {
      if (!isRealMaxApp) {
        return;
      }

      setIsAutoLogging(true);
      setError("");

      try {
        const response = await api.post("/auth/max-login", {
          initData,
        });
        const { access_token, refreshToken } = response.data;
        console.log(access_token);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refreshToken);
        const decoded = jwtDecode<DecodedToken>(access_token);
        const user: User = {
          id: decoded.sub,
          email: decoded.email,
          roles: decoded.roles,
          role: decoded.role,
          fullName: decoded.fullname,
        };
        setUser(user);

        // setUser({ id, fullName, roles,  schoolId });
        setAuthSuccess(true);
        navigate("/");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Auth failed:", err);
        // При любой ошибке просто показываем общие сервисы
        setError("auth_failed");
      } finally {
        setIsAutoLogging(false);
        console.log(2);
      }
    };

    tryTelegramAuth();
  }, [navigate, setUser, isRealMaxApp, initData]);

  // Если идет автологин - показываем загрузку
  if (isAutoLogging || authLoading) {
    return (
      <Panel className="flex center">
        <LoaderPreLogin />
      </Panel>
    );
  }

  // Если авторизация успешна - редирект уже произошел в useEffect
  // Этот блок на всякий случай
  if (authSuccess) {
    return null;
  }

  // В любом случае (Telegram или браузер) показываем общие сервисы
  return (
    <Container fullWidth>
      <Flex direction="column" align="center" gap={30} style={{ padding: 20 }}>
        <OwnServices />

        {/* Показываем кнопку входа только в браузере */}
        {!isRealMaxApp && (
          <Flex
            direction="column"
            gap={15}
            style={{ width: "100%", maxWidth: 300 }}
          >
            <Typography.Title style={{ textAlign: "center" }}>
              Для доступа к полному функционалу необходимо авторизоваться
            </Typography.Title>

            <Button stretched onClick={() => navigate("/login-form")}>
              Войти в систему через макс
            </Button>
          </Flex>
        )}

        {/* В Telegram показываем только сообщение (опционально) */}
        {isRealMaxApp && error === "auth_failed" && (
          <Typography.Title
            style={{ textAlign: "center", color: "#666", marginTop: 20 }}
          >
            Авторизация не пройдена. Доступны только общие сервисы.
          </Typography.Title>
        )}
      </Flex>
    </Container>
  );
};
