import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from './contexts/auth-context';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, {user?.name || 'User'}!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default Home;
