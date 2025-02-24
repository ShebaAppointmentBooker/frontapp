import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "./contexts/auth-context";

const Index = () => {
  const { token, loading } = useAuth();

  if (loading) return null;

  if (!token) return <Redirect href="/auth/signInIndex" />; // Correct path to login page

  return <Redirect href="/(tabs)/home" />; // Now redirects to /main, where tabs will appear
};

export default Index;
