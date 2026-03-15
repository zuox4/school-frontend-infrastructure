export type OrderStatus =
  | "На согласовании"
  | "Согласовано"
  | "Отклонено"
  | "Отменено";

export type OrderWithExtendStatus = {
  id: number;
  student_fullname: string;
  date_time_out: string;
  reason: string;
  status: OrderStatus;
};
