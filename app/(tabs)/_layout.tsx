import React, { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useAuth } from "../contexts/auth-context";

export default function MainLayout() {
  const { logout, token } = useAuth();
  const router = useRouter();

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
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity style={styles.logout} onPress={logout}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          ),
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
