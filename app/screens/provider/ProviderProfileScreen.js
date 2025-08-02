import React, { useState , useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUserDetails } from "../../hooks/useUserDetails";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { auth, db } from "../../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";


const ProviderProfileScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const { user, profile, loading, logout } = useUserDetails();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  // console.log("user details", user, profile, loading);
  const navigation = useNavigation();
  const [isUploading, setIsUploading] = useState(false);

  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300");

  useEffect(() => {
    if (profile?.avatar) {
      setProfileImage(profile.avatar);
    }
  }, [profile?.avatar]);

  const pickImageAndUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need access to your photos to change your profile picture');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (result.canceled) {
        console.log('User cancelled image picker');
        return;
      }

      if (!result.assets || result.assets.length === 0) {
        console.log('No image selected');
        return;
      }

      const image = result.assets[0];
      setIsUploading(true);

      // Prepare form data for Cloudinary upload
      const formData = new FormData();
      formData.append("file", {
        uri: image.uri,
        type: image.type || "image/jpeg",
        name: image.fileName || `upload_${Date.now()}.jpg`,
      });
      formData.append("upload_preset", "reactnative_upload");
      formData.append("cloud_name", "dhbt9vo25");

      // Upload to Cloudinary
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dhbt9vo25/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = uploadResponse.data.secure_url;
      setProfileImage(imageUrl);

      // Update Firestore with new image URL
      const uid = auth.currentUser?.uid;
      if (uid) {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, { avatar: imageUrl });
        Alert.alert("Success", "Profile picture updated successfully");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // const onLogoutPress = () => {
  //   console.log("Logout pressed");
  //   logout()
  //     .then(() => {
  //       console.log("User logged out successfully");
  //       navigation.navigate("RoleSelectionScreen", { action: "login" });
  //     })
  //     .catch((error) => {
  //       console.error("Logout failed:", error);
  //     });
  // }

  const confirmLogout = () => {
    logout()
      .then(() => {
        console.log("User logged out successfully");
        setShowLogoutModal(false);
        navigation.navigate("RoleSelectionScreen", { action: "login" });
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
    };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.headerText}>Profile</Text>

        <View style={styles.profileSection}>
          <View style={styles.profileImageWrapper}>
            {isUploading ? (
              <View style={[styles.profileImage, styles.loadingImage]}>
                <ActivityIndicator size="medium" color="#007BFF" />
              </View>
            ) : (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            )}
            <TouchableOpacity
              style={styles.editIcon}
              onPress={pickImageAndUpload}
              disabled={isUploading}
            >
              <Feather name="edit-2" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{profile?.name || "User"}</Text>
        </View>


        <View style={styles.contactCard}>
          <View>
            <Text style={styles.contactTitle}>Personal Information</Text>

            <View style={styles.contactRow}>
              <Ionicons name="construct-outline" size={20} color="#333" style={styles.icon} />
              <Text style={styles.contactText}>Electrician</Text>
            </View>

            <View style={styles.contactRow}>
              <Ionicons name="time-outline" size={20} color="#333" style={styles.icon} />
              <Text style={styles.contactText}>10:00 am</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={16} color="#fff" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
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

        <TouchableOpacity style={styles.logoutButton} onPress={() => setShowLogoutModal(true)}>
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={showLogoutModal}
          animationType="fade"
          onRequestClose={() => setShowLogoutModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Logout</Text>
              <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
              
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#FF3B30" }]}
                  onPress={confirmLogout}
                >
                  <Text style={styles.modalButtonText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                  onPress={() => setShowLogoutModal(false)}
                >
                  <Text style={[styles.modalButtonText, { color: "#000" }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
    borderWidth: 5,
    borderColor: "#159D73",
  },
  loadingImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
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
    marginBottom: 24,
  },
  logoutText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
