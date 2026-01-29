"use client";

import { AuthProvider } from "@/context/AuthContext";
import { RegistrationProvider } from "@/context/RegistrationContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RegistrationProvider>
          {children}
        </RegistrationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
