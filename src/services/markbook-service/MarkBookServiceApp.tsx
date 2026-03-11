// host/src/services/markbook-service/MarkBookServiceApp.tsx
import { Panel } from "@maxhub/max-ui";
import { lazy, Suspense } from "react";
import { api } from "../../api/axios"; // Импортируем API
import { LoadingFallback } from "../../components/LoadingFallback";
import BackButton from "../pass-service/components/BackButton";

const RemoteApp = lazy(() => import("markbook/App"));

export default function MarkBookServiceApp() {
  return (
    <Panel>
      <BackButton />
      <Suspense fallback={<LoadingFallback />}>
        <RemoteApp api={api} /> {/* Передаем API как пропс */}
      </Suspense>
    </Panel>
  );
}
