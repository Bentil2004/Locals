import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserDetails } from '../../hooks/useUserDetails';
import { Ionicons } from '@expo/vector-icons';

const messages = [
  {
    id: '1',
    name: 'Nick John',
    lastMessage: 'Hi, are you available tomorrow?',
    time: '2:30 PM',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Peter Dune',
    lastMessage: 'Please confirm the schedule.',
    time: '11:45 AM',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  // Add more dummy messages if needed
];

const ProviderMessagesScreen = () => {
  const navigation = useNavigation();
  const { profile } = useUserDetails();

  const handlePress = (item) => {
    navigation.navigate('ChatScreen', { user: item });
  };


  const renderMessageItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.messageTextContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

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

      <View style={styles.manageButton}>
        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#159D73" />
        <Text style={styles.manageText}>Manage Employers</Text>
        <View style={styles.notificationBadge}>
          <Text style={styles.badgeText}>1</Text>
        </View>
      </View>

      {messages.length > 0 ? (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No messages yet</Text>
        </View>
      )}
    </View>
  );
};

export default ProviderMessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
  list: {
    padding: 16,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
  },
  messageTextContainer: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  lastMessage: {
    color: '#666',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});
