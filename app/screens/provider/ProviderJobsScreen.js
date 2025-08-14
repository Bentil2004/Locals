import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useUserDetails } from "../../hooks/useUserDetails";
import { useNavigation } from "@react-navigation/native";

const upcomingJobs = [
  {
    id: 1,
    name: "Peter Dune",
    title: "Plumber, San Francisco",
    time: "4:00 pm",
    location: "Ayeduase, 4.9km",
    day: "Tomorrow",
  },
];

const ProviderJobsScreen = () => {
  const { user, profile, loading, logout } = useUserDetails();
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300");

  useEffect(() => {
    if (profile?.avatar) {
      setProfileImage(profile.avatar);
    }
  }, [profile]);

  const messagePressed = () => {
    navigation.navigate("Messages");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#159D73" />
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.greeting}>Job Bookings</Text>
          <Text style={styles.welcome}>Your recent bookings will appear here</Text>
        </View>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      </View>

      <TouchableOpacity style={styles.manageButton} onPress={messagePressed}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={20}
          color="#159D73"
        />
        <Text style={styles.manageText}>Manage Employers</Text>
        <View style={styles.notificationBadge}>
          <Text style={styles.badgeText}>1</Text>
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Image
              source={require("../../assets/new.jpeg")}
              style={styles.profilePic}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.name}>{profile?.name}</Text>
              <Text style={styles.role}>Plumber, San Francisco</Text>
              <Text style={styles.rating}>4.8 (123 reviews)</Text>
            </View>
            <View style={styles.statusDot} />
            <Text style={styles.onlineText}>online</Text>
          </View>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-done" size={20} color="#333" />
            <Text style={styles.statValue}>27</Text>
            <Text style={styles.statLabel}>Completed Jobs</Text>
          </View>
          <View style={styles.statCard}>
            <FontAwesome name="dollar" size={20} color="#333" />
            <Text style={styles.statValue}>$1,240</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="star" size={20} color="#f9b500" />
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Ratings</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons
              name="notifications-active"
              size={20}
              color="#00c851"
            />
            <Text style={styles.statValue}>92%</Text>
            <Text style={styles.statLabel}>Response Rate</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Pending Request</Text>
        <View style={styles.requestCard}>
          <View style={styles.cardHeader}>
            <Image
              source={require("../../assets/new.jpeg")}
              style={styles.profileThumb}
            />
            <View>
              <Text style={styles.jobName}>Micheal Randers</Text>
              <Text style={styles.jobRole}>Plumber, Kotei</Text>
            </View>
          </View>
          <View style={styles.timeRow}>
            <Ionicons name="calendar-outline" size={16} color="#555" />
            <Text style={styles.timeText}>Thu, Mar 16</Text>
            <Ionicons
              name="time-outline"
              size={16}
              color="#555"
              style={{ marginLeft: 10 }}
            />
            <Text style={styles.timeText}>4:00 pm</Text>
          </View>
          <View style={styles.timeRow}>
            <Ionicons name="location-outline" size={16} color="#555" />
            <Text style={styles.timeText}>Ayeduase, 4.9km</Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.acceptBtn}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineBtn}>
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Today’s Schedule</Text>
        <View style={styles.confirmedCard}>
          <Text style={styles.dateText}>Today, June 15</Text>
          <View style={styles.cardHeader}>
            <Image
              source={require("../../assets/new.jpeg")}
              style={styles.profileThumb}
            />
            <View>
              <Text style={styles.jobName}>Nick John</Text>
              <Text style={styles.jobRole}>Plumber, New Site</Text>
            </View>
          </View>
          <View style={styles.timeRow}>
            <Ionicons name="location-outline" size={16} color="#555" />
            <Text style={styles.timeText}>Ayeduase, 4.9km</Text>
          </View>
          <View style={styles.confirmedRow}>
            <Text style={styles.confirmedText}>• Confirmed</Text>
            <TouchableOpacity>
              <Text style={styles.viewDetails}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Upcoming Jobs</Text>
        {upcomingJobs.map((job) => (
          <View key={job.id} style={styles.requestCard}>
            <View style={styles.cardHeader}>
              <Image
                source={require("../../assets/new.jpeg")}
                style={styles.profileThumb}
              />
              <View>
                <Text style={styles.jobName}>{job.name}</Text>
                <Text style={styles.jobRole}>{job.title}</Text>
              </View>
              <Text style={styles.dayLabel}>{job.day}</Text>
            </View>
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={16} color="#555" />
              <Text style={styles.timeText}>{job.time}</Text>
            </View>
            <View style={styles.timeRow}>
              <Ionicons name="location-outline" size={16} color="#555" />
              <Text style={styles.timeText}>{job.location}</Text>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProviderJobsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
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
  profileCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  role: {
    color: "#555",
  },
  rating: {
    olor: "#888",
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 4,
    marginLeft: "auto",
    marginRight: 5,
  },
  onlineText: { color: "red", fontSize: 12 },
  editProfileBtn: {
    marginTop: 10,
    backgroundColor: "#159D73",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  editProfileText: {
    color: "#fff",
    fontWeight: "600",
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 4,
  },
  statValue: {
    fontWeight: "bold",
    fontSize: 16,
  },
  statLabel: {
    color: "#777",
  },

  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
  },

  requestCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileThumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  jobName: { fontWeight: "bold", fontSize: 16 },
  jobRole: { color: "#666" },
  timeRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  timeText: { marginLeft: 5, color: "#555" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  acceptBtn: {
    backgroundColor: "#159D73",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  declineBtn: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  acceptText: { color: "#fff", fontWeight: "bold" },
  declineText: { color: "#333", fontWeight: "bold" },
  confirmedCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  dateText: { color: "#159D73", fontWeight: "bold", marginBottom: 8 },
  confirmedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  confirmedText: { color: "#159D73" },
  viewDetails: { color: "#159D73", fontWeight: "bold" },
  viewButton: {
    borderWidth: 1,
    borderColor: "#159D73",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  viewText: { color: "#159D73", fontWeight: "bold" },
  dayLabel: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 12,
    color: "#555",
  },
});
