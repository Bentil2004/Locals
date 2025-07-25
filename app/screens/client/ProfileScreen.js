import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

const ProviderProfileScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.headerText}>Profile</Text>

        <View style={styles.profileSection}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/300",
              }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Feather name="edit-2" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Fiifi Bentil</Text>
        </View>

        <View style={styles.contactCard}>
          <View>
            <Text style={styles.contactTitle}>Contact Information</Text>

            <View style={styles.contactRow}>
              <Ionicons name="call-outline" size={20} color="#333" style={styles.icon} />
              <Text style={styles.contactText}>+233 587 239 475</Text>
            </View>

            <View style={styles.contactRow}>
              <Ionicons name="location-outline" size={20} color="#333" style={styles.icon} />
              <Text style={styles.contactText}>Accra, Nima</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={16} color="#fff" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.sectionTitle}>App Settings</Text>

        {/* <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon-outline" size={22} color="#000" />
            <Text style={styles.settingText}>Dark mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={() => setDarkMode(!darkMode)}
            trackColor={{ false: "#ccc", true: "#159D73" }}
          />
        </View> */}

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications-outline" size={22} color="#000" />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={() => setNotifications(!notifications)}
            trackColor={{ false: "#ccc", true: "#159D73" }}
          />
        </View>

        <TouchableOpacity style={styles.linkItem}>
          <Ionicons name="settings-outline" size={22} color="#000" />
          <Text style={styles.linkText}>Account Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkItem}>
          <Ionicons name="help-circle-outline" size={22} color="#000" />
          <Text style={styles.linkText}>Help and Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProviderProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
    marginHorizontal: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007BFF",
    padding: 6,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
  contactCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    elevation: 1,
    marginHorizontal: 20,
  },
  contactTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  icon: {
    marginRight: 8,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 6,
  },  
  contactText: {
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 15,
    marginHorizontal: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 2,
    marginHorizontal: 20,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  settingText: {
    fontSize: 16,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  linkText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#FF3B30",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
  },
  logoutText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
});
