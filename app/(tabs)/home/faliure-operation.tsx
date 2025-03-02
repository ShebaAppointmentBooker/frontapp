import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import OperationFailurePage from "../../components/faliure-page";


type FailiureOperationProps = {
  message: string;
};
export default function FailiureOperation() {
  const { message } = useLocalSearchParams() as FailiureOperationProps;
 
  
  return (
    <OperationFailurePage
    message={
      message ? message : "Operation Failed"
      }
      
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
