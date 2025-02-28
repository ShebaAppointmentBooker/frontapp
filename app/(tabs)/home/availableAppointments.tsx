import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppointments } from "../../contexts/appointment-context";

export default function AvailableAppointments() {
  const router = useRouter();
  const { availableAppointmentsList } = useAppointments();
  useEffect(()=>{console.log(availableAppointmentsList[2])},[availableAppointmentsList])
  const renderAppointment = ({ item }: any) =>{
    // console.log(item)
    return(
    <View style={styles.card}>
      <Text selectable style={styles.date}>
        {new Date(item.date).toLocaleDateString()} -{" "}
        {new Date(item.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </Text>
      <Text selectable style={styles.text}>
        Doctor: {item.doctor.name} ({item.doctor.email})
      </Text>
      <Text selectable style={styles.text}>Specialization: {item.specialization}</Text>
      <Text selectable style={styles.text}>Type: {item.appointmentType}</Text>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => Alert.alert("Book Appointment", "Booking feature not implemented yet!")}
      >
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </View>
  )};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Appointments</Text>
      {availableAppointmentsList.length > 0 ? (
        <FlatList
          data={availableAppointmentsList}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.appointmentId}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noAppointmentsText}>No available appointments found.</Text>
      )}
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center", fontWeight: "bold" },
  listContainer: { paddingBottom: 20 },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  date: { fontSize: 16, fontWeight: "bold", marginBottom: 5, color: "#333" },
  text: { fontSize: 14, color: "#555", marginBottom: 5 },
  noAppointmentsText: { fontSize: 16, color: "#888", textAlign: "center", marginBottom: 20 },
  bookButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  bookButtonText: { color: "white", fontWeight: "bold" },
});
