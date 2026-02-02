"use client";

import { AuthProvider } from "@/context/AuthContext";
import { RegistrationProvider } from "@/context/RegistrationContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { PageSettingsProvider } from "@/context/PageSettingsContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <PageSettingsProvider>
            <RegistrationProvider>
              {children}
            </RegistrationProvider>
          </PageSettingsProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
