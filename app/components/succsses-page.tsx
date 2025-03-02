import React, { FC } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Using FontAwesome for the check mark
import { useRouter } from "expo-router";

type OperationSuccessfulPageProps = {
  messege: string;
  goBackCallback?: () => void;
};
const OperationSuccessfulPage: FC<OperationSuccessfulPageProps> = ({
  messege,
  goBackCallback,
}) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <FontAwesome name="check-circle" size={100} color="green" />
      <Text style={styles.title}>Operation Successful</Text>
      <Text style={styles.message}>
        {messege ? messege : "Your operation was completed successfully."}
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
    backgroundColor: "#e5f7e5",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "green" },
  message: { fontSize: 18, marginTop: 10, color: "green" },
});
export default OperationSuccessfulPage;
