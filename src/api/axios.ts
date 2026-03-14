import axios from "axios";

// Временная заглушка для Telegram WebApp
declare global {
  interface Window {
    WebApp?: {
      initData: string;
      initDataUnsafe?: {
        user?: {
          id: number;
          first_name?: string;
          last_name?: string;
          username?: string;
          language_code?: string;
          is_premium?: boolean;
        };
        chat?: {
          id: number;
          type?: string;
        };
        start_param?: string;
      };
      ready: () => void;
      expand: () => void;
      requestFullscreen: () => Promise<void>; // requestFullscreen возвращает Promise
      exitFullscreen: () => Promise<void>;
      isFullscreen: boolean;
      isVersionAtLeast: (version: string) => boolean; // isVersionAtLeast возвращает boolean
      version: string;
      platform: string;
      colorScheme: "light" | "dark";
      themeParams: {
        bg_color?: string;
        text_color?: string;
        hint_color?: string;
        link_color?: string;
        button_color?: string;
        button_text_color?: string;
      };
      setHeaderColor: (color: string) => void;
      setBackgroundColor: (color: string) => void;
      enableClosingConfirmation: () => void;
      disableClosingConfirmation: () => void;
      onEvent: (eventType: string, callback: () => void) => void;
      offEvent: (eventType: string, callback: () => void) => void;
      sendData: (data: string) => void;
      close: () => void;
      disableVerticalSwipes: () => void;
      setIsFullscreen: (value: boolean) => void;
      HapticFeedback: {
        notificationOccurred: (value: string) => void;
      };
    };
  }
}

const API_URL = "https://drowsily-famous-screamer.cloudpub.ru";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  console.log(token);

  // Достаем maxId из Max (если мы в нем) или из localStorage
  const tgMaxId = window.WebApp?.initDataUnsafe?.user?.id;
  console.log(tgMaxId);
  const savedMaxId = localStorage.getItem("maxId");
  const currentMaxId = tgMaxId || savedMaxId;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Прокидываем maxId в заголовке для идентификации бэкендом
  if (currentMaxId) {
    config.headers["X-Max-Id"] = currentMaxId.toString();
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthRequest =
      originalRequest.url?.includes("/auth/me") ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/max-login");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token");

        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });
        const { access_token } = response.data;

        localStorage.setItem("access_token", access_token);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

// Passes microfrontend endpoints
export const passesAPI = {
  // Заявки на пропуск
  getUser: () => api.get("/passes/users"),
  getOrders: () => api.get("/passes/orders"),

  getStaffOrders: () => api.get("/passes/orders/staff"),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createOrder: (data: any) => api.post("/passes/orders", data),

  approveOrder: (orderId: number) =>
    api.patch(`/passes/orders/${orderId}/approve`),

  rejectOrder: (orderId: number, reason?: string) =>
    api.post(`/passes/orders/${orderId}/reject`, { reason }),

  cancelOrder: (orderId: number) =>
    api.post(`/passes/orders/${orderId}/cancel`),
};
