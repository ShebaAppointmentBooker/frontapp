import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppointments } from "../../contexts/appointment-context";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { formIDs } from "@/app/types/formIDs";

export default function AppointmentForm() {
  const router = useRouter();
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [subtype, setSubtype] = useState<string>("");
  const [doctorId, setDoctorId] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [noTime, setNoTime] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectDoctor, setSelectDoctor] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<formIDs[]>([]);

  const {
    fetchAvailableAppointments,
    setAvailableAppointmentsList,
    fetchAllSpecializations,
    fetchAllAppointmentTypes,
    fetchDoctorsBySpecialization,
  } = useAppointments();

  const [specializations, setSpecializations] = useState<formIDs[]>([]);
  const [appointmentTypes, setAppointmentTypes] = useState<formIDs[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const specializationsData = await fetchAllSpecializations();
        setSpecializations(specializationsData);

        const appointmentTypesData = await fetchAllAppointmentTypes();
        setAppointmentTypes(appointmentTypesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!appointmentType.trim()) {
      Alert.alert("Validation Error", "Appointment type cannot be empty.");
      return;
    }
    try {
      console.log(date?.toDateString(),date?.toISOString())
      const payload = {
        type: appointmentType.trim(),
        subtype: subtype ? subtype.trim() : undefined,
        doctorId: doctorId ? doctorId.trim() : undefined,
        date: date ? date.toISOString() : undefined,
      };

      console.log("Fetching available appointments with payload:", payload);
      const response = await fetchAvailableAppointments(payload);

      if (response.length > 0) {
        setAvailableAppointmentsList(response);
        router.navigate("/home/availableAppointments");
      }
    } catch (error: any) {
      console.error(
        "Error fetching available appointments:",
        error?.response?.data
      );
      Alert.alert("Error", "Failed to fetch available appointments.");
    }
  };
  const handleDatePressAndroid = () => {
    DateTimePickerAndroid.open({
      value: date || new Date(),
      mode: "date",
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setDate(new Date(selectedDate.setHours(10, 0, 0, 0)));
          // if (noTime) {
          //   setDate(new Date(selectedDate.setHours(0, 0, 0, 0))); // Save only the date
          // } else {
          //   DateTimePickerAndroid.open({
          //     value: selectedDate,
          //     mode: "time",
          //     onChange: (event, selectedTime) => {
          //       if (selectedTime) {
          //         const finalDate = new Date(
          //           selectedDate.getFullYear(),
          //           selectedDate.getMonth(),
          //           selectedDate.getDate(),
          //           selectedTime.getHours(),
          //           selectedTime.getMinutes()
          //         );
          //         setDate(finalDate);
          //       }
          //     },
          //   });
          // }
        }
      },
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false); // Must close manually on Android
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleFetchDoctors = async (appointmentType: string) => {
    try {
      if (appointmentType) {
        const doctorsData = await fetchDoctorsBySpecialization(appointmentType);
        const transformedDoctors = doctorsData.map((doctor) => ({
          id: doctor._id,
          name: doctor.name,
        }));
        setDoctors(transformedDoctors);
      } else {
        Alert.alert(
          "Validation Error",
          "Please select a specialization first."
        );
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleSpecializationChange = (value: string) => {
    setAppointmentType(value);
    setDoctors([]); // Clear the doctors when specialization changes
    setDoctorId(""); // Reset selected doctor
    // setSelectDoctor(false); // Deselect doctor option
    if (value !== "no type") handleFetchDoctors(value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Appointment Form</Text>

      {/* Specialization Dropdown */}
      <Text style={styles.label}>Select Specialization:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={appointmentType}
          onValueChange={handleSpecializationChange}
        >
          <Picker.Item label="Select Specialization" value="no type" />
          {specializations.map((spec) => (
            <Picker.Item key={spec.id} label={spec.name} value={spec.id} />
          ))}
        </Picker>
      </View>

      {/* Subtype Dropdown */}
      <Text style={styles.label}>Select Appointment Type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={subtype}
          onValueChange={(value) => {
            setSubtype(value === "no type" ? "" : value);
            console.log("value", value);
          }}
        >
          <Picker.Item label="Select Subtype (Optional)" value="no type" />
          {appointmentTypes.map((type) => (
            <Picker.Item key={type.id} label={type.name} value={type.id} />
          ))}
        </Picker>
      </View>

      {/* Doctor Selection */}

      {/* <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            !appointmentType && styles.disabledButton,
          ]}
          onPress={() => {
            if (appointmentType) {
              setSelectDoctor(!selectDoctor);
              if (!selectDoctor) handleFetchDoctors();
            } else {
              Alert.alert("Please select a specialization first.");
            }
          }}
          disabled={!appointmentType}
        >
          <Text>{selectDoctor ? "Deselect Doctor" : "Select Doctor"}</Text>
        </TouchableOpacity>
      </View> */}

      {doctors.length > 0 && (
        <>
          <Text style={styles.label}>Select Doctor (Optional):</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={doctorId}
              onValueChange={(value) =>
                setDoctorId(value === "no type" ? "" : value)
              }
            >
              <Picker.Item label="Select Doctor" value="no type" />
              {doctors.map((doctor) => (
                <Picker.Item
                  key={doctor.id}
                  label={doctor.name}
                  value={doctor.id}
                />
              ))}
            </Picker>
          </View>
        </>
      )}

      {/* Date Picker */}
      <TouchableOpacity
        style={styles.radioButton}
        onPress={() => {
          setNoTime(!noTime);
          if (noTime) setDate(null); // Reset date when unchecking
        }}
      >
        <Text>{noTime ? "✓ No Date Selected" : "Select No Date"}</Text>
      </TouchableOpacity>
      {!noTime ? (
        Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateButtonText}>
              {date ? date.toLocaleString().split(",")[0] : "Pick a Date"}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleDatePressAndroid}
            style={styles.dateButton}
          >
            <Text style={styles.dateButtonText}>
            {date ? date.toLocaleString().split(",")[0] : "Pick a Date"}
            </Text>
          </TouchableOpacity>
        )
      ) : null}

      {showDatePicker && Platform.OS === "ios" && (
        <DateTimePicker
          value={date || new Date()}
          mode="datetime"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Button title="Search Appointments" onPress={handleSubmit} />
      <View style={styles.spacer} />
      <Button title="Go Back" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  radioContainer: { width: "100%", marginBottom: 20 },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
  dateButton: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  dateButtonText: {
    color: "#555",
  },
  spacer: { height: 20 },
});
