import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AuthActionProvider } from "@authaction/web-sdk/react";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { PlanProvider } from "./contexts/PlanContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/utilities.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const status = (error as { status?: number }).status;
        if (status && status >= 400 && status < 500) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <ToastProvider>
            <AuthActionProvider
              domain={import.meta.env.VITE_AUTHACTION_DOMAIN || "revercue.in.authaction.com"}
              clientId={import.meta.env.VITE_AUTHACTION_CLIENT_ID || "6afa55be765d68ab52b7acee"}
              redirectUri={`${window.location.origin}/callback`}
              postLogoutRedirectUri={`${window.location.origin}/`}
              authorizationParams={{
                audience: import.meta.env.VITE_AUTHACTION_AUDIENCE || "revercue-api.samsaam470.workers.dev",
              }}
            >
            <AuthProvider>
              <PlanProvider>
                <NotificationProvider>
                  <App />
                </NotificationProvider>
              </PlanProvider>
            </AuthProvider>
            </AuthActionProvider>
          </ToastProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
