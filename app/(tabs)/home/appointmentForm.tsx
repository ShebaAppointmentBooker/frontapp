import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAppointments } from "../../contexts/appointment-context";

export default function AppointmentForm() {
  const router = useRouter();
  const [appointmentType, setAppointmentType] = useState<string>("");
  const { fetchAvailableAppointments,setAvailableAppointmentsList } = useAppointments();

  const handleSubmit = async () => {
    if (!appointmentType.trim()) {
      Alert.alert("Validation Error", "Appointment type cannot be empty.");
      return;
    }
    try {
      console.log("Fetching available appointments for:", appointmentType);
      const response = await fetchAvailableAppointments(appointmentType.trim());
      // console.log("Available Appointments:", response);
      if(response.length>0){
        setAvailableAppointmentsList(response)
        router.replace("/home/availableAppointments");
      }
    } catch (error: any) {
      console.error("Error fetching available appointments:", error?.response?.data);
      Alert.alert("Error", "Failed to fetch available appointments.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Form</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Appointment Type"
        value={appointmentType}
        onChangeText={setAppointmentType}
      />
      
      <Button title="Search Appointments" onPress={handleSubmit} />
      
      <View style={styles.spacer} />
      
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  spacer: { height: 20 },
});
