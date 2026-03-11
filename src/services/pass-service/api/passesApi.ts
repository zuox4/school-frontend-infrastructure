// api/passesApi.ts

import { api } from "../../../api/axios";
import type { UserRole } from "../../../types/services";
import type { DataForApi } from "../components/PassForm";

// Типы для заявок
export interface Order {
  id: number;
  childName: string;
  dateTimeOut: string;
  reason: string;
  status: "На согласовании" | "Согласовано" | "Отменено";
  userId: string;
  createdAt?: string;
  updatedAt?: string;
  approvedBy?: string;
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
  getOrders: async (type: UserRole): Promise<Order[]> => {
    const response = await api.get(`/passes/orders/${type}`);
    return response.data;
  },

  //   // Получить конкретную заявку
  //   getOrder: async (id: number): Promise<Order> => {
  //     const response = await api.get(`/orders/${id}`);
  //     return response.data;
  //   },

  // Создать заявку
  createOrder: async (data: DataForApi): Promise<Order> => {
    const response = await api.post("/passes/orders", data);
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
    const response = await api.post(`/passes/orders/${id}/cancel`);
    return response.data;
  },
};

export interface Child {
  id: number;
  name: string;
  class: string;
  parentId?: string;
  classTeacher?: string; // ID классного руководителя
  birthDate?: string;
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
  /**
   * Получить детей текущего пользователя
   * Для родителя - своих детей
   * Для учителя - детей из его классов
   * Для администратора - всех детей
   */
  getMyChildren: async (role: UserRole): Promise<Child[]> => {
    const response = await api.get(`/passes/children/${role}`);
    return response.data;
  },

  /**
   * Получить конкретного ребенка по ID
   */
  // getChild: async (id: number): Promise<Child> => {
  //   const response = await api.get(`/passes/children/${id}`);
  //   return response.data;
  // },

  /**
   * Получить детей для создания заявки (только для родителя)
   * Возвращает только детей текущего родителя
   */
  // getChildrenForOrder: async (): Promise<Child[]> => {
  //   const response = await api.get("/passes/children/for-order");
  //   return response.data;
  // },

  /**
  //  * Получить информацию о классе
  //  */
  // getClassInfo: async (className: string): Promise<ClassInfo> => {
  //   const response = await api.get(`/passes/classes/${className}`);
  //   return response.data;
  // },

  /**
   * Получить детей в классе (для учителя)
   */
  getChildrenByClass: async (className: string): Promise<Child[]> => {
    const response = await api.get(`/passes/classes/${className}/children`);
    return response.data;
  },
};
