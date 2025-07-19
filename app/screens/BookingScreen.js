import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const BookingScreen = ({ route }) => {
  const [slideAnim] = useState(new Animated.Value(0));
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState('');
  const [providerData, setProviderData] = useState({
    name: 'Provider Name',
    service: 'Service',
    image: { uri: 'https://i.pravatar.cc/150?img=3' }
  });

  useEffect(() => {
    if (route.params) {
      setProviderData({
        name: route.params.providerName || 'Provider Name',
        service: route.params.providerService || 'Service',
        image: route.params.providerImage || { uri: 'https://i.pravatar.cc/150?img=3' }
      });
    }
  }, [route.params]);

  const getServices = () => {
    switch(providerData.service.toLowerCase()) {
      case 'tailor':
        return [
          { name: 'Clothing Alterations', price: 'GHC 15.00' },
          { name: 'Custom Clothing', price: 'GHC 515.00' },
          { name: 'Repairs', price: 'GHC 15.00' },
          { name: 'Wedding Dress Alterations', price: 'GHC 15.00' },
        ];
      case 'electrician':
        return [
          { name: 'Electrical Installation', price: 'GHC 50.00' },
          { name: 'Wiring Repair', price: 'GHC 35.00' },
          { name: 'Light Fixture Installation', price: 'GHC 25.00' },
          { name: 'Circuit Breaker Repair', price: 'GHC 45.00' },
        ];
      default:
        return [
          { name: 'Basic Service', price: 'GHC 20.00' },
          { name: 'Standard Service', price: 'GHC 40.00' },
          { name: 'Premium Service', price: 'GHC 60.00' },
        ];
    }
  };

  const services = getServices();
  const availableDates = ['Mon, Jul 30', 'Tue, Jul 31', 'Wed, Aug 1'];
  const availableTimes = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];

  const handleProceed = () => {
    setShowConfirmation(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleBack = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowConfirmation(false));
  };

  const confirmationTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.providerCard}>
            <View style={styles.providerInfo}>
              <Image
                source={providerData.image}
                style={styles.avatar}
              />
              <View style={styles.providerDetails}>
                <Text style={styles.providerName}>{providerData.name}</Text>
                <Text style={styles.providerService}>{providerData.service}</Text>
                <Text style={styles.providerDistance}>0.8km away</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Select Services</Text>
          <View style={styles.servicesContainer}>
            {services.map((service, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.serviceItem,
                  selectedService === index && styles.selectedService
                ]}
                onPress={() => setSelectedService(index)}
              >
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Select Date</Text>
          <View style={styles.datesContainer}>
            {availableDates.map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateItem,
                  selectedDate === index && styles.selectedDate
                ]}
                onPress={() => setSelectedDate(index)}
              >
                <Text style={styles.dateText}>{date}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.datesContainer}>
            {availableTimes.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateItem,
                  selectedTime === index && styles.selectedDate
                ]}
                onPress={() => setSelectedTime(index)}
              >
                <Text style={styles.dateText}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Add Notes (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add any specific requirements or details about your appointment..."
            placeholderTextColor="#999"
            multiline
            value={notes}
            onChangeText={setNotes}
          />

          <TouchableOpacity 
            style={styles.proceedButton}
            onPress={handleProceed}
          >
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {showConfirmation && (
        <View style={styles.confirmationOverlay}>
          <Animated.View 
            style={[
              styles.confirmationContainer,
              { transform: [{ translateY: confirmationTranslateY }] }
            ]}
          >
            <View style={styles.confirmationHeader}>
              <Text style={styles.confirmationTitle}>Appointment Summary</Text>
              <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Service:</Text>
              <Text style={styles.summaryValue}>
                {selectedService !== null ? services[selectedService].name : 'Not selected'}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Date:</Text>
              <Text style={styles.summaryValue}>
                {selectedDate !== null ? availableDates[selectedDate] : 'Not selected'}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Time:</Text>
              <Text style={styles.summaryValue}>
                {selectedTime !== null ? availableTimes[selectedTime] : 'Not selected'}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Provider:</Text>
              <Text style={styles.summaryValue}>{providerData.name}</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Estimated Price:</Text>
              <Text style={styles.summaryValue}>
                {selectedService !== null ? services[selectedService].price : 'GHC -'}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={handleBack}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContainer: {
    paddingBottom: 100,
    paddingTop: 20
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  providerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    marginRight: 15,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 3,
  },
  providerService: {
    color: '#666',
    fontSize: 14,
    marginBottom: 3,
  },
  providerDistance: {
    color: '#666',
    fontSize: 14,
  },
  servicesContainer: {
    paddingHorizontal: 15,
  },
  serviceItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedService: {
    borderColor: '#159D73',
    backgroundColor: '#F0F9F5',
  },
  serviceName: {
    fontSize: 15,
    color: '#333',
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 14,
    color: '#159D73',
    fontWeight: '500',
  },
  datesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  dateItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedDate: {
    borderColor: '#159D73',
    backgroundColor: '#F0F9F5',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  notesInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    height: 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    textAlignVertical: 'top',
    fontSize: 15,
  },
  proceedButton: {
    backgroundColor: '#159D73',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 80,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  confirmationContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  confirmationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    padding: 5,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#666',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    borderWidth: 1,
    borderColor: '#159D73',
    borderRadius: 12,
    padding: 15,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#159D73',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#159D73',
    borderRadius: 12,
    padding: 15,
    flex: 1,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default BookingScreen;