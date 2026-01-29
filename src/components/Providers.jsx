"use client";

import { AuthProvider } from "@/context/AuthContext";
import { RegistrationProvider } from "@/context/RegistrationContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <RegistrationProvider>
            {children}
          </RegistrationProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
