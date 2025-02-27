// app/contexts/appointment-context.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import * as SecureStore from "expo-secure-store";

import { API_ENDPOINTS } from "../../urlConfig/main-config";
import {
  COMPLETE_USERS_ROUTE,
  UserActions,
} from "../../urlConfig/users-config";
import { Alert } from "react-native";
import { otpType } from "../types/otpType";
import { useAuth } from "./auth-context";
import { COMPLETE_APPOINTMENT_ROUTE } from "../../urlConfig/appointment-config";
interface User {
  id: string;
  email: string;
  name: string;
  // Add other properties that your user object has
}
// Define the Appointment context type
interface AppointmentContextType {
  availableAppointments: () => Promise<void>;
  bookingResponse: (appointmentId: string) => Promise<void>;
}

// Create the Appointment context
const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

// Provider component
export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const { token, apiRequest } = useAuth();
  const availableAppointments = async () => {
    const response = await apiRequestAppointments({
      method: "GET",
      url: "/available",
    });
    return response.data;
  };
  const bookingResponse = async (appointmentId: string) => {
    const response = await apiRequestAppointments({
      method: "POST",
      url: "/book",
      data: { appointmentId },
    });
    return response.data;
  };
  // Create an Axios instance with request and response interceptors
  const apiRequestAppointments = async <T = any,>(
    config: AxiosRequestConfig
  ): Promise<T> => {
    return apiRequest<T>(config, COMPLETE_APPOINTMENT_ROUTE);
  };

  return (
    <AppointmentContext.Provider
      value={{
        availableAppointments,
        bookingResponse,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAppointment = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointment must be used within an AuthProvider");
  }
  return context;
};
