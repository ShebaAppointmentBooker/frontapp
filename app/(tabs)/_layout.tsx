import React, { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useAuth } from "../contexts/auth-context";
import { useSegments } from "expo-router";
export default function MainLayout() {
  const { logout, token } = useAuth();
  const router = useRouter();
  const segment = useSegments();
  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [token]);

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarStyle:
            segment[2] === "loading-available-appointments"
              ? { display: "none" } // Hide tab bar
              : {},
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          // headerRight: () => (
          //   <View style={styles.headerRightContainer}>
          //     <TouchableOpacity style={styles.logout} onPress={logout}>
          //       <Text style={styles.logoutText}>Logout</Text>
          //     </TouchableOpacity>
          //   </View>
          // ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
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
