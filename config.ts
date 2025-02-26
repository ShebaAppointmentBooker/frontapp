// config.ts
export const BASE_URL = "http://192.168.1.240:5000/api";
// export const BASE_URL = "http://192.168.168.38:5000/api";

// Enum for common actions (login, logout, refreshToken)
export enum Actions { // Add the `export` keyword here
  REQUESTOTP = "requestotp",
  LOGINOTP = "loginotp",
  // LOGIN = "login",
  LOGOUT = "logout",
  REFRESH_TOKEN = "refresh-token",
  VERIFY="verify"
}

// Define base paths for Doctor and Patient
const DOCTOR_PATH = `${BASE_URL}/doctors`;
const PATIENT_PATH = `${BASE_URL}/patients`;

// Function to generate the API endpoints dynamically
const generateEndpoints = (modelPath: string) => {
  return {
    [Actions.REQUESTOTP]: `${modelPath}/${Actions.REQUESTOTP}`,
    [Actions.LOGINOTP]: `${modelPath}/${Actions.LOGINOTP}`,
    // [Actions.LOGIN]: `${modelPath}/${Actions.LOGIN}`,
    [Actions.LOGOUT]: `${modelPath}/${Actions.LOGOUT}`,
    [Actions.REFRESH_TOKEN]: `${modelPath}/${Actions.REFRESH_TOKEN}`,
    [Actions.VERIFY]: `${modelPath}/${Actions.VERIFY}`,
  };
};

export const API_ENDPOINTS = {
  doctor: generateEndpoints(DOCTOR_PATH),
  patient: generateEndpoints(PATIENT_PATH),
};
