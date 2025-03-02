import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import OperationFailurePage from "../../components/faliure-page";


type FailiureOperationProps = {
  messege: string;
};
export default function FailiureOperation() {
  const { messege } = useLocalSearchParams() as FailiureOperationProps;
 
  
  return (
    <OperationFailurePage
      messege={
        messege ? messege : "We couldnt find Appointments matching your details"
      }
      
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
