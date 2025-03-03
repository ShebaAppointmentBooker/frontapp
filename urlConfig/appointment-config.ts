// config.ts
export const BASE_URL_APPOINTMENTS = "http://192.168.1.240";
// export const BASE_URL_APPOINTMENTS = "http://192.168.168.38"
export const APPOINTMENT_ROUTE = "5001/appointments";
export const COMPLETE_APPOINTMENT_ROUTE =
  BASE_URL_APPOINTMENTS + ":" + APPOINTMENT_ROUTE;
// Enum for common actions (login, logout, refreshToken)
export enum AppointmentActions {
  GET_ALL_APPOINTMENT_TYPES = `/get_all_appointment_types`,
  GET_ALL_SPECIALIZATIONS = `/get_all_specializations`,
  GET_DOCTORS_BY_SPECIALIZATION = `/get_doctors_by_specialization`,
  GET_USER_APPOINTMENTS = `/get_user_appointments`,
  GET_AVAILABLE_APPOINTMENTS_BY_TYPE = `/get_available_appointments_by_type`,
  GET_PATIENT_APPOINTMENTS = `/get_patient_appointments`,
  BOOK_APPOINTMENT = `/book_appointment`,
  CANCEL_APPOINTMENT = `/cancel_appointment`,
}
export enum CompleteAppointmentActions {
  GET_ALL_APPOINTMENT_TYPES = `${COMPLETE_APPOINTMENT_ROUTE}${AppointmentActions.GET_ALL_APPOINTMENT_TYPES}`,
  GET_ALL_SPECIALIZATIONS = `${COMPLETE_APPOINTMENT_ROUTE}${AppointmentActions.GET_ALL_SPECIALIZATIONS}`,
  GET_DOCTORS_BY_SPECIALIZATION = `${COMPLETE_APPOINTMENT_ROUTE}${AppointmentActions.GET_DOCTORS_BY_SPECIALIZATION}`,
  GET_USER_APPOINTMENTS = `${COMPLETE_APPOINTMENT_ROUTE}${AppointmentActions.GET_USER_APPOINTMENTS}`,
  GET_AVAILABLE_APPOINTMENTS_BY_TYPE = `${COMPLETE_APPOINTMENT_ROUTE}${AppointmentActions.GET_AVAILABLE_APPOINTMENTS_BY_TYPE}`,
  GET_PATIENT_APPOINTMENTS = `${COMPLETE_APPOINTMENT_ROUTE}${AppointmentActions.GET_PATIENT_APPOINTMENTS}`,
  BOOK_APPOINTMENT = `${COMPLETE_APPOINTMENT_ROUTE}${AppointmentActions.BOOK_APPOINTMENT}`,
  CANCEL_APPOINTMENT = `${COMPLETE_APPOINTMENT_ROUTE}${AppointmentActions.CANCEL_APPOINTMENT}`,
}
