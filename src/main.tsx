import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AuthActionProvider } from "@authaction/web-sdk/react";
import { AuthProvider } from "./contexts/AuthContext";
import { AUTHACTION_AUDIENCE, AUTHACTION_CLIENT_ID, AUTHACTION_DOMAIN } from "./lib/authaction";
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
            {/*
              `offline_access` is what makes AuthAction issue a refresh token.
              Without it the SDK's refresh path can never run (it throws "No
              refresh token available"), so every session became a hard 401 one
              hour after sign-in instead of renewing silently.
            */}
            <AuthActionProvider
              domain={AUTHACTION_DOMAIN}
              clientId={AUTHACTION_CLIENT_ID}
              redirectUri={`${window.location.origin}/dashboard`}
              postLogoutRedirectUri={`${window.location.origin}/`}
              scope="openid profile email offline_access"
              authorizationParams={{
                audience: AUTHACTION_AUDIENCE,
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
