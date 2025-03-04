import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../contexts/auth-context";
import { Feather } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function SettingsScreen() {
  const { logout, user, updatePatient } = useAuth();
  const [tempEmail, setTempEmail] = useState(user.email);
  const [tempMedicalHistory, setTempMedicalHistory] = useState(
    user.medicalHistory
  );
  const [tempPhone, setTempPhone] = useState(user.phone);
  // Track which field is being edited
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => logout() },
    ]);
  };

  const handleSave = async (field: string, value: string) => {
    try {
      if (value) await updatePatient({ [field]: value });

      setEditingField(null); // Stop editing once saved
    } catch (e) {
      console.error(e);
      // Revert to initial values in case of error
      switch (field) {
        case "email":
          setTempEmail(user.email);
          break;
        case "medicalHistory":
          setTempMedicalHistory(user.medicalHistory);
          break;
        case "phone":
          setTempPhone(user.phone);
          break;
      }
    }
  };

  const handleDiscard = (field: string) => {
    switch (field) {
      case "email":
        setTempEmail(user.email);
        break;
      case "medicalHistory":
        setTempMedicalHistory(user.medicalHistory);
        break;
      case "phone":
        setTempPhone(user.phone);
        break;
    }
    setEditingField(null); // Stop editing
  };

  useEffect(() => {
    setTempEmail(user.email);
    setTempMedicalHistory(user.medicalHistory);
    setTempPhone(user.phone);
  }, [user]);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // Trigger the discard edit action if the keyboard is hidden
        handleDiscard(editingField ? editingField : "");
      }
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Greeting */}
      <Text style={styles.greeting}>Hello, {user.name} 👋</Text>

      {/* Editable Fields */}
      {[
        {
          label: "Email",
          field: "email",
          value: tempEmail,
          setValue: setTempEmail,
          editing: editingField === "email",
        },
        {
          label: "Phone",
          field: "phone",
          value: tempPhone,
          setValue: setTempPhone,
          editing: editingField === "phone",
        },
        {
          label: "Medical History",
          field: "medicalHistory",
          value: tempMedicalHistory,
          setValue: setTempMedicalHistory,
          editing: editingField === "medicalHistory",
          multiline: true,
        },
      ].map(({ label, field, value, setValue, editing, multiline },index) => {
        const inputRef = useRef<any>(null);
        if (!editing) if (editingField) return <></>;

        return (
          <View  key={index} style={[styles.editContainer, {}]}>
            <Text style={styles.label}>{label}:</Text>
            <View style={styles.inputContainer}>
              {editing ? (
                <TextInput
                  style={[styles.input, multiline && styles.textArea]}
                  value={value || ""}
                  onChangeText={setValue}
                  multiline={multiline}
                  ref={inputRef}
                />
              ) : (
                <Text style={styles.text}>{value || "Not provided"}</Text>
              )}

              {editing ? (
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.saveButton]}
                    onPress={() => handleSave(field, value || "")}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.discardButton]}
                    onPress={() => handleDiscard(field)}
                  >
                    <Text style={styles.buttonText}>Discard</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setEditingField(field);
                    setTimeout(() => {
                      if (inputRef.current) inputRef.current.focus();
                    }, 500);
                  }}
                  style={styles.iconButton}
                >
                  <Feather name="edit-3" size={20} color="#007AFF" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}

      {/* Logout */}
      <TouchableOpacity
        style={[styles.option, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={[styles.optionText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>

      {/* Book an appointment */}
      <Link href="/home/appointment-form" style={styles.bookLink}>
        Book an Appointment
      </Link>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  editContainer: {
    width: SCREEN_WIDTH * 0.9,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  text: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  input: {
    fontSize: 16,
    padding: 5,
    flex: 1,
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  iconButton: {
    padding: 5,
  },
  buttonGroup: {
    flexDirection: "row",
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  discardButton: {
    backgroundColor: "#ff4d4d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  option: {
    width: SCREEN_WIDTH * 0.9,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#ffcc00",
  },
  logoutText: {
    fontWeight: "bold",
  },
  bookLink: {
    fontSize: 16,
    color: "#007AFF",
    marginTop: 20,
  },
});
