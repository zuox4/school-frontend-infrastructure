// host/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  optimizeDeps: {
    include: ["react", "react-dom", "axios", "jwt-decode"], // Явно укажи тяжелые библиотеки
  },
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        markbook:
          "https://regionally-meet-staghound.cloudpub.ru/assets/remoteEntry.js",
      },

      // Исправленный формат shared - просто массив строк
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    // host: "0.0.0.0",
    port: 5000,
    // strictPort: true,

    allowedHosts: [
      "gloomily-ideal-coelacanth.cloudpub.ru",
      // "localhost",
      ".cloudpub.ru", // Разрешает все поддомены cloudpub.ru
    ],
    hmr: {
      clientPort: 443, // Если работаешь через прокси cloudpub
      host: "school-service.1298.ru", // Укажи свой домен здесь
      protocol: "wss", // Обязательно WSS для HTTPS домена
    },
    warmup: {
      clientFiles: ["./src/**/*.tsx"], // Предзагрузка файлов, чтобы не ждать их потом
    },
  },
  build: {
    target: "esnext",
  },
});
