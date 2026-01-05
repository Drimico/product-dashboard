import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { useThemeStore } from "./stores/useThemeStore";

const initialTheme = useThemeStore.getState().theme ?? "light";
document.documentElement.style.colorScheme = initialTheme;
document.documentElement.setAttribute("data-theme", initialTheme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
