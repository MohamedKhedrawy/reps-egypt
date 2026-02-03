"use client";

import { AuthProvider } from "@/context/AuthContext";
import { RegistrationProvider } from "@/context/RegistrationContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { PageSettingsProvider } from "@/context/PageSettingsContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
          <PageSettingsProvider>
            <RegistrationProvider>
              {children}
            </RegistrationProvider>
          </PageSettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
