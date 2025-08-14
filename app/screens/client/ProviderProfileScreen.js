import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const ProviderProfileScreen = ({ route, navigation }) => {
  const { providerId, provider: initialProvider } = route.params || {};
  const [provider, setProvider] = useState(initialProvider || {});
  const [loading, setLoading] = useState(!initialProvider);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const defaultImage = provider.avatar || "https://i.pravatar.cc/150" ;

  useEffect(() => {
    if (!initialProvider && providerId) {
      const fetchProvider = async () => {
        try {
          const docRef = doc(db, "providers", providerId);
          const snapshot = await getDoc(docRef);
          if (snapshot.exists()) {
            setProvider({ id: providerId, ...snapshot.data() });
          } else {
            Alert.alert("Error", "Provider not found");
            navigation.goBack();
          }
        } catch (error) {
          console.error("Error fetching provider:", error);
          Alert.alert("Error", "Could not load provider details.");
        } finally {
          setLoading(false);
        }
      };
      fetchProvider();
    }
  }, [providerId]);

  const services = [
    { id: 1, name: "Basic Service", price: "GHC 50" },
    { id: 2, name: "Standard Service", price: "GHC 100" },
    { id: 3, name: "Premium Service", price: "GHC 150" },
  ];

  const availableDates = ["Today", "Tomorrow", "Next Week"];
  const availableTimes = ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"];

  const handleBookNow = () => {
    if (!selectedService || selectedDate === null || selectedTime === null) {
      Alert.alert("Selection Required", "Please select a service, date, and time");
      return;
    }

    navigation.navigate("Booking", {
      provider,
      service: services.find((s) => s.id === selectedService),
      date: availableDates[selectedDate],
      time: availableTimes[selectedTime],
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#159D73" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Provider Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
            {imageLoading && (
              <ActivityIndicator
                style={styles.imageLoader}
                color="#159D73"
                size="medium"
              />
            )}
            <Image
              source={{
                uri: imageError
                  ? defaultImage
                  : provider?.image || defaultImage,
              }}
              style={styles.profileImage}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.providerName}>
            {provider?.name || "Provider Name"}
          </Text>
          <Text style={styles.providerService}>
            {provider?.service || "Service Provider"}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>
              {provider?.rating || "4.8"} ({provider?.reviews || "120"} reviews)
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            {provider?.description ||
              "Experienced professional with 5+ years in the field. Specializing in quality service delivery."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceItem,
                selectedService === service.id && styles.selectedService,
              ]}
              onPress={() => setSelectedService(service.id)}
            >
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Dates</Text>
          <View style={styles.datesContainer}>
            {availableDates.map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateItem,
                  selectedDate === index && styles.selectedDate,
                ]}
                onPress={() => setSelectedDate(index)}
              >
                <Text style={styles.dateText}>{date}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Times</Text>
          <View style={styles.timesContainer}>
            {availableTimes.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeItem,
                  selectedTime === index && styles.selectedTime,
                ]}
                onPress={() => setSelectedTime(index)}
              >
                <Text style={styles.timeText}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.bookButton,
            (!selectedService || selectedDate === null || selectedTime === null) &&
              styles.disabledButton,
          ]}
          onPress={handleBookNow}
          disabled={!selectedService || selectedDate === null || selectedTime === null}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  scrollContainer: { paddingBottom: 20 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  profileSection: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: { position: "relative", width: 100, height: 100, marginBottom: 10 },
  profileImage: { width: "100%", height: "100%", borderRadius: 50 },
  imageLoader: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
  providerName: { fontSize: 18, fontWeight: "bold", marginBottom: 5, textAlign: "center" },
  providerService: { fontSize: 16, color: "#159D73", marginBottom: 5, textAlign: "center" },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  ratingText: { marginLeft: 5, color: "#666" },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10, color: "#159D73" },
  aboutText: { color: "#666", lineHeight: 20 },
  serviceItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedService: { borderColor: "#159D73", backgroundColor: "#F0F9F5" },
  serviceName: { fontSize: 15 },
  servicePrice: { color: "#159D73", fontWeight: "bold" },
  datesContainer: { flexDirection: "row", flexWrap: "wrap" },
  dateItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedDate: { borderColor: "#159D73", backgroundColor: "#F0F9F5" },
  dateText: { fontSize: 14 },
  timesContainer: { flexDirection: "row", flexWrap: "wrap" },
  timeItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTime: { borderColor: "#159D73", backgroundColor: "#F0F9F5" },
  timeText: { fontSize: 14 },
  bookButton: {
    backgroundColor: "#159D73",
    padding: 15,
    borderRadius: 10,
    margin: 15,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#9E9E9E" },
  bookButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default ProviderProfileScreen;
