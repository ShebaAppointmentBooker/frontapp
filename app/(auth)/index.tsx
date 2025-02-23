import React from "react";
import LoginOtp from "./login-otp";
import VeriPhoneCode from "./verify-phone-code";
import { AuthProvider, useAuth } from '../contexts/auth-context';
const PhoneIndex = () => {
  const [confirmCode, setConfirmCode] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const { login } = useAuth();
  function timeoutPromise(timeoutMs: number) {
    return new Promise((resolve, reject) => {
      console.log("hello");
      setTimeout(() => {
        reject({
          code: "timeout",
          messege:
            "בעית קליטה גרמה לבקשת הסיסמה להתעכב, אנא צא וכנס לאפליקציה ונסה שוב",
        });
      }, timeoutMs);
    });
  }

  const signInWithphoneNumber = async (phoneToSend: string) => {
    try {
      const ThephoneNumber = phoneToSend ? phoneToSend : phoneNumber;
      console.log(ThephoneNumber, "lll");
      // const id = await Promise.race([
      //   timeoutPromise(60000), // 10 seconds timeout
      //   auth().signInWithPhoneNumber(ThephoneNumber, true),
      // ]);

      setPhoneNumber(ThephoneNumber);
      setConfirmCode("0");
      login("w","2")
      return true;
    } catch (e) {
      console.log("failed");
      console.log(e);
      throw e;
    }
  };
  if (confirmCode) return <VeriPhoneCode resendOTP={signInWithphoneNumber} />;
  return <LoginOtp signInFunc={signInWithphoneNumber}  />;
};

export default PhoneIndex;
