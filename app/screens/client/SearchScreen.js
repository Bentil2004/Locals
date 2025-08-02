import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserDetails } from "../../hooks/useUserDetails";

const SearchScreen = () => {
  const navigation = useNavigation();
  const { user, profile, loading, logout } = useUserDetails();
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300");

  useEffect(() => {
    if (profile?.avatar) {
      setProfileImage(profile.avatar);
    }
  }, [profile?.avatar]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello, {profile?.name}</Text>
          <Text style={styles.welcomeSubtext}>Welcome Back!</Text>
        </View>
        <Image
          source={{ uri: profileImage}}
          style={styles.profileImage}
        />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            placeholder="Search for services and providers"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {['Plumbing', 'Electrician', 'Carpentry', 'Tailor'].map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryItem}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.resultsText}>Showing 2 results</Text>

        <View style={styles.providerCard}>
          <View style={styles.providerInfo}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=31" }}
              style={styles.avatar}
            />
            <View style={styles.providerDetails}>
              <Text style={styles.providerName}>Maria Goodson</Text>
              <Text style={styles.providerService}>Tailor</Text>
              <Text style={styles.providerDistance}>0.8km away</Text>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.messageButton}
              onPress={() => navigation.navigate('ChatScreen', { 
                providerName: 'Maria Goodson',
                providerService: 'Tailor',
                providerImage: { uri: "https://i.pravatar.cc/150?img=31" }
              })}
            >
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => {
                navigation.navigate('BottomTabNavigator', { 
                  screen: 'Booking',
                  params: {
                    providerName: 'Maria Goodson',
                    providerService: 'Tailor',
                    providerImage: { uri: "https://i.pravatar.cc/150?img=31" }
                  }
                });
              }}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.providerCard}>
          <View style={styles.providerInfo}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=45" }}
              style={styles.avatar}
            />
            <View style={styles.providerDetails}>
              <Text style={styles.providerName}>Saul Goodman</Text>
              <Text style={styles.providerService}>Electrician</Text>
              <Text style={styles.providerDistance}>0.8km away</Text>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.messageButton}
              onPress={() => navigation.navigate('ChatScreen', { 
                providerName: 'Saul Goodman',
                providerService: 'Electrician',
                providerImage: { uri: "https://i.pravatar.cc/150?img=45" }
              })}
            >
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => {
                navigation.navigate('BottomTabNavigator', { 
                  screen: 'Booking',
                  params: {
                    providerName: 'Maria Goodson',
                    providerService: 'Tailor',
                    providerImage: { uri: "https://i.pravatar.cc/150?img=45" }
                  }
                });
              }}
              
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  header: {
    backgroundColor: "#159D73",
    borderBottomRightRadius: 50,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 130
  },
  welcomeText: { 
    fontSize: 24,
    fontWeight: "bold", 
    color: "#fff" 
  },
  welcomeSubtext: { 
    fontSize: 18, 
    color: "#f0f0f0"
  },
  profileImage: {
    width: 50, 
    height: 50, 
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryItem: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryText: {
    color: '#444',
    fontSize: 14,
  },
  resultsText: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    color: '#666',
    fontSize: 14,
  },
  providerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    marginRight: 15,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 3,
  },
  providerService: {
    color: '#666',
    fontSize: 14,
    marginBottom: 3,
  },
  providerDistance: {
    color: '#666',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageButton: {
    borderWidth: 1,
    borderColor: '#159D73',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
  },
  messageButtonText: {
    color: '#159D73',
    textAlign: 'center',
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#159D73',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flex: 1,
  },
  bookButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default SearchScreen;