import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <NextThemesProvider attribute="class" defaultTheme="system">
    <StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <App />
        </NextUIProvider>
        <Toaster />
      </Provider>
    </StrictMode>
  </NextThemesProvider>
);
