import React, { useState, useRef, FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from "react-native";
import GenericInput from "../components/generic-input";

import { SvgXml } from "react-native-svg";

import Ionicons from "react-native-vector-icons/Ionicons";
type LoginOtpProps = {
  signInFunc: (id: string) => Promise<boolean>;
};
const LoginOtp: FC<LoginOtpProps> = ({ signInFunc }) => {
  const [id, setId] = useState("");
  const [isValidInput, setIsValidInput] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const idInput = useRef(null);
  const windowWidth = useWindowDimensions().width;

  const sendVerification = () => {
    if (!isValidInput) alert("תעודת הזהות חייבת להכיל או 9 ספרות");
    else {
      setLoading(true);
      Keyboard.dismiss();

      signInFunc(id)
        .then(() => {})

        .catch((error) => {
          console.log(error, "hhh");
          var errorCode = error.code;
          var errorMessage =
            "נתקלנו בשגיאה. בדוק את מספר הטלפון שהכנסת ונסה שוב";

          if (errorCode === "auth/too-many-requests") {
            errorMessage =
              "זיהינו יותר מדי נסיונות התחברות. אנא נסו שוב מאוחר יותר";
            // Here you can update your UI to inform the user
          } else if (errorCode === "timeout") errorMessage = error.messege;
          console.log(error);
          Alert.alert(
            "אופס!",
            errorMessage,
            [
              {
                text: "אישור",
                // onPress: () => console.log('Button Pressed'),
              },
            ],
            { cancelable: false }
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleIdChange = (text: string) => {
    setId(text);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.top}>
              <Text style={styles.title}>Sheba</Text>
              <Text style={styles.subTitle}>The Best Hospital Ever</Text>
            </View>

            <View style={styles.enterId}>
              <Text style={styles.enterIdTitle}>הכניסו תעודת זהות</Text>
              <GenericInput
                svgButtonSource={`<svg width="69" height="34" viewBox="0 0 69 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.47409 22.579C8.53836 22.6422 8.58956 22.7175 8.62474 22.8005C8.65992 22.8836 8.6784 22.9727 8.67913 23.0629C8.67986 23.1531 8.66282 23.2425 8.62898 23.3261C8.59515 23.4097 8.54518 23.4858 8.48193 23.5501C8.41868 23.6143 8.34339 23.6655 8.26035 23.7007C8.17732 23.7359 8.08817 23.7544 7.99799 23.7551C7.90782 23.7558 7.81838 23.7388 7.73479 23.705C7.6512 23.6711 7.57509 23.6212 7.51081 23.5579L1.45454 17.5953C1.32948 17.4723 1.25624 17.3061 1.24986 17.1308C1.24349 16.9555 1.30445 16.7844 1.42025 16.6526L7.02732 10.2651C7.08637 10.1959 7.15858 10.1392 7.23975 10.0982C7.32093 10.0571 7.40944 10.0326 7.50015 10.0261C7.59087 10.0196 7.68198 10.0311 7.76819 10.0601C7.8544 10.0891 7.934 10.1349 8.00235 10.1949C8.0707 10.2549 8.12645 10.3279 8.16636 10.4096C8.20627 10.4913 8.22954 10.5802 8.23483 10.671C8.24011 10.7618 8.2273 10.8527 8.19714 10.9385C8.16698 11.0243 8.12008 11.1033 8.05914 11.1708L2.87954 17.0715L8.47409 22.579Z" fill="dodgerblue" stroke="dodgerblue"/>

                  </svg>
                  `}
                // imageButton={smallGo}
                isValidInput={isValidInput}
                setIsValidInput={(value) => setIsValidInput(value)}
                regex={/^\d{9}$/}
                placeholder=" תעדות זהות"
                onInputChange={handleIdChange}
                onPress={sendVerification}
              />
            </View>
          </View>

          {loading && (
            <View style={[styles.loadingContainer, { width: windowWidth }]}>
              <ActivityIndicator size="large" color="#02037E" />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
  },
  contentContainer: {
    position: "absolute",
    top: "20%",
    height: "50%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  top: {
    // width: "100%",
    // backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  middle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  title: {
    color: "#125EF2",
    textAlign: "right",
    // text-shadow: 0px 1px 1.4800000190734863px rgba(0, 0, 0, 0.25);
    fontFamily: "Montserrat",
    fontSize: 60,
    // fontStyle: "normal",
    fontWeight: "bold",
    marginBottom: 0,
    // lineHeight: "normal",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subTitle: {
    color: "#125EF2",
    textAlign: "right",
    // text-shadow: 0px 1px 1.4800000190734863px rgba(0, 0, 0, 0.25);
    fontFamily: "Montserrat",
    fontSize: 30,
    // fontStyle: "normal",
    fontWeight: "bold",

    // lineHeight: "normal",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  go: {
    flexDirection: "row",
  },
  enterId: {},
  enterIdTitle: {
    color: "dodgerblue",
    textAlign: "right",
    fontFamily: "Rubik Bold",
    fontSize: 25,
    // fontWeight: "900",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  later: {
    position: "absolute",
    bottom: "10%",
    color: "#125EF2",
    fontSize: 13,
    fontFamily: "Rubik",
    borderBottomWidth: 1,
    borderBottomColor: "#125EF2",
  },
  replaceHolder: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },

  subtitle1: {
    color: "#000",
    fontFamily: "FbAbsolutiHeb-Medium",
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 10,
    width: "100%",
  },
  subtitle2: {
    color: "#000",
    width: "100%",
    fontFamily: "FbAbsolutiHeb-Bold",
    fontSize: 16,
    // fontWeight: "400",
    marginBottom: 0,
    marginTop: 47,
  },
  buttonContainer: {
    // backgroundColor: "blue",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // height:"10%"
  },
  button: {
    height: 41,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 5,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    flexDirection: "row",

    // boxShadow: "-1 1 4 0 rgba(0, 0, 0, 0.25)"
  },
  buttonText: {
    fontFamily: "FbAbsolutiHeb-Medium",
    fontSize: 15,
    fontWeight: "400",
    color: "#000000",
    opacity: 0.5,
    flex: 5,
  },
  logoText: {
    flex: 1,
    alignItems: "center",
  },
});

export default LoginOtp;

// regex={/^(0\d{9}|\d{9})+$/}
