import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const CollapsibleSection = ({
  title,
  isVisible,
  setIsVisible,
  children,
}: any) => (
  <View style={styles.section}>
    <TouchableOpacity
      onPress={() => setIsVisible(!isVisible)}
      style={styles.sectionHeader}
    >
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text>{isVisible ? "▲" : "▼"}</Text>
    </TouchableOpacity>
    {isVisible && <View style={styles.sectionBody}>{children}</View>}
  </View>
);
export default CollapsibleSection;
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  section: { marginBottom: 10 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  sectionBody: { padding: 10, backgroundColor: "#f9f9f9", borderRadius: 5 },
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
