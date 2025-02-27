import { AppointmentActions } from "./appointment-config";
import { generateEndpointsDoctors, generateEndpointsPatients } from "./users-config";

export const API_ENDPOINTS = {
  patient: generateEndpointsPatients,
  doctor: generateEndpointsDoctors,
  appointment: AppointmentActions
};