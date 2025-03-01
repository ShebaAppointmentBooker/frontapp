import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Using FontAwesome for the check mark
type OperationSuccessfulPageProps = {
  messege: string;
};
const OperationSuccessfulPage: FC<OperationSuccessfulPageProps> = ({
    messege,
}) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="check-circle" size={100} color="green" />
      <Text style={styles.title}>Operation Successful</Text>
      <Text style={styles.message}>
        Your operation was completed successfully.
      </Text>
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
  title: { fontSize: 24, fontWeight: "bold", color: "green" },
  message: { fontSize: 18, marginTop: 10, color: "green" },
});
export default OperationSuccessfulPage