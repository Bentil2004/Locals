import React from 'react';
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserDetails } from '../../hooks/useUserDetails';

const BookingsScreen = () => {
  const bookings = []; 
  const { user, profile, loading, logout } = useUserDetails();
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300");

  useEffect(() => {
    if (profile?.avatar) {
      setProfileImage(profile.avatar);
    }
  }, [profile]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Booking Screen</Text>
          <Text style={styles.welcomeSubtext}>View and complete bookings</Text>
        </View>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      </View>
      {bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={60} color="#999" />
          <Text style={styles.emptyTitle}>No Bookings Yet</Text>
          <Text style={styles.emptyText}>
            You haven't made any bookings yet. Find a service provider and book your first appointment!
          </Text>
        </View>
      ) : (
        bookings.map(booking => (
          <View key={booking.id} style={styles.bookingCard}>
            <Image source={{ uri: booking.providerImage }} style={{ width: 50, height: 50, borderRadius: 25 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{booking.providerName}</Text>
            <Text style={{ color: '#666' }}>{booking.serviceName}</Text>
            <Text style={{ color: '#999' }}>{booking.date} at {booking.time}</Text>
            <Text style={{ color: '#159D73', marginTop: 5 }}>Status: {booking.status}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    backgroundColor: "#159D73",
    borderBottomRightRadius: 50,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 130,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  welcomeSubtext: {
    fontSize: 18,
    color: "#f0f0f0",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 50,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
  bookingCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookingImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  bookingDetails: {
    flex: 1,
  },
  bookingProviderName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookingServiceName: {
    color: '#666',
  },
  bookingDate: {
    color: '#999',
  },
  bookingStatus: {
    color: '#159D73',
    marginTop: 5,
  },
  bookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default BookingsScreen;