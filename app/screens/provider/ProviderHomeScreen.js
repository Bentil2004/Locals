import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUserDetails } from "../../hooks/useUserDetails";

export default function ProviderHomeScreen() {
  const navigation = useNavigation();
  const { user, profile, loading, logout } = useUserDetails();
  const upcomingJobs = [
    {
      id: 1,
      title: "Plastic Pickup",
      location: "East Legon, Accra",
      date: "2025-08-05",
      time: "10:00 AM",
      binSize: "Large",
      frequency: "Weekly",
      clientName: "Maria Goodson",
      distance: "0.8km",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      title: "Organic Waste Collection",
      location: "Osu, Accra",
      date: "2025-08-07",
      time: "02:30 PM",
      binSize: "Medium",
      frequency: "Bi-weekly",
      clientName: "Ama Mensah",
      distance: "1.2km",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      title: "Recyclable Pickup",
      location: "Airport Residential, Accra",
      date: "2025-08-10",
      time: "09:15 AM",
      binSize: "Small",
      frequency: "Monthly",
      clientName: "Kwame Boateng",
      distance: "2.5km",
      image: "https://i.pravatar.cc/150?img=3",
    },
  ];
  
  

  const messagePressed = () => {
    navigation.navigate("Messages");
  };

  return (
  <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#159D73" />
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.greeting}>Hello, {profile?.name}</Text>
          <Text style={styles.welcome}>Welcome Back!</Text>
        </View>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.profileImage}
        />
      </View>

      <TouchableOpacity style={styles.manageButton} onPress={messagePressed}>
        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#159D73" />
        <Text style={styles.manageText}>Manage Employers</Text>
        <View style={styles.notificationBadge}>
          <Text style={styles.badgeText}>1</Text>
        </View>
      </TouchableOpacity>

    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.sectionTitle}>Recent Work</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.projectsContainer}>
        {["1", "2", "3"].map((item) => (
          <View key={item} style={styles.projectCard}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" }}
              style={styles.projectImage}
            />
            <Text style={styles.projectText}>Project {item}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => navigation.navigate("UploadPhoto")}
      >
        <Ionicons name="cloud-upload-outline" size={24} color="white" />
        <Text style={styles.uploadText}>Upload Photo</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Upcoming Jobs</Text>

      {upcomingJobs.length > 0 ? (
        upcomingJobs.map((job, index) => (
        <View key={index} style={styles.jobCardFull}>
            <Image source={{ uri: job.image }} style={styles.jobImage} />

            <View style={styles.jobInfo}>
              <Text style={styles.clientName}>{job.clientName}</Text>
              <Text style={styles.jobTitleLink}>{job.title}</Text>

              <View style={styles.jobRow}>
                <Ionicons name="location-outline" size={14} color="#000" />
                <Text style={styles.jobDistance}>{job.distance} away</Text>
              </View>

              <Text style={styles.jobDate}>{job.date} at {job.time}</Text>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.noJobsContainer}>
          <Ionicons name="briefcase-outline" size={48} color="#159D73" />
          <Text style={styles.noJobsText}>No upcoming jobs for now.</Text>
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
  },
  topHeader: {
    backgroundColor: "#159D73",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 130,
  },
  greeting: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  welcome: {
    color: "#E0FFE7",
    fontSize: 14,
    marginTop: 5,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: "#fff",
  },
  manageButton: {
    backgroundColor: "#fff",
    marginTop: -20,
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  manageText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#159D73",
    fontWeight: "600",
    flex: 1,
  },
  notificationBadge: {
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    position: "absolute",
    top: 8,
    right: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginTop: 25,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  projectsContainer: {
    marginTop: 10,
    paddingLeft: 20,
  },
  projectCard: {
    backgroundColor: "#fff",
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
    width: 160,
    elevation: 3,
  },
  projectImage: {
    width: "100%",
    height: 100,
  },
  projectText: {
    padding: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
  },
  uploadButton: {
    backgroundColor: "#159D73",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },
  uploadText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  jobCardFull: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  jobImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  jobInfo: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "center",
  },
  clientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  jobTitleLink: {
    fontSize: 14,
    color: "#0ea5e9",
    marginTop: 2,
  },
  jobRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  jobDistance: {
    fontSize: 13,
    color: "#334155",
    marginLeft: 4,
  },
  jobDate: {
    fontSize: 13,
    color: "#334155",
    marginTop: 4,
  },
  noJobsContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  noJobsText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
  },

});
