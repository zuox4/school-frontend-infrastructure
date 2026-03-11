export type OrderStatus =
  | "На согласовании"
  | "Согласовано"
  | "Отклонено"
  | "Отменено";

export type OrderWithExtendStatus = {
  id: number;
  childName: string;
  dateTimeOut: string;
  reason: string;
  status: OrderStatus;
};
