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
import GenericPhoneInput from "../components/GenericPhoneInput";

import { SvgXml } from "react-native-svg";

import Ionicons from "react-native-vector-icons/Ionicons";
type LoginOtpProps = {
  signInFunc: (phoneNumber: string) => Promise<boolean>;
};
const LoginOtp: FC<LoginOtpProps> = ({ signInFunc }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidInput, setIsValidInput] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const phoneInput = useRef(null);
  const windowWidth = useWindowDimensions().width;

  const sendVerification = () => {
    if (!isValidInput)
      alert("מספר חייב להכיל 10 ספרות עם הספרה הראשונה 0, או 9 ספרות");
    else {
      const phoneToSend =
        phoneNumber.length === 10
          ? "+972" + phoneNumber.slice(1)
          : "+972" + phoneNumber;
      console.log(phoneToSend);

      setLoading(true);
      Keyboard.dismiss();

      signInFunc(phoneToSend)
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

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
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
              <Text style={styles.ReadySet}>READY SET</Text>
              <View style={styles.go}>
                <SvgXml
                  style={{}}
                  xml={`<svg xmlns="http://www.w3.org/2000/svg" width="124" height="125" viewBox="0 0 124 125" fill="none">
                      <g filter="url(#filter0_d_3112_31)">
                        <path d="M118.588 53.7423L66.1298 53.8427C64.5285 53.8458 63.218 55.1535 63.221 56.7487L63.2526 73.2651C63.2557 74.8764 64.5552 76.163 66.1725 76.1599L87.4377 76.1192C86.5517 81.7284 84.6863 85.9538 81.8094 88.8114C77.4462 93.1543 71.5256 95.341 64.0475 95.3553C55.6248 95.3714 48.8942 92.7094 43.856 87.3855C37.0368 80.2441 33.6089 71.3076 33.5884 60.5921C33.5785 55.4197 34.5137 50.4066 36.3779 45.5689C41.3968 32.4106 50.3034 25.8192 63.0817 25.7948C69.3428 25.7828 74.7427 27.6416 79.2814 31.3552C81.9438 33.5738 84.3358 36.7274 86.4573 40.8162C87.1485 42.1523 88.7669 42.7293 90.1429 42.1466L112.479 32.8708C114.063 32.2071 114.748 30.3205 113.929 28.8074C109.526 20.7268 104.342 14.5169 98.3924 10.1776C89.1239 3.36316 77.8122 -0.0312713 64.4415 -0.00567627C44.4574 0.0325784 28.905 6.42722 17.7845 19.1943C7.97395 30.396 3.08445 44.2308 3.11592 60.6666C3.14433 75.5071 7.36413 88.261 15.7754 98.9443C26.8993 113.039 42.8457 120.066 63.5984 120.026C76.3446 120.002 87.3877 116.951 96.7116 110.858C106.355 104.507 113.272 95.4383 117.444 83.6835C119.961 76.5887 121.321 67.5947 121.508 56.6855C121.537 55.0579 120.221 53.723 118.588 53.7262L118.588 53.7423Z" fill="#125EF2"/>
                      </g>
                      <defs>
                        <filter id="filter0_d_3112_31" x="0.640815" y="-0.00585938" width="123.343" height="124.983" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset dy="2.4754"/>
                          <feGaussianBlur stdDeviation="1.2377"/>
                          <feComposite in2="hardAlpha" operator="out"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3112_31"/>
                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3112_31" result="shape"/>
                        </filter>
                      </defs>
                    </svg>`}
                />
                <SvgXml
                  // style={{ marginLeft: 28 }}
                  xml={`<svg xmlns="http://www.w3.org/2000/svg" width="126" height="126" viewBox="0 0 126 126" fill="none">
                    <g filter="url(#filter0_d_3112_32)">
                      <path d="M73.5944 36.6662L108.56 43.725C109.783 43.9794 111.259 42.4211 110.949 41.2015L102.128 6.52421C101.87 5.50794 100.517 5.48396 99.57 6.48404L96.1904 10.0541C71.7075 -6.1326 38.0722 -2.38475 17.8903 20.6694C-2.7644 44.2462 -1.80485 79.7507 20.072 102.136C43.9664 126.585 83.3248 126.05 106.64 101.42C119.696 87.6286 125.422 68.6179 122.252 50.0051C121.975 48.3984 120.42 47.3455 118.818 47.7025L98.1515 52.3058C96.7181 52.6246 95.7509 54.0683 95.9542 55.5176C97.3502 65.5047 94.1587 75.6031 87.1684 82.9874C74.2116 96.6746 52.2872 96.9114 39.0836 83.1777C27.2417 70.8651 26.7175 51.4722 37.8783 38.5104C47.9314 26.8593 64.1384 23.9663 77.2004 30.0912L73.4135 34.0915C72.4778 35.0799 72.5648 36.4412 73.582 36.6324L73.5944 36.6662Z" fill="#125EF2"/>
                    </g>
                    <defs>
                      <filter id="filter0_d_3112_32" x="0.53437" y="0.154053" width="125.049" height="124.983" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="2.4754"/>
                        <feGaussianBlur stdDeviation="1.2377"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3112_32"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3112_32" result="shape"/>
                      </filter>
                    </defs>
                  </svg>`}
                />
              </View>
            </View>

            <View style={styles.enterPhone}>
              <Text style={styles.enterPhoneTitle}>הכניסו מספר טלפון</Text>
              <GenericPhoneInput
                svgButtonSource={`<svg width="69" height="34" viewBox="0 0 69 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_5680_54)">
                  <path d="M38.7967 16.1863L29.1367 16.2048C28.8419 16.2053 28.6005 16.4462 28.6011 16.7399L28.6069 19.7813C28.6075 20.078 28.8468 20.315 29.1446 20.3144L33.0605 20.3069C32.8973 21.3398 32.5538 22.1179 32.0241 22.6441C31.2206 23.4438 30.1303 23.8465 28.7533 23.8491C27.2023 23.8521 25.9629 23.3619 25.0351 22.3815C23.7794 21.0665 23.1482 19.4209 23.1444 17.4477C23.1426 16.4952 23.3148 15.572 23.6581 14.6812C24.5823 12.2582 26.2224 11.0444 28.5755 11.0399C29.7284 11.0377 30.7228 11.38 31.5585 12.0638C32.0488 12.4724 32.4893 13.0531 32.88 13.806C33.0072 14.0521 33.3052 14.1583 33.5586 14.051L37.6717 12.3429C37.9634 12.2207 38.0896 11.8733 37.9386 11.5947C37.1278 10.1067 36.1732 8.96314 35.0777 8.16408C33.371 6.90924 31.288 6.28418 28.8258 6.28889C25.1459 6.29593 22.282 7.47347 20.2342 9.82447C18.4276 11.8872 17.5273 14.4348 17.5331 17.4614C17.5383 20.1942 18.3154 22.5427 19.8642 24.51C21.9127 27.1054 24.8491 28.3994 28.6706 28.3921C31.0177 28.3876 33.0513 27.8259 34.7682 26.7039C36.544 25.5344 37.8176 23.8644 38.5861 21.6998C39.0495 20.3933 39.2999 18.7371 39.3344 16.7283C39.3397 16.4286 39.0974 16.1827 38.7967 16.1833L38.7967 16.1863Z" fill="#125EF2"/>
                  </g>
                  <g filter="url(#filter1_d_5680_54)">
                  <path d="M54.0821 13.0416L60.5208 14.3415C60.7461 14.3883 61.0178 14.1014 60.9607 13.8768L59.3364 7.49116C59.2888 7.30402 59.0397 7.2996 58.8654 7.48376L58.243 8.14117C53.7346 5.16047 47.5409 5.85062 43.8245 10.0959C40.021 14.4375 40.1977 20.9754 44.2262 25.0976C48.6263 29.5998 55.8739 29.5013 60.1674 24.9658C62.5715 22.4261 63.6259 18.9254 63.0421 15.4979C62.9912 15.2021 62.7048 15.0082 62.4097 15.0739L58.6042 15.9216C58.3402 15.9803 58.1621 16.2461 58.1995 16.513C58.4566 18.3521 57.8689 20.2117 56.5817 21.5715C54.1957 24.0919 50.1585 24.1355 47.7271 21.6065C45.5465 19.3392 45.45 15.7681 47.5052 13.3812C49.3564 11.2358 52.3408 10.703 54.7461 11.8309L54.0488 12.5675C53.8765 12.7495 53.8925 13.0002 54.0798 13.0354L54.0821 13.0416Z" fill="#125EF2"/>
                  </g>
                  <path d="M8.47409 22.579C8.53836 22.6422 8.58956 22.7175 8.62474 22.8005C8.65992 22.8836 8.6784 22.9727 8.67913 23.0629C8.67986 23.1531 8.66282 23.2425 8.62898 23.3261C8.59515 23.4097 8.54518 23.4858 8.48193 23.5501C8.41868 23.6143 8.34339 23.6655 8.26035 23.7007C8.17732 23.7359 8.08817 23.7544 7.99799 23.7551C7.90782 23.7558 7.81838 23.7388 7.73479 23.705C7.6512 23.6711 7.57509 23.6212 7.51081 23.5579L1.45454 17.5953C1.32948 17.4723 1.25624 17.3061 1.24986 17.1308C1.24349 16.9555 1.30445 16.7844 1.42025 16.6526L7.02732 10.2651C7.08637 10.1959 7.15858 10.1392 7.23975 10.0982C7.32093 10.0571 7.40944 10.0326 7.50015 10.0261C7.59087 10.0196 7.68198 10.0311 7.76819 10.0601C7.8544 10.0891 7.934 10.1349 8.00235 10.1949C8.0707 10.2549 8.12645 10.3279 8.16636 10.4096C8.20627 10.4913 8.22954 10.5802 8.23483 10.671C8.24011 10.7618 8.2273 10.8527 8.19714 10.9385C8.16698 11.0243 8.12008 11.1033 8.05914 11.1708L2.87954 17.0715L8.47409 22.579Z" fill="#125EF2" stroke="#125EF2"/>
                  <defs>
                  <filter id="filter0_d_5680_54" x="15.0578" y="6.28882" width="26.7516" height="27.0541" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="2.4754"/>
                  <feGaussianBlur stdDeviation="1.2377"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5680_54"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5680_54" result="shape"/>
                  </filter>
                  <filter id="filter1_d_5680_54" x="38.6086" y="6.31812" width="27.067" height="27.0541" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="2.4754"/>
                  <feGaussianBlur stdDeviation="1.2377"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5680_54"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5680_54" result="shape"/>
                  </filter>
                  </defs>
                  </svg>
                  `}
                // imageButton={smallGo}
                isValidInput={isValidInput}
                setIsValidInput={(value) => setIsValidInput(value)}
                regex={/^(0\d{9}|\d{9})+$/}
                placeholder="מספר טלפון"
                onInputChange={handlePhoneNumberChange}
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
  ReadySet: {
    color: "#125EF2",
    textAlign: "right",
    // text-shadow: 0px 1px 1.4800000190734863px rgba(0, 0, 0, 0.25);
    fontFamily: "Rubik Bold",
    fontSize: 28,
    // fontStyle: "normal",
    // fontWeight: "800",
    marginBottom: 20,
    // lineHeight: "normal",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  go: {
    flexDirection: "row",
  },
  enterPhone: {},
  enterPhoneTitle: {
    color: "#000",
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
  title: {
    color: "#000",
    textAlign: "right",
    fontFamily: "FbAbsolutiHeb-Bold",
    fontSize: 40,
    fontWeight: "400",
    width: "100%",
    marginBottom: 0,
    // left: 35,
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
