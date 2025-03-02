import React, { FC } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
type OperationSuccessfulPageProps = {
  message?: string;
  goBackCallback?: () => void;
};
const OperationFailurePage: FC<OperationSuccessfulPageProps> = ({
  message = "",
  goBackCallback
}) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <FontAwesome name="times-circle" size={100} color="red" />
      <Text style={styles.title}>Operation Failed</Text>
      <Text style={styles.message}>
        {message ? message : "Something went wrong. Please try again."}
      </Text>
      <Button
        title="Go Back"
        onPress={() => (goBackCallback ? goBackCallback() : router.back())}
      />
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
  title: { fontSize: 24, fontWeight: "bold", color: "red" },
  message: { fontSize: 18, marginTop: 10, color: "red" },
});
export default OperationFailurePage;
