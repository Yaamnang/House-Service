import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function BusinessListItem({ business, booking }) {
  const navigation = useNavigation();

  const getBackgroundColor = (status) => {
    switch (status) {
      case 'Completed':
        return { backgroundColor: Colors.LIGHT_GREEN, color: Colors.GREEN };
      case 'Canceled':
        return { backgroundColor: Colors.LIGHT_RED, color: Colors.RED };
      default:
        return { backgroundColor: Colors.PRIMARY_LIGHT, color: Colors.PRIMARY };
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => navigation.push('business-detail', { business })}
    >
      <Image 
        source={{ uri: business?.images[0]?.url }} 
        style={styles.image}
      />
      <View style={styles.subContainer}>
        <Text style={styles.contactPerson}>{business.contactPerson}</Text>
        <Text style={styles.businessName}>{business.name}</Text>
        <Text style={styles.address}>
          <Ionicons name="location-sharp" size={24} color={Colors.PRIMARY} />
          {business.address}
        </Text>
        {booking && (
          <View style={styles.bookingStatusContainer}>
            <Text style={[styles.bookingStatusText, getBackgroundColor(booking.bookingStatus)]}>
              {booking.bookingStatus}
            </Text>
            {booking.id && (
              <Text style={styles.bookingDetails}>
                <AntDesign name="calendar" size={24} color={Colors.PRIMARY} />
                {booking.date} at {booking.time}
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
  },
  subContainer: {
    marginLeft: 10,
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  contactPerson: {
    fontFamily: 'outfit',
    color: Colors.GRAY,
    fontSize: 15,
  },
  businessName: {
    fontFamily: 'outfit-bold',
    fontSize: 19,
  },
  address: {
    fontFamily: 'outfit',
    color: Colors.GRAY,
    fontSize: 16,
  },
  bookingStatusContainer: {
    marginTop: 5,
  },
  bookingStatusText: {
    padding: 5,
    borderRadius: 5,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  bookingDetails: {
    fontFamily: 'outfit',
    color: Colors.GRAY,
    fontSize: 16,
  },
});
