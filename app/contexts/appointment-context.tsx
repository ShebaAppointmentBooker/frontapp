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
import {
  AppointmentActions,
  COMPLETE_APPOINTMENT_ROUTE,
} from "../../urlConfig/appointment-config";
import { appointmentType } from "../types/appointmentType";
import { formIDs } from "../types/formIDs";
interface User {
  id: string;
  email: string;
  name: string;
  // Add other properties that your user object has
}
// Define the Appointment context type
interface AppointmentContextType {
  fetchAvailableAppointments: ({
    type,
    subtype,
    doctorId,
    date,
  }: {
    type: string;
    subtype: string|undefined;
    doctorId: string|undefined;
    date: string|undefined;
  }) => Promise<appointmentType[]>;
  fetchAllSpecializations: () => Promise<formIDs[]>;
  fetchAllAppointmentTypes: () => Promise<formIDs[]>;
  fetchDoctorsBySpecialization:(specializationId:string|undefined)=>Promise<any[]>
  bookAppointment: (appointmentId: string) => Promise<void>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  getPatientAppointments: (happened: boolean) => Promise<appointmentType[]>;
  
  availableAppointmentsList: appointmentType[];
  setAvailableAppointmentsList: React.Dispatch<
    React.SetStateAction<appointmentType[]>
  >;
}

// Create the Appointment context
const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

// Provider component
export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const { apiRequest } = useAuth();
  const [availableAppointmentsList, setAvailableAppointmentsList] = useState<
    appointmentType[]
  >([]);
  const fetchAllSpecializations = async () => {
    const response = await apiRequestAppointments({
      method: "Get",
      url: AppointmentActions.GET_ALL_SPECIALIZATIONS,
    });
    console.log(response);
    return JSON.parse(response);
  };
  const fetchDoctorsBySpecialization = async (specializationId:string|undefined) => {
    const response = await apiRequestAppointments({
      method: "Post",
      url: AppointmentActions.GET_DOCTORS_BY_SPECIALIZATION,
      data:{specializationId}
    });
    console.log(response);
    return JSON.parse(response);
  };
  const fetchAllAppointmentTypes = async () => {
    const response = await apiRequestAppointments({
      method: "Get",
      url: AppointmentActions.GET_ALL_APPOINTMENT_TYPES,
    });
    console.log(response);
    return JSON.parse(response);
  };
  const fetchAvailableAppointments = async ({
    type,
    subtype,
    doctorId,
    date,
  }: {
    type: string;
    subtype: string|undefined;
    doctorId: string|undefined;
    date: string|undefined;
  }) => {
    const response = await apiRequestAppointments({
      method: "POST",
      url: AppointmentActions.GET_AVAILABLE_APPOINTMENTS_BY_TYPE,
      data: { type, subtype, doctorId, date },
    });
    return JSON.parse(response);
  };
  const bookAppointment = async (appointmentId: string) => {
    const response = await apiRequestAppointments({
      method: "POST",
      url: AppointmentActions.BOOK_APPOINTMENT,
      data: { appointmentId },
    });
    return response.data;
  };
  const cancelAppointment = async (appointmentId: string) => {
    const response = await apiRequestAppointments({
      method: "POST",
      url: AppointmentActions.BOOK_APPOINTMENT,
      data: { appointmentId },
    });
    return response.data;
  };
  const getPatientAppointments = async (happened: boolean) => {
    const response = await apiRequestAppointments({
      method: "POST",
      url: AppointmentActions.GET_PATIENT_APPOINTMENTS,
      data: { happened },
    });
    // console.log("happened:",happened,response)
    return JSON.parse(response);
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
        fetchAllSpecializations,
        fetchDoctorsBySpecialization,
        fetchAllAppointmentTypes,
        fetchAvailableAppointments,
        bookAppointment,
        cancelAppointment,
        getPatientAppointments,
        availableAppointmentsList,
        setAvailableAppointmentsList,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAppointments = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointment must be used within an AuthProvider");
  }
  return context;
};
