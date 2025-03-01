import React, { FC } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
type OperationSuccessfulPageProps = {
  messege?: string;
};
const OperationFailurePage: FC<OperationSuccessfulPageProps> = ({
  messege="",
}) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <FontAwesome name="times-circle" size={100} color="red" />
      <Text style={styles.title}>Operation Failed</Text>
      <Text style={styles.message}>
        {messege ? messege : "Something went wrong. Please try again."}
      </Text>
      <Button title="Go Back" onPress={() => router.back()} />
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
