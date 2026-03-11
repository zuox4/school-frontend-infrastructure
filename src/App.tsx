import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Container, Panel } from "@maxhub/max-ui";

import { AppRoutes } from "./routes/AppRoutes";
import { LoginPage } from "./pages/LoginPage";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";
import { LoadingFallback } from "./components/LoadingFallback";
import { AuthProvider } from "./context/AuthProvider";
// import { useTelegram } from "./hooks/useTelegram";
import { LoginForm } from "./pages/LoginForm";

function App() {
  // const { isMobile } = useTelegram();

  return (
    <BrowserRouter>
      <AuthProvider>
        <Panel className={`app`}>
          <Container fullWidth>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login-form" element={<LoginForm />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="/*" element={<AppRoutes />} />
              </Routes>
            </Suspense>
          </Container>
        </Panel>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
