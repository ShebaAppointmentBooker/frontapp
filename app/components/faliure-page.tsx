import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type OperationFailurePageProps = {
  message?: string;
  goBackCallback?: () => void;
};

const OperationFailurePage: FC<OperationFailurePageProps> = ({
  message = "Something went wrong. Please try again.",
  goBackCallback,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FontAwesome name="times-circle" size={100} color="red" />
      <Text style={styles.title}>Oops! Failed</Text>
      <Text style={[styles.message, { fontSize: message.length > 40 ? 16 : 20 }]}>
        {message}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => (goBackCallback ? goBackCallback() : router.back())}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8d7da",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "red",
    marginTop: 10,
  },
  message: {
    textAlign: "center",
    color: "red",
    marginVertical: 15,
    maxWidth: "90%",
  },
  button: {
    marginTop: 20,
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OperationFailurePage;
