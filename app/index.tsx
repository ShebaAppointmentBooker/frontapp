// app/index.tsx
import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "./contexts/auth-context";
import PhoneIndex from "./(auth)";
import Home from "./home";

const Index = () => {
  const { token, loading } = useAuth();
  // useEffect(() => {
  //   console.log("index",token);
  // }, [token]);
  // If loading or no token, redirect to login page
  if (loading) return null;

  if (!token) return <PhoneIndex/>; // Correct path to login page

  // If authenticated, render the main app
  return <Redirect href="/home" />; // Or your main app entry point
};

export default Index;
