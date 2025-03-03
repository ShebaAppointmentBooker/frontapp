import { appointmentType } from "@/app/types/appointmentType";
import { useAppointments } from "../../contexts/appointment-context";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    weekday: "short", // "Mon"
    month: "long", // "March"
    day: "numeric", // "2"
    year: "numeric", // "2025"
    hour: "numeric", // "3"
    minute: "2-digit", // "30"
    hour12: true, // AM/PM format
  });
};

export const AppointmentCard = ({
  appointment,
  cancelFunc,
}: {
  appointment: appointmentType;
  cancelFunc?: (appointmentId: string) => Promise<void>;
}) => {
  const { cancelAppointment } = useAppointments();
  return (
    <View style={styles.card}>
      <Text style={styles.dateText}>{formatDateTime(appointment.date)}</Text>
      <Text style={styles.specializationText}>
        {appointment.specialization} - {appointment.appointmentType}
      </Text>
      <Text style={styles.doctorText}>{appointment.doctor.name}</Text>

      {appointment.resolution ? (
        <Text style={styles.resolutionText}>
          Resolution: {appointment.resolution}
        </Text>
      ) : null}

      {appointment.resolution === "Cancelled" && (
        <Text style={styles.cancelledText}>Cancelled</Text>
      )}

      {cancelFunc && (
        <Button
          title="Cancel"
          color="#d9534f"
          onPress={() =>
            Alert.alert(
              "Cancel Appointment?", // Title
              "It Will Be Available For Everyone", // Message
              [
                {
                  text: "No",
                  style: "cancel", // Cancels the alert
                },
                {
                  text: "Yes",
                  onPress: () => {
                    console.log("User confirmed! Executing function...");
                    cancelFunc(appointment.appointmentId); // Call your function here
                  },
                },
              ]
            )
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  specializationText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  doctorText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  resolutionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
    marginTop: 5,
  },
  cancelledText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
    marginTop: 5,
  },
});
