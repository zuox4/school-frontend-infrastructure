import {
  Button,
  Flex,
  Input,
  Panel,
  Textarea,
  Typography,
} from "@maxhub/max-ui";
import { useState, useEffect, useRef } from "react";

import type { Child } from "../types/child";
import { useCreateOrder } from "../hooks/useOrders";
import toast from "react-hot-toast";

export type DataForApi = {
  childList: Child[];
  dateTimeOut: string;
  reason: string;
};

export default function PassForm({
  dataPasses,
  closeModal,
  setDataPasses,
}: {
  dataPasses: Child[];
  closeModal: () => void;
  setDataPasses: (value: []) => void;
}) {
  // Получаем текущую дату и время один раз
  const getCurrentDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    return { currentDate, currentTime };
  };

  const { currentDate, currentTime } = getCurrentDateTime();

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedTime, setSelectedTime] = useState(currentTime);
  const [cause, setCause] = useState("");

  const createOrder = useCreateOrder();

  // Используем ref для отслеживания первого рендера
  const isFirstRender = useRef(true);

  // Исправленный useEffect без синхронного setState
  useEffect(() => {
    // Пропускаем первый рендер
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Обновляем время только если дата изменилась на сегодняшнюю
    if (selectedDate === currentDate) {
      // Используем setTimeout для отложенного обновления
      const timeoutId = setTimeout(() => {
        const { currentTime: nowTime } = getCurrentDateTime();
        setSelectedTime(nowTime);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [selectedDate, currentDate]);

  const handleConfirmPassData = () => {
    if (!cause) {
      toast.error("Укажите причину выхода");
      return;
    }
    sendDataToServer();
  };

  const sendDataToServer = async () => {
    try {
      const [year, month, day] = selectedDate.split("-").map(Number);
      const [hours, minutes] = selectedTime.split(":").map(Number);

      const dateTimeOut = new Date(year, month - 1, day, hours, minutes, 0);

      if (isNaN(dateTimeOut.getTime())) {
        toast.error("Ошибка в формате даты или времени");
        return;
      }

      const now = new Date();
      if (dateTimeOut < now) {
        toast.error("Нельзя выбрать прошедшую дату или время");
        return;
      }

      const data: DataForApi = {
        childList: dataPasses,
        dateTimeOut: formatDateTimeForApi(dateTimeOut),
        reason: cause,
      };

      await toast.promise(
        createOrder.mutateAsync(data),
        {
          loading: "Создание пропуска...",
          success: <b>Пропуск успешно создан! 👏</b>,
          error: <b>Ошибка при создании пропуска</b>,
        },
        {
          position: "bottom-center",
        },
      );

      setDataPasses([]);
      closeModal();
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      toast.error("Ошибка при создании пропуска");
    }
  };

  const formatDateTimeForApi = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Функция для проверки валидности времени
  const isTimeValid = () => {
    if (selectedDate !== currentDate) return true;

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const selectedDateTime = new Date();
    selectedDateTime.setHours(hours, minutes, 0);
    const now = new Date();
    return selectedDateTime >= now;
  };

  return (
    <Flex direction="column" align="center">
      <Typography.Headline style={{ color: "white" }}>
        Подтвердить выход
      </Typography.Headline>
      <Panel
        style={{
          width: "100%",
          padding: "0",
          gap: "10px",
          background: "0",
        }}
      >
        <Typography.Title style={{ textAlign: "center", marginTop: "10px" }}>
          Укажите данные для выхода
        </Typography.Title>

        <>
          <Typography.Action>Дата выхода</Typography.Action>
          <Input
            type="date"
            value={selectedDate}
            min={currentDate}
            mode="primary"
            onChange={(e) => setSelectedDate(e.target.value)}
            disabled={createOrder.isPending}
          />

          <Typography.Action>Время выхода</Typography.Action>
          <Input
            type="time"
            value={selectedTime}
            mode="primary"
            onChange={(e) => setSelectedTime(e.target.value)}
            disabled={createOrder.isPending}
            style={
              !isTimeValid() && selectedDate === currentDate
                ? { borderColor: "#ff4d4f" }
                : {}
            }
          />
          {!isTimeValid() && selectedDate === currentDate && (
            <Typography.Title
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "-8px" }}
            >
              Нельзя выбрать прошедшее время
            </Typography.Title>
          )}

          <Typography.Action>Причина выхода</Typography.Action>
          <Textarea
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            mode="primary"
            placeholder="Опишите причину отсутствия..."
            disabled={createOrder.isPending}
          />
        </>

        {!createOrder.isPending && (
          <Button
            loading={createOrder.isPending}
            onClick={handleConfirmPassData}
            disabled={
              createOrder.isPending ||
              (!isTimeValid() && selectedDate === currentDate)
            }
          >
            Подтвердить
          </Button>
        )}
      </Panel>
    </Flex>
  );
}
