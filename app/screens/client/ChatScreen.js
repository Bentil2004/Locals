import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useState,useEffect } from 'react';
import { Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { providerName, providerService, providerImage } = route.params;
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <Image 
          source={providerImage} 
          style={styles.profileImage}
        />
        
        <View style={styles.headerTextContainer}>
          <Text style={styles.providerName}>{providerName}</Text>
          <View style={styles.statusContainer}>
            <View style={styles.onlineDot} />
            <Text style={styles.providerStatus}>Online</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="more-vertical" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.chatContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.emptyChatContainer}>
          <Text style={styles.emptyChatText}>No messages yet</Text>
          <Text style={styles.emptyChatSubtext}>Start the conversation with {providerName}</Text>
        </View>
      </ScrollView>

      <View style={styles.attachmentOptions}>
        <TouchableOpacity style={styles.attachmentButton}>
          <MaterialIcons name="photo-camera" size={24} color="#159D73" />
          <Text style={styles.attachmentText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.attachmentButton}>
          <MaterialIcons name="photo-library" size={24} color="#159D73" />
          <Text style={styles.attachmentText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.attachmentButton}>
          <FontAwesome name="file" size={24} color="#159D73" />
          <Text style={styles.attachmentText}>Document</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachmentToggle}>
          <Ionicons name="add" size={28} color="#159D73" />
        </TouchableOpacity>
        
        <TextInput 
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          multiline
        />
        
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#159D73" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginRight: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  providerStatus: {
    fontSize: 12,
    color: '#666666',
  },
  menuButton: {
    padding: 5,
  },
  chatContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  emptyChatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  emptyChatText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  emptyChatSubtext: {
    fontSize: 14,
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  attachmentToggle: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachmentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    display: 'none', // Initially hidden
  },
  attachmentButton: {
    alignItems: 'center',
    padding: 10,
  },
  attachmentText: {
    marginTop: 5,
    fontSize: 12,
    color: '#159D73',
  },
});

export default ChatScreen;