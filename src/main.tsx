import { createRoot } from "react-dom/client";
import { MaxUI } from "@maxhub/max-ui";
import "@maxhub/max-ui/dist/styles.css";
import "./index.css";
import App from "./App.tsx";
console.log(123);
createRoot(document.getElementById("root")!).render(
  <MaxUI>
    <App />
  </MaxUI>,
);
