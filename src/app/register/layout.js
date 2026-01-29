import { RegistrationProvider } from "@/context/RegistrationContext";

export default function RegisterLayout({ children }) {
  return (
    <RegistrationProvider>
      {children}
    </RegistrationProvider>
  );
}
