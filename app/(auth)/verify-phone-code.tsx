import React, { useState, useCallback, FC } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  View,
  KeyboardAvoidingView,
} from "react-native";

import OTPInput from "./otp-input";
import { verticalScale } from "../services/scaling/scaling";
type VeriPhoneCodeProps = {
  resendOTP: (phoneNumber: string) => Promise<boolean>;
};
const VeriPhoneCode: FC<VeriPhoneCodeProps> = ({ resendOTP }) => {
  const [state, setState] = useState({ loading: false, errorMessage: "" });
  const windowWidth = useWindowDimensions().width;
  const resend = () => {
    setState({ ...state, loading: true });

    resendOTP("")
      .then(() => {
        setState({ ...state, loading: false });
      })

      .catch((errorCode: string) => {
        var errorMessage = "קרתה שגיאה אנא סגור את האפליקציה ונסה שוב";

        if (errorCode === "auth/too-many-requests") {
          errorMessage =
            "זיהינו יותר מדי נסיונות התחברות. אנא נסו שוב מאוחר יותר";
          // Here you can update your UI to inform the user
        }
        setState({ loading: false, errorMessage });
      })
      .finally(() => {
        setState({ ...state, loading: false });
      });
  };
  const confirmCode = useCallback(async () => {
    setState({ ...state, loading: true });
    try {
      setState({ ...state, loading: false });
      // navigation.replace("Home");
      //זה עובד בלי נביגיישן
    } catch (errorCode) {
      var errorMessage = "קרתה שגיאה אנא סגור את האפליקציה ונסה שוב";

      if (errorCode === "auth/invalid-verification-code") {
        errorMessage = "הוכנס קוד שגוי";
        // Here you can update your UI to inform the user
      }
      setState({ loading: false, errorMessage });
    } finally {
      setState({ ...state, loading: false });
    }
  }, [state]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.prompt}>מה קוד האימות שקיבלתם?</Text>

      <OTPInput pinCount={6} onCodeFilled={confirmCode} resendOTP={resend} />

      {state.errorMessage && (
        <Text style={styles.error}>{state.errorMessage}</Text>
      )}
      {state.loading && (
        <View style={[styles.loadingContainer, { width: windowWidth }]}>
          <ActivityIndicator size="large" color="#02037E" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
    // width:windowWidth,
    height: "100%",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    elevation: 10,
    backgroundColor: "#FFFFFF",
    width: 43,
    height: 53,
    // borderColor: "white",
    // color: "black",
    fontSize: 20,
    opacity: 0.95,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
  },

  underlineStyleHighLighted: {
    // borderWidth: 1,
    // elevation:3,
    backgroundColor: "#FFFFFF",
    width: 43,
    height: 53,
    //  borderColor: "#03DAC6",
  },

  prompt: {
    fontSize: 25,
    paddingHorizontal: 30,
    fontFamily: "Rubik Bold",
    marginBottom: verticalScale(24),
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
    fontWeight: "bold",
  },
  button: {
    height: 30,
    // backgroundColor: "#02037E",
  },
  buttonText: {
    // color: "#FFF",
    fontFamily: "FbAbsolutiHeb-Bold",
    fontSize: 15,
    fontWeight: "400",
  },
  noCode: {
    alignSelf: "center",
    width: "80%",
    // backgroundColor:"pink",
    textAlign: "left",
    color: "#7C7C7C",
    fontFamily: "Rubik Medium",
    fontSize: 13,
    paddingLeft: 5,
  },
  error: {
    color: "red",
  },
});

export default VeriPhoneCode;
