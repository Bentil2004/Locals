import React from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="ex: jon.smith@email.com"
                  placeholderTextColor="#A0A0A0"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholder="*******"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm password</Text>
                <TextInput
                  placeholder="*******"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.checkboxContainer}>
        <View style={styles.checkboxBorder}>
          <Checkbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(!isChecked)}
            color="#159D73"
            uncheckedColor="#159D73"
            style={styles.checkbox}
          />
        </View>
        <Text style={styles.checkboxText}>I understood the terms & policy.</Text>
      </View>

            <TouchableOpacity
              style={[styles.signUpButton, !isChecked && styles.disabledButton]}
              disabled={!isChecked}
            >
              <Text style={styles.signUpText}>SIGN UP</Text>
            </TouchableOpacity>

            <View style={styles.signInPrompt}>
              <Text style={styles.promptText}>Have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('LogInScreen')}>
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
    backgroundColor: '#F9F9F9',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 10,
  },
  logoBox: {
    width: 30,
    height: 30,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#159D73',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#159D73',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    color: '#000',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkboxBorder: {
    borderWidth: 1,
    borderColor: '#159D73',
    borderRadius: 4,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkbox: {
    margin: 0,
    padding: 0,
    width: 20,
    height: 20,
  },
  checkboxText: {
    fontSize: 14,
    color: '#666',
  },
  signUpButton: {
    backgroundColor: '#159D73',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  signInPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  promptText: {
    color: '#999',
    fontSize: 14,
  },
  signInText: {
    color: '#159D73',
    fontSize: 14,
    fontWeight: '500',
  },
});