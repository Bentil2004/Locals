import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function RoleSelectionScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>L</Text>
          </View>
        </View>

        <Text style={styles.title}>Please choose your role</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("JobSeekerSignUp")}
        >
          <View style={styles.cardContent}>
            <Ionicons name="person-outline" size={24} color="#159D73" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>I need someone for a job</Text>
              <Text style={styles.cardSubtitle}>Get Help Close to You</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ServiceProviderSignUp")}
        >
          <View style={styles.cardContent}>
            <MaterialIcons name="work-outline" size={24} color="#159D73" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>I provide services</Text>
              <Text style={styles.cardSubtitle}>Connect with clients near you</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#000",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    marginBottom: 50,
  },
  logoBox: {
    width: 30,
    height: 30,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#159D73",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#159D73",
  },
});