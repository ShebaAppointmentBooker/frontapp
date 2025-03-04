import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type OperationSuccessfulPageProps = {
  message: string;
  goBackCallback?: () => void;
};

const OperationSuccessfulPage: FC<OperationSuccessfulPageProps> = ({
  message,
  goBackCallback,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FontAwesome name="check-circle" size={100} color="green" />
      <Text style={styles.title}>Success!</Text>
      <Text style={[styles.message, { fontSize: message.length > 40 ? 16 : 20 }]}>
        {message || "Your operation was completed successfully."}
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
    backgroundColor: "#e5f7e5",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "green",
    marginTop: 10,
  },
  message: {
    textAlign: "center",
    color: "green",
    marginVertical: 15,
    maxWidth: "90%",
  },
  button: {
    marginTop: 20,
    backgroundColor: "green",
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

export default OperationSuccessfulPage;
