import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Modal, TextInput, ToastAndroid, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native'; // Make sure to import useNavigation
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';

export default function ProfileScreen() {
  const { user, signOut } = useUser();
  const navigation = useNavigation();  // Hook for navigation
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [feedback, setFeedback] = useState("");

  const profileMenu = [
    { id: 1, name: 'Home', icon: 'home' },
    { id: 2, name: 'My Booking', icon: 'bookmark-sharp' },
    { id: 3, name: 'Logout', icon: 'log-out' },
    { id: 4, name: 'Feedback', icon: 'feedback' },
  ];

  const handleMenuItemPress = async (item) => {
    if (item.name === 'Logout') {
      await signOut();
      navigation.reset({  // Resetting the navigation stack to the login screen
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else if (item.name === 'Feedback') {
      setFeedbackModalVisible(true);
    }
  };

  const submitFeedback = async () => {
    const data = { userEmail: user.primaryEmailAddress.emailAddress, userName: user.fullName, feedBack: feedback };
    try {
      await GlobalApi.createUserFeedback(data);
      ToastAndroid.show('Feedback submitted successfully!', ToastAndroid.LONG);
      setFeedbackModalVisible(false);
      setFeedback(""); // Reset feedback input
    } catch (err) {
      console.error("Feedback submission error", err);
      ToastAndroid.show('Failed to submit feedback', ToastAndroid.SHORT);
    }
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View>
      <View style={{ padding: 20, paddingTop: 30, backgroundColor: Colors.PRIMARY }}>
        <Text style={{ fontSize: 30, fontFamily: 'outfit-bold', color: Colors.WHITE }}>ProfileScreen</Text>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: user.imageUrl }} style={{ width: 90, height: 70, borderRadius: 99, padding: 20 }} />
          <Text style={{ fontSize: 26, fontFamily: 'outfit-medium', color: Colors.WHITE, marginTop: 8 }}>{user.fullName}</Text>
          <Text style={{ fontSize: 18, fontFamily: 'outfit-medium', color: Colors.WHITE, marginTop: 8 }}>{user.primaryEmailAddress.emailAddress}</Text>
        </View>
      </View>
      <FlatList
        data={profileMenu}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}
            onPress={() => handleMenuItemPress(item)}>
            <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
            <Text style={{ fontFamily: 'outfit', fontSize: 20, marginLeft: 10 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal
        visible={feedbackModalVisible}
        animationType="slide"
        onRequestClose={() => setFeedbackModalVisible(false)}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, marginBottom: 10 }}>Your Feedback</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFeedback}
            value={feedback}
            multiline
            placeholder="Type your feedback here..."
          />
          <TouchableOpacity style={styles.button} onPress={submitFeedback}>
            <Text style={{ color: 'white' }}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  }
});
