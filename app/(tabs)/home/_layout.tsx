import React from "react";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="appointmentForm" options={{ title: "Appointment Form" }} />
      <Stack.Screen name="availableAppointments" options={{ title: "Available Appointments" }} />
    </Stack>
  );
}
