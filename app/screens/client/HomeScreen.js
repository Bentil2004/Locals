import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUserDetails } from "../../hooks/useUserDetails";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default function HomeScreen({ navigation }) {
  const { user, profile, loading, logout } = useUserDetails();
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300");
  const [providers, setProviders] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(true);

  useEffect(() => {
    if (profile?.avatar) {
      setProfileImage(profile.avatar);
    }
  }, [profile]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoadingProviders(true);
        const providersRef = collection(db, "users");
        const q = query(providersRef, where("role", "==", "provider"));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const providersData = [];
          querySnapshot.forEach((doc) => {
            const providerData = doc.data();
            providersData.push({
              id: doc.id,
              name: providerData.name,
              avatar: providerData.avatar,
              service: providerData.service || "Service Provider",
              rating: providerData.rating || "4.8",
              distance: providerData.distance || "0.8km"
            });
          });
          setProviders(providersData);
          setLoadingProviders(false);
        });

        return () => unsubscribe();

      } catch (error) {
        console.error("Error fetching providers:", error);
        setLoadingProviders(false);
      }
    };

    fetchProviders();
  }, []);

  const categories = [
    { name: "Plumbing", icon: "🔧", id: "plumbing" },
    { name: "Electrical", icon: "⚡", id: "electrical" },
    { name: "Carpentry", icon: "🔨", id: "carpentry" },
    { name: "Tailoring", icon: "✂️", id: "tailoring" },
    { name: "Painting", icon: "🖌️", id: "painting" },
    { name: "Others", icon: "🚚", id: "others" },
  ];

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryProviders', { category });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello, {profile?.name}</Text>
          <Text style={styles.welcomeSubtext}>Welcome Back!</Text>
        </View>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.locationContainer}>
          <View style={styles.locationHeader}>
            <Ionicons name="location-outline" size={20} color="#159D73" />
            <Text style={styles.locationText}>Location</Text>
          </View>
          <Text style={styles.addressText}>Accra, Amasaman</Text>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <View style={styles.categoriesContainer}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(item)}
              >
                <Text style={styles.categoryIcon}>{item.icon}</Text>
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Providers</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllProviders')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {loadingProviders ? (
            <ActivityIndicator size="medium" color="#159D73" />
          ) : providers.length === 0 ? (
            <Text style={styles.noProvidersText}>No providers available</Text>
          ) : (
            providers.map((provider, index) => (
              <View key={index} style={styles.providerCard}>
                <Image 
                  source={{ uri: provider.avatar || "https://i.pravatar.cc/150" }} 
                  style={styles.avatar} 
                />
                <View style={styles.providerDetails}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  <Text style={styles.providerService}>{provider.service}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{provider.rating}</Text>
                  </View>
                  <Text style={styles.distanceText}>📍 {provider.distance} away</Text>
                </View>
                <TouchableOpacity 
                  style={styles.viewProfileButton}
                  onPress={() => navigation.navigate('ProviderProfile', { 
                    provider: {
                      id: provider.id,
                      name: provider.name,
                      service: provider.service,
                      avatar: provider.avatar,
                      phone: provider.phone,
                      email: provider.email
                    }
                  })}
                >
                  <Text style={styles.viewProfileText}>View Profile</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContainer: {
    paddingBottom: 100,
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
  locationContainer: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
    color: "#444",
  },
  addressText: { fontSize: 14, color: "#666", marginBottom: 10 },
  changeButton: { alignSelf: "flex-end" },
  changeText: { color: "#0496FF", fontWeight: "500" },
  section: { marginTop: 10, paddingHorizontal: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
  seeAllText: { color: "#0496FF", fontWeight: "500" },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "30%",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  categoryIcon: { fontSize: 22, marginBottom: 5 },
  categoryText: { color: "#444", fontWeight: "500" },
  providerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  avatar: { width: 60, height: 60, borderRadius: 10, marginRight: 15 },
  providerDetails: { flex: 1 },
  providerName: { fontSize: 16, fontWeight: "600", color: "#000" },
  providerService: { color: "#0496FF", marginVertical: 2 },
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  ratingText: { marginLeft: 5, color: "#666" },
  distanceText: { marginTop: 4, color: "#666" },
  viewProfileButton: {
    backgroundColor: "#159D73",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewProfileText: { color: "#fff", fontWeight: "500" },
  noProvidersText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
  },
});