import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Hello, Bentil Fiifi</Text>
            <Text style={styles.welcomeSubtext}>Welcome Back!</Text>
          </View>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={styles.profileImage}
          />
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
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesContainer}>
            {[
              { name: "Plumbing", icon: "🔧" },
              { name: "Electrical", icon: "⚡" },
              { name: "Carpentry", icon: "🔨" },
              { name: "Tailoring", icon: "✂️" },
              { name: "Painting", icon: "🖌️" },
              { name: "Others", icon: "🚚" },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.categoryItem}>
                <Text style={styles.categoryIcon}>{item.icon}</Text>
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Providers</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {[
            {
              name: "Maria Goodson",
              service: "Tailor",
              image: "https://i.pravatar.cc/150?img=32",
            },
            {
              name: "Saul Goodman",
              service: "Electrician",
              image: "https://i.pravatar.cc/150?img=44",
            },

          ].map((provider, index) => (
            <View key={index} style={styles.providerCard}>
              <Image source={{ uri: provider.image }} style={styles.avatar} />
              <View style={styles.providerDetails}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerService}>{provider.service}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
                <Text style={styles.distanceText}>📍 0.8km away</Text>
              </View>
              <TouchableOpacity style={styles.viewProfileButton}>
                <Text style={styles.viewProfileText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F9F9F9"
   },
  scrollContainer: {
     paddingBottom: 100 
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
     borderRadius: 25 
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
   marginBottom: 5 
  },
  locationText: {
     fontSize: 16, 
     fontWeight: "600", 
     marginLeft: 5, 
     color: "#444" 
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
  categoriesContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, marginTop: 5, color: "#999" },
});
