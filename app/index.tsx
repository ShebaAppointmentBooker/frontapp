// app/index.tsx
import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from './contexts/auth-context';
import PhoneIndex from './(auth)';

const Index = () => {
  const { token, loading } = useAuth();

  // If loading or no token, redirect to login page
  if (loading) return null;
  if (!token) return  <Redirect href="/(auth)" />; // Correct path to login page

  // If authenticated, render the main app
  return <Redirect href="/home" />; // Or your main app entry point
};

export default Index;
