import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Link href="/home/appointmentForm">
        <Button title="Go to Appointment Form" />
      </Link>
      <Link href="/home/availableAppointments">
        <Button title="View Available Appointments" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
