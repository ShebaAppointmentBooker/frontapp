import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import * as Animatable from "react-native-animatable";

export default function LoadingPage() {
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
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  dotsContainer: { flexDirection: "row", alignItems: "center" },
  dot: { fontSize: 40, color: "#000", marginHorizontal: 5 },
  link: { fontSize: 18, color: "blue", marginTop: 20 },
});
