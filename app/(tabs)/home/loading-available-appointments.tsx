import React, { FC, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { BackHandler } from "react-native";
import * as Animatable from "react-native-animatable";
import { useAppointments } from "../../contexts/appointment-context";
import { useLocalSearchParams } from "expo-router";
type LoadingAvailableAppointmentsProps = {
  type: string;
  subtype: string | undefined;
  doctorId: string | undefined;
  date: string | undefined;
};
const LoadingAvailableAppointments = () => {
  const { type, subtype, doctorId, date } =
    useLocalSearchParams() as LoadingAvailableAppointmentsProps;
  const router = useRouter();
  const { fetchAvailableAppointments, setAvailableAppointmentsList } =
    useAppointments();
  useEffect(() => {
    const backAction = () => {
      return true; // Prevents going back
    };

    // Add event listener to block the back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    const handleSubmit = async () => {
      try {
        const payload = {
          type: type,
          subtype: subtype,
          doctorId: doctorId,
          date: date,
        };

        // console.log("Fetching available appointments with payload:", payload);
        const response = await fetchAvailableAppointments(payload);

        if (response.length > 0) {
          setAvailableAppointmentsList(response);
          router.replace("/home/available-appointments");
        } else {
          router.replace("/home/Faliure-fetching-available-appointments");
        }
      } catch (error: any) {
        console.error(
          "Error fetching available appointments:",
          error?.response?.data
        );
        router.replace("/home/Faliure-fetching-available-appointments");
      }
    };

    const timeout = setTimeout(() => {
      handleSubmit();
    }, 5000);

    return () => {
      backHandler.remove();
      clearTimeout(timeout);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading</Text>
      <View style={styles.dotsContainer}>
        <Text style={styles.dot}>●</Text>
        <Text style={styles.dot}>●</Text>
        <Animatable.Text
          style={styles.dot}
          animation={{
            0: { opacity: 0.2 },
            0.5: { opacity: 1 },
            1: { opacity: 0.2 },
          }}
          iterationCount="infinite"
          duration={600}
          easing="linear"
        >
          ●
        </Animatable.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  dotsContainer: { flexDirection: "row", alignItems: "center" },
  dot: { fontSize: 40, color: "#000", marginHorizontal: 5 },
  link: { fontSize: 18, color: "blue", marginTop: 20 },
});
export default LoadingAvailableAppointments;
