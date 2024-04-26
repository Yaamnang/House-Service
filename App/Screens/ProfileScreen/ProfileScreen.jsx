import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useClerk } from '@clerk/clerk-expo';

const LogoutButton = () => {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      alert('You have been logged out successfully!');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again!');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.text}>Log Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LogoutButton;
