import { useEffect, useRef, useMemo } from "react";

export function useTelegram() {
  const initialized = useRef(false);

  // Используем useMemo, чтобы не пересчитывать при каждом рендере,
  // так как платформа внутри Telegram не меняется в процессе сессии
  const tgData = useMemo(() => {
    const webApp = window?.WebApp;

    if (!webApp) {
      return { webApp: null, isMobile: false, platform: "unknown" };
    }

    const platform = webApp.platform || "unknown";

    // Проверка на мобильную платформу согласно документации TMA
    const isMobile =
      ["android", "ios", "weba", "mobile"].includes(platform.toLowerCase()) ||
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return { webApp, isMobile, platform };
  }, []);

  useEffect(() => {
    if (initialized.current || !tgData.webApp) return;

    const { webApp, isMobile } = tgData;

    initialized.current = true;

    // Инициализация Mini App
    webApp.ready();

    // Фичи версии "MAX" (Fullscreen и защита от свайпов)
    if (isMobile) {
      try {
        // Проверяем доступность метода перед вызовом (важно для старых версий клиента)
        if (webApp.requestFullscreen) {
          webApp.requestFullscreen();
        }
        if (webApp.disableVerticalSwipes) {
          webApp.disableVerticalSwipes();
        }

        // Для MAX также часто включают расширение на всю высоту
        if (webApp.expand) {
          webApp.expand();
        }
      } catch (error) {
        console.warn("TMA Max features initialization failed:", error);
      }
    }
  }, [tgData]);

  return {
    tg: tgData.webApp,
    isMobile: tgData.isMobile,
    platform: tgData.platform,
  };
}
