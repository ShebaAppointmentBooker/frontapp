// config.ts
export const BASE_URL_APPOINTMENTS = "http://192.168.1.240";
// export const BASE_URL_APPOINTMENTS = "http://192.168.168.38"
export const APPOINTMENT_ROUTE="5001/appointments";
export const COMPLETE_APPOINTMENT_ROUTE=BASE_URL_APPOINTMENTS+":"+APPOINTMENT_ROUTE;
// Enum for common actions (login, logout, refreshToken)
export enum AppointmentActions {
  GET_ALL_APPOINTMENT_TYPES = `${COMPLETE_APPOINTMENT_ROUTE}/get_all_appointment_types`,
  GET_ALL_SPECIALIZATIONS = `${COMPLETE_APPOINTMENT_ROUTE}/get_all_specializations`,
  GET_USER_APPOINTMENTS = `${COMPLETE_APPOINTMENT_ROUTE}/get_user_appointments`,
  GET_AVAILABLE_APPOINTMENTS_BY_TYPE = `${COMPLETE_APPOINTMENT_ROUTE}/get_available_appointments_by_type`,
  BOOK_APPOINTMENT = `${COMPLETE_APPOINTMENT_ROUTE}/book_appointment`,
  CANCEL_APPOINTMENT=`${COMPLETE_APPOINTMENT_ROUTE}/cancel_appointment`
}






