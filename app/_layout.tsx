// app/_layout.tsx
import React, { useEffect, useState } from 'react';
import { Slot, Redirect } from 'expo-router';
import { AuthProvider, useAuth } from './contexts/auth-context'; // Import AuthProvider & useAuth

// Root layout component
const RootLayout = () => {
  const {  loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true once the component has mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading spinner or placeholder while loading
  if (loading || !isMounted) return null; // Wait until mounted and loading is finished

  // Redirect to the login page if no token exists
  // if (!token) return <Redirect href="/(auth)" />; // This ensures the redirect only happens after the component mounts

  // Render the main app when authenticated
  return <Slot />;
};

// Wrap RootLayout with AuthProvider
const WrappedRootLayout = () => (
  <AuthProvider>
    <RootLayout />
  </AuthProvider>
);

export default WrappedRootLayout;
