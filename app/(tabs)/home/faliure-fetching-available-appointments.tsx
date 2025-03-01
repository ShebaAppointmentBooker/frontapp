import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import OperationFailurePage from "../../components/faliure-page";
export default function FailiureFetchingAvailableAppointments() {
  return (
    <OperationFailurePage messege="We couldnt find Appointments matching your details" />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
