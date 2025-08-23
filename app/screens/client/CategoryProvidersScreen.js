import React, { useState, useEffect } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default function CategoryProvidersScreen({ route, navigation }) {
  const { category } = route.params;
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProviders = async () => {
      try {
        setLoading(true);
        const providersRef = collection(db, "users");
        const q = query(
          providersRef, 
          where("role", "==", "provider"),
          where("serviceCategory", "==", category.id)
        );
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const providersData = [];
          querySnapshot.forEach((doc) => {
            const providerData = doc.data();
            providersData.push({
              id: doc.id,
              name: providerData.name,
              avatar: providerData.avatar || "https://i.pravatar.cc/150",
              service: providerData.service || "Service Provider",
              rating: providerData.rating || "4.8",
              distance: providerData.distance || "0.8km",
              phone: providerData.phone || "",
              email: providerData.email || ""
            });
          });
          setProviders(providersData);
          setLoading(false);
        });

        return () => unsubscribe();

      } catch (error) {
        console.error("Error fetching category providers:", error);
        setLoading(false);
      }
    };

    fetchCategoryProviders();
  }, [category.id]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.name} Providers</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="medium" color="#159D73" style={styles.loader} />
        ) : providers.length > 0 ? (
          providers.map((provider, index) => (
            <View key={index} style={styles.providerCard}>
              <Image source={{ uri: provider.avatar }} style={styles.avatar} />
              <View style={styles.providerDetails}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerService}>{provider.service}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{provider.rating}</Text>
                </View>
                <Text style={styles.distanceText}>
                  📍 {provider.distance} away
                </Text>
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
        ) : (
          <View style={styles.noProvidersContainer}>
            <MaterialIcons name="search-off" size={50} color="#999" />
            <Text style={styles.noProvidersText}>
              No providers found for {category.name}
            </Text>
            <Text style={styles.noProvidersSubtext}>
              Check back later or try another category
            </Text>
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  header: {
    backgroundColor: "#159D73",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 120,
    borderBottomRightRadius: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
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
  noProvidersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  noProvidersText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 15,
    fontSize: 18,
    fontWeight: '500',
  },
  noProvidersSubtext: {
    textAlign: 'center',
    color: '#999',
    marginTop: 5,
    fontSize: 14,
  },
  loader: {
    marginVertical: 20,
  }
});