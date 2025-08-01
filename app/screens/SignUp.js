import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpScreen({ route }) {
  const { role } = route.params;
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (text) => {
    const cleaned = text.replace(/\D/g, "");
    setPhone(cleaned);
  };

  const handleSignUp = async () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        phone,
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("LogInScreen", {role});
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
    setLoading(false);
  };

  const onTermsPressed = () => {
    Alert.alert("Terms & Policy", "Please read and accept the terms and policy.");
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>L</Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Create your account</Text>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  placeholder="ex: jon smith"
                  placeholderTextColor="#A0A0A0"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  placeholder="ex: 0244777344"
                  placeholderTextColor="#A0A0A0"
                  style={styles.input}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={handlePhoneChange}
                  maxLength={10}
                />
              </View>

              {role === "provider" && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Residential Address</Text>
                  <TextInput
                    placeholder="ex: 123 Main St, City, Country"
                    placeholderTextColor="#A0A0A0"
                    style={styles.input}
                  />
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="ex: jon.smith@email.com"
                  placeholderTextColor="#A0A0A0"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholder="*******"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm password</Text>
                <TextInput
                  placeholder="*******"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
            </View>

            <View style={styles.termsCheck}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setIsChecked(prev => !prev)}
              >
                <Ionicons
                  name={checked ? "checkmark-circle" : "checkmark-circle-outline"}
                  size={25}
                  color={isChecked ? "#159D73" : "#999"}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => console.log("Terms clicked")}>
                <Text style={styles.labelterms}>I understood the terms & policy.</Text>
              </TouchableOpacity>
            </View>


            <TouchableOpacity
              style={[styles.signUpButton, (!isChecked || loading) && styles.disabledButton]}
              disabled={!isChecked || loading}
              onPress={handleSignUp}
            >
              <Text style={styles.signUpText}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <View style={styles.signInPrompt}>
              <Text style={styles.promptText}>Have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LogInScreen', { role })}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 10,
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
    color: "#000",
    textAlign: "center",
  },
  formContainer: {
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: "#444",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
  },
    checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,

  },
  signUpButton: {
    backgroundColor: "#159D73",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 25,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  signUpText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  signInPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  promptText: {
    color: "#999",
    fontSize: 14,
  },
  signInText: {
    color: "#159D73",
    fontSize: 14,
    fontWeight: "500",
  },
  termsCheck: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  labelterms: {
    fontSize: 16,
    color: "#444",
  },
});
