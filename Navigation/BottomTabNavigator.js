import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../app/screens/HomeScreen';
import SearchScreen from '../app/screens/SearchScreen';
import ProfileScreen from '../app/screens/ProfileScreen';
import BookingScreen from '../app/screens/BookingScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const scrollY = new Animated.Value(0);

  const tabBarOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.2],
    extrapolate: 'clamp',
  });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Booking') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#159D73', 
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          position: 'absolute',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 80,
          paddingBottom: 5,
        },
        tabBarLabel: ({ focused, color }) => {
          let label;
          if (route.name === 'Home') {
            label = 'Home';
          } else if (route.name === 'Search') {
            label = 'Search';
          } else if (route.name === 'Booking') {
            label = 'Booking';
          } else if (route.name === 'Profile') {
            label = 'Profile';
          }
          return (
            <Text style={{ 
              color, 
              fontSize: 12,
              marginTop: -3,
              fontWeight: focused ? '500' : '400'
            }}>
              {label}
            </Text>
          );
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;