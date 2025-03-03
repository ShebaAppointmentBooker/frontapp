import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import CollapsibleSection from "../../components/collapsible-section";
import { useAppointments } from "../../contexts/appointment-context";
import { useAuth } from "@/app/contexts/auth-context";
import { appointmentType } from "@/app/types/appointmentType";
import { AppointmentCard } from "./appointment-card";

export default function HomeScreen() {
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    appointmentType[]
  >([]);
  const [pastAppointments, setPastAppointments] = useState<appointmentType[]>(
    []
  );
  const [upcomingVisible, setUpcomingVisible] = useState(false);
  const [pastVisible, setPastVisible] = useState(false);
  const { getPatientAppointments, cancelAppointment } = useAppointments();
  const { user } = useAuth();
  const PostCancelAppointment = async (appointmentId: string) => {
    try {
      await cancelAppointment(appointmentId);
      setUpcomingAppointments((prev) =>
        prev.filter(
          (appointment) => appointment.appointmentId !== appointmentId
        )
      );
      Alert.alert(
        "Appointment Canceled",
        "You Can No Longer Attend This Appointment"
      );
    } catch (error: any) {
      console.error(
        "Error fetching available appointments:",
        error?.response?.data
      );
    }
  };
  useEffect(() => {
    // Fetch upcoming appointments
    getPatientAppointments(false)
      .then(setUpcomingAppointments)
      .catch((err) =>
        console.error("Error fetching upcoming appointments:", err)
      );

    // Fetch past appointments
    getPatientAppointments(true)
      .then(setPastAppointments)
      .catch((err) => console.error("Error fetching past appointments:", err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {user}!</Text>

      {/* Upcoming Appointments Section */}
      <CollapsibleSection
        title="Upcoming Appointments"
        isVisible={upcomingVisible}
        setIsVisible={setUpcomingVisible}
      >
        <FlatList
          data={upcomingAppointments}
          keyExtractor={(item) => item.appointmentId}
          renderItem={({ item }) => (
            <AppointmentCard
              appointment={item}
              cancelFunc={PostCancelAppointment}
            />
          )}
        />
      </CollapsibleSection>

      {/* Past Appointments Section */}
      <CollapsibleSection
        title="Past Appointments"
        isVisible={pastVisible}
        setIsVisible={setPastVisible}
      >
        <FlatList
          data={pastAppointments}
          keyExtractor={(item) => item.appointmentId}
          renderItem={({ item }) => <AppointmentCard appointment={item} />}
        />
      </CollapsibleSection>

      {/* Booking Link */}
      <Link href="/home/appointment-form" style={styles.bookLink}>
        Book Appointment
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  appointmentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  appointmentText: { fontSize: 16, fontWeight: "bold" },
  doctorText: { fontSize: 14, color: "gray" },
  resolutionText: { fontSize: 14, fontWeight: "bold", color: "blue" },
  cancelledText: { fontSize: 14, fontWeight: "bold", color: "red" },
  bookLink: { fontSize: 18, color: "blue", textAlign: "center", marginTop: 20 },
});
