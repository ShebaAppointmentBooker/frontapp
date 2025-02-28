import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity, View,StyleSheet,Text } from "react-native";
import { useAuth } from "../../contexts/auth-context";
export default function HomeLayout() {
  const { logout, token } = useAuth();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "home",
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity style={styles.logout} onPress={logout}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="appointmentForm"
        options={{ title: "Appointment Form" }}
      />
      <Stack.Screen
        name="availableAppointments"
        options={{ title: "Available Appointments" }}
      />
    </Stack>
  );
}
const styles = StyleSheet.create({
  headerRightContainer: {
    paddingRight: 10,
  },
  logout: {
    backgroundColor: "red",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});
