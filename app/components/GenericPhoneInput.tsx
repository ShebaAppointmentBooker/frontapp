import React, { FC, useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  TextInputProps,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";
import { SvgXml } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";

type GenericPhoneInputProps = {
  placeholder?: string;
  regex?: RegExp;
  onInputChange: (text: string) => void;
  onBlur?: () => void;
  style?: StyleProp<ViewStyle>;
  isValidInput?: boolean;
  setIsValidInput: (isValid: boolean) => void;
  showSoftInputOnFocus?: boolean;
  imageButton?: boolean;
  svgButtonSource: string;
  onPress?: () => void;
};
const GenericPhoneInput: FC<GenericPhoneInputProps> = ({
  placeholder,
  regex,
  onInputChange,
  onBlur,
  style,
  isValidInput,
  setIsValidInput,
  showSoftInputOnFocus,
  imageButton,
  svgButtonSource,
  onPress,
}) => {
  const [inputValue, setInputValue] = useState("");
  // const [isValidInput, setIsValidInput] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (onBlur && !inputValue) {
      // Notify the parent component when the input loses focus and is empty
      onBlur();
    }
  }, [inputValue, onBlur]);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    onInputChange(text); // Notify the parent component about the input change
    setIsValidInput(regex ? regex.test(text) : true);

    // Fade in the icons and move up the placeholder when the input changes
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(translateYAnim, {
        toValue: -20,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleFocus = () => {
    // Fade in the icons and move up the placeholder when the input is focused
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(translateYAnim, {
        toValue: -20,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleBlur = () => {
    // Fade out the icons and move down the placeholder when the input loses focus
    if (!inputValue) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <SvgXml onPress={onPress} style={{}} xml={svgButtonSource} />

      <View style={styles.iconContainer}>
        {isValidInput ? (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Icon name="checkmark-circle" size={20} color="green" />
          </Animated.View>
        ) : (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Icon name="close-circle" size={20} color="red" />
          </Animated.View>
        )}
      </View>
      {!inputValue && (
        <Animated.View
          style={[
            styles.placeholderContainer,
            { transform: [{ translateY: translateYAnim }] },
          ]}
        >
          <Text
            style={[
              styles.placeholder,
              svgButtonSource ? { marginTop: -4 } : {},
            ]}
          >
            {placeholder}
          </Text>
        </Animated.View>
      )}
      <TextInput
        placeholder=""
        placeholderTextColor="rgba(0, 0, 0, 0.50)"
        style={styles.input}
        value={inputValue}
        onChangeText={handleInputChange}
        // onSubmitEditing={Keyboard.dismiss}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType="numeric"
        autoCapitalize="none"
        maxLength={10} //setting limit of input
        // showSoftInputOnFocus={showSoftInputOnFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    width: "100%",
    height: 41,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D6D6",
    // backgroundColor: "#EFEFEF",
    // borderRadius: 5,
    // elevation: 5,
    // shadowColor: "black",
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.25,
    // shadowRadius: 5,
  },
  input: {
    flex: 4,
    color: "#000",
    opacity: 0.5,
    fontSize: 17,
    textAlign: "center",
    // marginLeft:40
    // paddingLeft:20
    // fontWeight: "400",
    // paddingVertical: 10,

    // textAlign: "right",
  },
  codeContainer: {
    flex: 1,
    // opacity:0.5,
    fontSize: 20,
    color: "#125EF2",
    fontFamily: "Rubik Bold",
  },
  placeholderContainer: {
    position: "absolute",
    top: 12,
    right: 10,
  },
  placeholder: {
    fontSize: 16,
    color: "#7C7C7C",
    // marginTop:-4
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
  },
});

export default GenericPhoneInput;
