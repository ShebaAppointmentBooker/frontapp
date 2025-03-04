// config.ts
// export const BASE_URL_USERS = "http://192.168.1.240";
export const BASE_URL_USERS = "http://192.168.168.38";
export const USERS_ROUTE = "5000/users";
export const COMPLETE_USERS_ROUTE = BASE_URL_USERS + ":" + USERS_ROUTE;
// Enum for common actions (login, logout, refreshToken)
export enum UserActions { // Add the `export` keyword here
  REQUESTOTP = "requestotp",
  LOGINOTP = "loginotp",
  // LOGIN = "login",
  LOGOUT = "logout",
  REFRESH_TOKEN = "refreshtoken",
  VERIFY = "verify",
  UPDATE = "update",
}

// Define base paths for Doctor and Patient
export const DOCTOR_PATH = `${COMPLETE_USERS_ROUTE}/doctors`;
export const PATIENT_PATH = `${COMPLETE_USERS_ROUTE}/patients`;

// Function to generate the API endpoints dynamically
const generateEndpointsUsers = (modelPath: string) => {
  return {
    [UserActions.REQUESTOTP]: `${modelPath}/${UserActions.REQUESTOTP}`,
    [UserActions.LOGINOTP]: `${modelPath}/${UserActions.LOGINOTP}`,
    // [Actions.LOGIN]: `${modelPath}/${Actions.LOGIN}`,
    [UserActions.LOGOUT]: `${modelPath}/${UserActions.LOGOUT}`,
    [UserActions.REFRESH_TOKEN]: `${modelPath}/${UserActions.REFRESH_TOKEN}`,
    [UserActions.VERIFY]: `${modelPath}/${UserActions.VERIFY}`,
    [UserActions.UPDATE]: `${modelPath}/${UserActions.UPDATE}`,
  };
};
export const generateEndpointsPatients = {
  ...generateEndpointsUsers(PATIENT_PATH),
};
export const generateEndpointsDoctors = {
  ...generateEndpointsUsers(DOCTOR_PATH),
};
