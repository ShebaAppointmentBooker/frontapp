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
              <TouchableOpacity style={styles.logout} onPress={()=>{
                console.log("hi")
                logout()}}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="appointment-form"
        options={{ title: "Appointment Form" }}
      />
      <Stack.Screen
        name="available-appointments"
        options={{ title: "Available Appointments" }}
      />
      <Stack.Screen
        name="loading-available-appointments"
        options={{  headerShown: false }}
      />
      <Stack.Screen
        name="loading-booking-appointment"
        options={{  headerShown: false }}
      />
      <Stack.Screen
        name="succsesful-operation"
        options={{  headerShown: false }}
      />
      <Stack.Screen
        name="faliure-operation"
        options={{ headerShown: false }}
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
