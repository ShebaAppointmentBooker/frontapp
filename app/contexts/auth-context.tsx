// app/contexts/auth-context.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
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
  PATIENT_PATH,
  UserActions,
} from "../../urlConfig/users-config";
import { Alert } from "react-native";
import { otpType } from "../types/otpType";
export interface User {
  email?: string | null;
  name: string | null;
  phone?: string | null;
  medicalHistory?: string | null;

  // Add other properties that your user object has
}
// Define the Auth context type
interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  user: User;
  loading: boolean;
  loadingStartUp: boolean;
  // login: (email: string, password: string) => Promise<void>;
  requestOtp: (nationalId: string) => Promise<otpType>;
  loginWithOtp: (token: string, otp: string, user: string) => Promise<void>;
  updatePatient: ({
    email,
    phone,
    medicalHistory,
  }: {
    email?: string;
    phone?: string;
    medicalHistory?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  apiRequest: <T = any>(
    config: AxiosRequestConfig,
    baseURL: string
  ) => Promise<T>;
  refreshAuthTokenFunction: () => Promise<void>;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    email: "",
    name: "",
    phone: "",
    medicalHistory: "",
    // Add other properties that your user object has
  });
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [loadingStartUp, setLoadingStartUp] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const refreshCallCounter = useRef(0);

  useEffect(() => {
    const verifyToken = async (refreshToken: string | null) => {
      const response = await axios.post(
        API_ENDPOINTS.patient[UserActions.VERIFY],
        {
          refreshToken,
        },
        { timeout: 10000 }
      );
      console.log(response.data);
    };
    const initializeAuth = async () => {
      setLoadingStartUp(true);
      let storedRefreshToken;
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        storedRefreshToken = await SecureStore.getItemAsync("refreshToken");
        const storedUser = await SecureStore.getItemAsync("user");
        const storedEmail = await SecureStore.getItemAsync("email");
        const storedPhone = await SecureStore.getItemAsync("phone");
        const storedMedicalHistory = await SecureStore.getItemAsync(
          "medicalHistory"
        );

        if (storedRefreshToken) {
          console.log("validating " + storedRefreshToken);
          await verifyToken(storedRefreshToken);
          console.log("verfied " + user);
          setToken(storedToken);
          tokenRef.current = storedToken;
          setRefreshToken(storedRefreshToken);
          setUser({
            name: storedUser,
            email: storedEmail,
            phone: storedPhone,
            medicalHistory: storedMedicalHistory,
          });
          // setEmail(email)
        }
      } catch (error: any) {
        if (storedRefreshToken) deleteCreds();
        console.error("Error loading authentication data", error.response.data);
      } finally {
        setLoadingStartUp(false);
      }
    };
    initializeAuth();
  }, []);
  // useEffect(() => {
  //   console.log("auth", token);
  // }, [token]);
  const requestOtp = async (nationalId: string) => {
    // setLoading(true);
    console.log(API_ENDPOINTS.patient[UserActions.REQUESTOTP]);
    try {
      const response = await axios.post(
        API_ENDPOINTS.patient[UserActions.REQUESTOTP],
        {
          nationalId,
        },
        { timeout: 10000 }
      );
      //const { token, otp, user,expMinutes }=response.data
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.code;
        console.log(error.code);
        if (errorCode === "ECONNABORTED")
          Alert.alert(
            "Request Timeout",
            "The request took too long to complete. Please try again."
          );
      }

      console.error("Request OTP error:", error);
      throw error;
    } finally {
      // setLoading(false);
    }
  };
  const loginWithOtp = async (token: string, otp: string, user: string) => {
    // setLoading(true);
    try {
      console.log(otp, "lol");
      const response = await axios.post(
        API_ENDPOINTS.patient[UserActions.LOGINOTP],
        {
          token,
          otp,
        },
        { timeout: 10000 }
      );
      // Store accessToken and refreshToken in your app state
      const { accessToken, refreshToken, email, phone, medicalHistory } =
        response.data;
      console.log("date", response.data);
      setToken(accessToken);
      tokenRef.current = accessToken;
      setRefreshToken(refreshToken);
      // setEmail(email);
      // setPhone(phone);
      setUser({ name: user, email, phone, medicalHistory });
      await SecureStore.setItemAsync("token", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      await SecureStore.setItemAsync("user", user);
      await SecureStore.setItemAsync("email", email);
      await SecureStore.setItemAsync("phone", phone);
      if (medicalHistory)
        await SecureStore.setItemAsync("medicalHistory", medicalHistory);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.code;
        if (errorCode === "ECONNABORTED")
          Alert.alert(
            "Request Timeout",
            "The request took too long to complete. Please try again."
          );
      }
      console.error("Login with OTP error:", error);
      Alert.alert("Error", "Failed to log in with OTP");
    } finally {
      // setLoading(false);
    }
  };

  const deleteCreds = async () => {
    try {
      // Clear SecureStore and reset authentication state
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("refreshToken");
      await SecureStore.deleteItemAsync("user");
      await SecureStore.deleteItemAsync("email");
      await SecureStore.deleteItemAsync("phone");
      await SecureStore.deleteItemAsync("medicalHistory");

      setToken(null);
      tokenRef.current = null;
      setRefreshToken(null);
      setUser({
        email: "",
        name: "",
        phone: "",
      });
      refreshCallCounter.current = 0;
    } catch (error) {
      console.error("Error during logout cleanup:", error);
    }
  };
  const logout = async () => {
    try {
      console.log("logging out");
      if (tokenRef.current) {
        await axios.post(
          API_ENDPOINTS.patient[UserActions.LOGOUT],
          { refreshToken },
          {
            headers: { Authorization: `Bearer ${tokenRef.current}` },
            timeout: 10000,
          }
        );
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.warn(
          "Token expired or unauthorized. Proceeding with logout..."
        );
      } else {
        console.error("Logout error:", error);
      }
    } finally {
      deleteCreds();
    }
  };
  // Handle Token Refresh
  const refreshAuthTokenFunction = async () => {
    if (!refreshToken) {
      console.error("No refresh token available");
      // await logout();
      return null;
    }

    try {
      const response = await axios.post(
        API_ENDPOINTS.patient[UserActions.REFRESH_TOKEN],
        {
          refreshToken,
        },
        { timeout: 10000 }
      );
      console.log("refreshed from func");
      const { accessToken: newToken, refreshToken: newRefreshToken } =
        response.data;

      setToken(newToken);
      tokenRef.current = newToken;
      setRefreshToken(newRefreshToken);

      await SecureStore.setItemAsync("token", newToken);
      await SecureStore.setItemAsync("refreshToken", newRefreshToken);

      return newToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      // await logout();
      return null;
    }
  };

  const updatePatient = async ({
    email = "",
    phone = "",
    medicalHistory = "",
  }) => {
    console.log("lol", email, phone, medicalHistory);
    const response = await apiRequestPatients({
      method: "POST",
      url: UserActions.UPDATE,
      data: { email, phone, medicalHistory },
    });
    const newUser: User = {
      name: user.name,
    };

    if (email) {
      newUser.email = email;
      await SecureStore.setItemAsync("email", email);
    }
    if (phone) {
      newUser.phone = phone;
      await SecureStore.setItemAsync("phone", phone);
    }
    if (medicalHistory) {
      newUser.medicalHistory = medicalHistory;
      await SecureStore.setItemAsync("medicalHistory", medicalHistory);
    }

    setUser((prev) => {
      return { ...prev, ...newUser };
    });
    return response;
  };
  const apiRequestPatients = async <T = any,>(
    config: AxiosRequestConfig
  ): Promise<T> => {
    return apiRequest<T>(config, PATIENT_PATH);
  };
  const apiRequest = async <T = any,>(
    config: AxiosRequestConfig,
    baseURL: string,
    timeout?: 10000
  ): Promise<T> => {
    const api = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
      timeout,
    });
    //this is only for dev because the servers ssl is untrusted
    api.interceptors.request.use(async (config) => {
      // @ts-ignore
      config.transitional = {
        silentJSONParsing: false,
        forcedJSONParsing: false,
        clarifyTimeoutError: false,
      };
      return config;
    });
    api.interceptors.request.use(
      (requestConfig: InternalAxiosRequestConfig) => {
        if (tokenRef.current) {
          requestConfig.headers.Authorization = `Bearer ${tokenRef.current}`;
        }
        return requestConfig;
      },
      (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
      (response) => {
        // ✅ Check if status is in the 2xx range
        if (response.status >= 200 && response.status < 300) {
          refreshCallCounter.current = 0;
        }
        return response;
      },
      async (error: AxiosError) => {
        if (refreshCallCounter.current > 2) {
          console.log("tried refreshing too many times");
          logout();
          return;
        }
        const status = error.response?.status;
        const errorCode = error.code;
        switch (true) {
          // Handle 401 Unauthorized
          case status === 401:
            // Alert.alert(
            //   "Unauthorized",
            //   "Your session has expired. Please log in again."
            // );
            try {
              console.log("refreshing");
              const newToken = await refreshAuthTokenFunction();
              console.log("refreshed");
              if (newToken && error.config) {
                refreshCallCounter.current++;
                error.config.headers =
                  error.config.headers || new axios.AxiosHeaders();
                console.log(
                  error.config,
                  "new token: ",
                  `Bearer ${newToken}`,
                  "old token: ",
                  error.config.headers["Authorization"],
                  " ",
                  `Bearer ${newToken}` === error.config.headers["Authorization"]
                );
                // error.config.headers.set("Authorization", `Bearer ${newToken}`);
                const newRequestConfig: AxiosRequestConfig = {
                  ...error.config,
                  headers: {
                    ...error.config.headers,
                    Authorization: `Bearer ${newToken}`,
                  },
                };
                console.log(
                  error.config,
                  "new token: ",
                  `Bearer ${newToken}`,
                  "old token: ",
                  error.config.headers["Authorization"],
                  " ",
                  `Bearer ${newToken}` === error.config.headers["Authorization"]
                );
                return api.request(newRequestConfig);
              }
            } catch (refreshError) {
              console.error("Failed to refresh token:", refreshError);
              // deleteCreds();
              return Promise.reject(refreshError);
            }
            break;

          // Handle Timeout Error
          case errorCode === "ECONNABORTED":
            Alert.alert(
              "Request Timeout",
              "The request took too long to complete. Please try again."
            );
            break;

          // Default case for other errors
          default:
            console.error("API Request Error:", error);
            // Alert.alert("Error", "An unexpected error occurred.");
            break;
        }

        return Promise.reject(error);
      }
    );

    return api.request<T>(config).then((response) => response.data);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        refreshToken,
        user,
        loading,
        loadingStartUp,
        requestOtp,
        loginWithOtp,
        updatePatient,
        logout,
        apiRequest,
        refreshAuthTokenFunction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
