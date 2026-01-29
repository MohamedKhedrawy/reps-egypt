"use client";

import { createContext, useContext, useState } from "react";

const RegistrationContext = createContext();

export function RegistrationProvider({ children }) {
  const [registrationData, setRegistrationData] = useState({
    // Step 2: Contact Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    profilePhoto: null,
    // Step 3: Personal Info
    birthDate: "",
    age: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      youtube: "",
      linkedin: ""
    },
    // Step 4: Professional Info
    specialization: "",
    uploadedFiles: [],
    termsAccepted: false
  });

  const updateData = (newData) => {
    setRegistrationData(prev => ({ ...prev, ...newData }));
  };

  const resetData = () => {
    setRegistrationData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      profilePhoto: null,
      birthDate: "",
      age: "",
      socialMedia: {
        facebook: "",
        instagram: "",
        youtube: "",
        linkedin: ""
      },
      specialization: "",
      uploadedFiles: [],
      termsAccepted: false
    });
  };

  return (
    <RegistrationContext.Provider value={{ registrationData, updateData, resetData }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return context;
}
