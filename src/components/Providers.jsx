"use client";

import { AuthProvider } from "@/context/AuthContext";
import { RegistrationProvider } from "@/context/RegistrationContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <RegistrationProvider>
        {children}
      </RegistrationProvider>
    </AuthProvider>
  );
}
