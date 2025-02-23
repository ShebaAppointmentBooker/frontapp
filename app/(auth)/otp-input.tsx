import React, { useState, useRef, useEffect, FC } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Vibration,
  // Clipboard,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../services/scaling/scaling";
type OTPInputProps = {
  pinCount : number;
  onCodeFilled: (phoneNumber:string) => Promise<void>;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  error?:boolean;
  autoFocus?:boolean;
  secureTextEntry?:boolean;
  otpTimeout ?: number;
  resendOTP: () => void;
};
type selectionType={ start: number, end: number }
const OTPInput: FC<OTPInputProps> = ({
  pinCount = 6,
  onCodeFilled,
  style,
  inputStyle,
  error,
  autoFocus = true,
  secureTextEntry = false,
  otpTimeout = 20,
  resendOTP,
}) => {
  const [code, setCode] = useState(new Array(pinCount).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [timer, setTimer] = useState(otpTimeout);
  const [selection, setSelection] = useState<selectionType>();
  const inputsRef = useRef<TextInput[]>([]);
  const mainInputsRef = useRef<TextInput>(null);
  const opacity = useRef(new Animated.Value(1)).current;

  // const pasteOTP = async () => {
  //   const clipboardContent = await Clipboard.getString();
  //   if (clipboardContent && clipboardContent.length === pinCount) {
  //     const newCode = clipboardContent.split("");
  //     setCode(newCode);
  //     onCodeFilled && onCodeFilled(newCode.join(""));
  //     // Focus the last input after pasting
  //     inputsRef.current[pinCount - 1].focus();
  //   }
  // };

  
  const handleFocusAtPosition = (position:number) => {
    // Example: Position the cursor after the 3rd character (index 2)
    // Or highlight the 3rd character by setting selection start and end around it
    // Index of the character to highlight or position cursor after
    if (mainInputsRef.current) {
      console.log(position + 1);
      mainInputsRef.current.focus();
      setSelection({ start: position + 1, end: position + 1 });
    }
  };
  const handleChangeMain = (text:string) => {
    // let tempArray = text.split("").slice(0, 6);
    let tempArray = text.split("");

    console.log(text.length, code.join("").length, selection?.start);
    if (selection) {
      // if(tempArray.length===pinCount+1){

      // }else
      if (text[selection.start] && text.length >= code.join("").length) {
        console.log("hiii");
        tempArray.splice(selection.start, 1);
        tempArray[selection.start - 1] = text[selection.start];
        setSelection({
          start: selection.start + 1,
          end: selection.start + 1,
        });
      } else if (
        text.length === selection?.start &&
        text.length >= code.join("").length
      )
        setSelection({
          start: selection.start + 1,
          end: selection.start + 1,
        });
      else {
        if (tempArray.length < pinCount - 1 || selection.start < pinCount) {
          console.log(selection?.start, "lol");
          tempArray.splice(selection.start - 1, 0, " ");
        }
        setSelection({ start: selection.start - 1, end: selection.start - 1 });
      }
      // if (tempArray[selection.start])

      // else setSelection(null);
    }
    let counter = tempArray.length - 1;
    while (tempArray[counter] === " ") {
      tempArray.pop();
      counter--;
    }
    // Convert to array and ensure it does not exceed 6 characters
    while (tempArray.length < 6) {
      tempArray.push(""); // Fill the remaining spaces with empty spaces
    }
    setCode(tempArray);
  };
  const focusLastInput = () => {
    inputsRef.current[pinCount - 1].focus();
  };

  const notifyCodeChange = (code:string) => {
    if (onCodeFilled) {
      onCodeFilled(code);
    }
  };

  const updateCodeAndHandleFocus = (text:string, index:number) => {
    const newCode = [...code];
    newCode[index] = text.charAt(0); // Take only the first character
    setCode(newCode);

    // Move focus to the next input if current input is filled, or to the previous if it's empty
    if (text && index < pinCount - 1) {
      inputsRef.current[index + 1].focus();
    } else if (!text && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  

  useEffect(() => {
    if (autoFocus) {
      // Focus the input right after the component mounts
      setTimeout(() => mainInputsRef?.current?.focus(), 0);

      // On Android, the keyboard might not open automatically in some cases.
      // As a workaround, you can explicitly ask for the keyboard to show up.
    }
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);
  useEffect(() => {
    if (code.every((val) => val.length === 1 && val !== " ")) {
      if (mainInputsRef.current) {
        mainInputsRef.current.blur(); // This removes the focus from the TextInput
      }
      notifyCodeChange(code.join(""));
    }
  }, [code]);
  useEffect(() => {
    console.log(selection?.start);
  }, [selection]);
 

  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  const animateInput = () => {
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      opacity.setValue(1);
    });
  };

  // Function to clear the OTP input
  const clearOTP = () => {
    setCode(new Array(pinCount).fill(""));
    animateInput();
  };

  // Function to handle text change on inputs
  // const handleChange = (text, index) => {
  //   const newCode = [...code];
  //   newCode[index] = text;
  //   setCode(newCode);

  //   if (text && index < pinCount - 1) {
  //     inputsRef.current[index + 1].focus();
  //   }
  //   if (!text && index > 0) {
  //     inputsRef.current[index - 1].focus();
  //   }

  //   if (newCode.every((val) => val)) {
  //     onCodeFilled && onCodeFilled(newCode.join(""));
  //   }
  // };

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[styles.container, style]}>
          <View style={styles.inputsRow}>
            {code.map((digit, index) => (
              <Animated.View
                key={index}
                style={{ opacity, marginHorizontal: 3 }}
              >
                <TouchableOpacity
                  // ref={(ref) => (inputsRef.current[index] = ref)}
                  style={[
                    styles.input,
                    inputStyle,
                    error && styles.errorInput,
                    selection?.start!==undefined&&selection?.start - 1 === index
                      ? {
                          shadowColor: "#0000ff",
                          borderWidth: 1,
                          borderColor: "#0000ff",
                        }
                      : {},
                  ]}
                  // keyboardType="numeric"
                  // maxLength={1}
                  onPress={() => {
                    if (index - code.join("").length <= 0)
                      handleFocusAtPosition(index);
                  }}
                  // onChangeText={(text) => handleChange(text, index)}
                  // onKeyPress={(e) => handleKeyPress(e, index)}
                  // onFocus={() => handleFocus(index)}
                  // onBlur={handleBlur}
                  // secureTextEntry={secureTextEntry && focusedIndex !== index}
                  // value={code[index] ? code[index] : ""}
                  // textAlign="center"
                >
                  <Text style={styles.text}>
                    {code[index] ? code[index] : ""}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
          <TextInput
            ref={mainInputsRef}
            style={styles.invisibleInput}
            keyboardType="numeric"
            maxLength={pinCount}
            selection={selection}
            onChangeText={handleChangeMain}
            // onKeyPress={(e) => handleKeyPress(e, index)}
            // onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            // secureTextEntry={secureTextEntry && focusedIndex !== index}
            value={code.join("")}
            textAlign="center"
          />
          <View style={styles.actions}>
            {/* <TouchableOpacity style={styles.pasteButton} onPress={pasteOTP}>
              <Text style={styles.buttonText}>הדבק ממקלדת</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.clearButton} onPress={clearOTP}>
              <Text
                style={{
                  color: "#7C7C7C",
                  fontFamily: "Rubik Medium",
                  fontSize: moderateScale(13),
                }}
                onPress={resendOTP}
              >
                לא קיבלתי קוד
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row-reverse" }}>
              <Text
                style={{
                  color: "#7C7C7C",
                  fontFamily: "Rubik Medium",
                  fontSize: moderateScale(13),
                }}
              >
                הקוד ישלח בעוד
              </Text>
              <Text
                style={{
                  color: "#125EF2",
                  fontFamily: "Rubik Medium",
                  fontSize: moderateScale(13),
                  marginRight: 7,
                }}
              >
                {` ${timer}s`}
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    // Container styles
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "center", // Adjusted for centering and spacing
    alignItems: "center",
  },
  input: {
    width: horizontalScale(43),
    height: verticalScale(53),
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: "#FFF",
    justifyContent: "center",
    // elevation: 4,

    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.12)",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 12,
      },
      android: {
        elevation: 10, // Increased elevation for a more pronounced shadow
      },
    }),

    marginHorizontal: horizontalScale(3),
    fontFamily: "Rubik Medium",
  },
  invisibleInput: {
    // color: "transparent", // Makes text transparent
    // backgroundColor: "transparent", // Ensures background is also transparent
    // borderColor: "transparent", // Hides the border
    // outline: "none", // Additional style to try and hide the outline/cursor on web
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  errorInput: {
    borderBottomColor: "red",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(11),
  },
  resendButton: {
    alignSelf: "center",
  },
  clearButton: {
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default OTPInput;
