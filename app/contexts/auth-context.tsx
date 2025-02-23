// app/contexts/auth-context.tsx
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

import { API_ENDPOINTS, Actions, BASE_URL } from "../../config";
import { Alert } from "react-native";
import { otpType } from "../types/otpType";
interface User {
  id: string;
  email: string;
  name: string;
  // Add other properties that your user object has
}
// Define the Auth context type
interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;
  // login: (email: string, password: string) => Promise<void>;
  requestOtp: (nationalId: string) => Promise<otpType>;
  loginWithOtp: (token: string, otp: string, user: string) => Promise<void>;
  logout: () => Promise<void>;
  apiRequest: <T = any>(config: AxiosRequestConfig) => Promise<T>;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        const storedRefreshToken = await SecureStore.getItemAsync(
          "refreshToken"
        );
        const storedUser = await SecureStore.getItemAsync("user");

        if (storedToken) {
          setToken(storedToken);
          setRefreshToken(storedRefreshToken);
          setUser(JSON.parse(storedUser || "{}"));
        }
      } catch (error) {
        console.error("Error loading authentication data", error);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);
  // useEffect(() => {
  //   console.log("auth", token);
  // }, [token]);
  const requestOtp = async (nationalId: string) => {
    // setLoading(true);
    try {
      const response = await axios.post(
        API_ENDPOINTS.patient[Actions.REQUESTOTP],
        {
          nationalId,
        }
      );
      //const { token, otp, user,expMinutes }=response.data
      return response.data;
    } catch (error) {
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
        API_ENDPOINTS.patient[Actions.LOGINOTP],
        {
          token,
          otp,
        }
      );
      // Store accessToken and refreshToken in your app state
      const { accessToken, refreshToken } = response.data;
      console.log(response.data);
      setToken(accessToken);
      setRefreshToken(refreshToken);
      await SecureStore.setItemAsync("token", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      await SecureStore.setItemAsync("user", user);
    } catch (error) {
      console.error("Login with OTP error:", error);
      Alert.alert("Error", "Failed to log in with OTP");
    } finally {
      // setLoading(false);
    }
  };
  // Handle Login
  // const login = async (email: string, password: string) => {
  //   setLoading(true);
  //   try {
  //     // const response = await axios.post(API_ENDPOINTS.patient[Actions.LOGIN], {
  //     //   email,
  //     //   password,
  //     // });
  //     console.log(API_ENDPOINTS.patient[Actions.LOGIN]);
  //     const response = await axios.post(API_ENDPOINTS.patient[Actions.LOGIN], {
  //       email: "jane.smith@example.com",
  //       password: "password123",
  //     });

  //     const { accessToken, refreshToken, user } = response.data;
  //     setToken(accessToken);
  //     setRefreshToken(refreshToken);
  //     setUser(user);

  //     await SecureStore.setItemAsync("token", accessToken);
  //     await SecureStore.setItemAsync("refreshToken", refreshToken);
  //     await SecureStore.setItemAsync("user", JSON.stringify(user));
  //     console.log("login success!!!", accessToken, refreshToken, user);
  //   } catch (error) {
  //     if (axios.isAxiosError(error))
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         console.error("Response error:", error.response);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.error("Request error:", error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.error("General error:", error.message);
  //       }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Handle Logout
  const logout = async () => {
    try {
      if (token) {
        await axios.post(
          API_ENDPOINTS.patient[Actions.LOGOUT],
          { refreshToken },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("refreshToken");
      await SecureStore.deleteItemAsync("user");

      // setToken(null);
      setRefreshToken(null);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Handle Token Refresh
  const refreshAuthToken = async () => {
    if (!refreshToken) {
      console.error("No refresh token available");
      await logout();
      return null;
    }

    try {
      const response = await axios.post(
        API_ENDPOINTS.patient[Actions.REFRESH_TOKEN],
        {
          refreshToken,
        }
      );

      const { token: newToken, refreshToken: newRefreshToken } = response.data;

      setToken(newToken);
      setRefreshToken(newRefreshToken);

      await SecureStore.setItemAsync("token", newToken);
      await SecureStore.setItemAsync("refreshToken", newRefreshToken);

      return newToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      await logout();
      return null;
    }
  };

  // Create an Axios instance with request and response interceptors
  const apiRequest = async <T = any,>(
    config: AxiosRequestConfig
  ): Promise<T> => {
    const api = axios.create({
      baseURL: BASE_URL,
      headers: { "Content-Type": "application/json" },
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
        if (token) {
          requestConfig.headers.Authorization = `Bearer ${token}`;
        }
        return requestConfig;
      },
      (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          const newToken = await refreshAuthToken();
          if (newToken && error.config) {
            error.config.headers =
              error.config.headers || new axios.AxiosHeaders();
            error.config.headers.set("Authorization", `Bearer ${newToken}`);
            return api.request(error.config);
          }
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
        requestOtp,
        loginWithOtp,
        logout,
        apiRequest,
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
