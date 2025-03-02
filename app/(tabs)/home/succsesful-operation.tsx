import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import OperationSuccessfulPage from "@/app/components/succsses-page";
import { useAppointments } from "../../contexts/appointment-context";
import { useRouter } from "expo-router";
type SuccsessfulOperationProps = {
  message: string;
};
export default function SuccsessfulOperation() {
  const { message } = useLocalSearchParams() as SuccsessfulOperationProps;
  const router = useRouter();
  const { setAvailableAppointmentsList } = useAppointments();
  
  return (
    <OperationSuccessfulPage
    message={message ? message : "operation successful"}
      goBackCallback={() => {
        setAvailableAppointmentsList([]);
        router.replace("/");
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
