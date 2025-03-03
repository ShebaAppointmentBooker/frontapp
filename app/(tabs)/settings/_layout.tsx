import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity, View,StyleSheet,Text } from "react-native";
import { useAuth } from "../../contexts/auth-context";
export default function SettingsLayout() {
  const { logout, token } = useAuth();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "settings",
          headerShown: false
        }}
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
