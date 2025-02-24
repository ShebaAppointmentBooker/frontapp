import React from "react";
import LoginOtp from "./login-otp";
import VerIdCode from "./verify-phone-code";
import { useAuth } from "../contexts/auth-context";
import { otpType } from "../types/otpType";
import { Redirect } from "expo-router";

const IdIndex = () => {
  const [confirmCredentials, setConfirmCredentials] = React.useState<otpType>({
    token: "",
    otp: "",
    user: "",
    expMinutes: 0,
  });
  const [id, setId] = React.useState("");
  const { requestOtp, refreshToken } = useAuth();

  const reRequestOtpFunction = async () => {
    await requestOtpFunction(id);
  };
  const requestOtpFunction = async (id: string) => {
    try {
      try {
        const response = await requestOtp(id);
        setConfirmCredentials(response);
        setId(id);
      } catch (e) {
        console.log(e);
      } finally {
      }
      return true;
    } catch (e) {
      console.log("failed");
      console.log(e);
      throw e;
    }
  };
  if (refreshToken) {
    return <Redirect href="/" />;
  }
  if (confirmCredentials.token)
    return (
      <VerIdCode
        resetCredentials={() =>
          setConfirmCredentials({
            token: "",
            otp: "",
            user: "",
            expMinutes: 0,
          })
        }
        confirmCredentials={confirmCredentials}
        resendOTP={reRequestOtpFunction}
      />
    );
  return <LoginOtp signInFunc={requestOtpFunction} />;
};

export default IdIndex;
