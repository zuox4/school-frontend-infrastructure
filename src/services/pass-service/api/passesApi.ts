// api/passesApi.ts

import { api } from "../../../api/axios";

import type { DataForApi } from "../components/PassForm";

// Типы для заявок
export interface Order {
  id: number;
  student_fullname: string;
  date_time_out: string;
  reason: string;
  status: "На согласовании" | "Согласовано" | "Отменено";
  student_id: string;
  created_at?: string;
  updated_at?: string;
  approved_by?: string;
  comment?: string;
}

export interface CreateOrderData {
  childName: string;
  dateTime: string;
  reason: string;
}

export interface OrderStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  cancelled: number;
}

// API методы
export const passesService = {
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get(`/class-leader/pass-tickets`);
    return response.data;
  },

  //   // Получить конкретную заявку
  //   getOrder: async (id: number): Promise<Order> => {
  //     const response = await api.get(`/orders/${id}`);
  //     return response.data;
  //   },

  // Создать заявку
  createOrder: async (data: DataForApi): Promise<Order> => {
    const response = await api.post("/pass-ticket/create", data);
    return response.data;
  },

  // Подтвердить заявку
  approveOrder: async (
    id: number,
  ): Promise<{ message: string; order: Order }> => {
    const response = await api.patch(`/passes/orders/${id}/approve`);
    return response.data;
  },

  // Отменить заявку
  cancelOrder: async (
    id: number,
  ): Promise<{ message: string; order: Order }> => {
    const response = await api.put(`/pass-ticket/${id}/cancel`);
    return response.data;
  },
};

export interface Child {
  external_id: string;
  fullname: string;
  class_unit_name: string;
  photo?: string;
}

export interface ChildWithOrders extends Child {
  ordersCount?: number;
  lastOrderDate?: string;
}

export interface ClassInfo {
  id: string;
  name: string; // например "4А", "4Б"
  teacherId: string;
  teacherName: string;
  studentsCount: number;
}

export interface TeacherChildrenResponse {
  classes: ClassInfo[];
  children: Child[];
}

// API методы для работы с детьми
export const childrenService = {
  getStudents: async (): Promise<Child[]> => {
    const response = await api.get(`/class-leader/students`);
    return response.data;
  },
};
