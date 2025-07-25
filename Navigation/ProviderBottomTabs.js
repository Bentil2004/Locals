import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProviderHomeScreen from "../app/screens/provider/ProviderHomeScreen";
import ProviderJobsScreen from "../app/screens/provider/ProviderJobsScreen";
import ProviderMessagesScreen from "../app/screens/provider/ProviderMessagesScreen";
import ProviderProfileScreen from "../app/screens/provider/ProviderProfileScreen";

const Tab = createBottomTabNavigator();

export default function ProviderBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'ProviderHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ProviderJobs') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'ProviderMessages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'ProviderProfile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
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
          if (route.name === 'ProviderHome') {
            label = 'Home';
          } else if (route.name === 'ProviderJobs') {
            label = 'Jobs';
          } else if (route.name === 'ProviderMessages') {
            label = 'Messages';
          } else if (route.name === 'ProviderProfile') {
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
      <Tab.Screen name="ProviderHome" component={ProviderHomeScreen} />
      <Tab.Screen name="ProviderJobs" component={ProviderJobsScreen} />
      <Tab.Screen name="ProviderMessages" component={ProviderMessagesScreen} />
      <Tab.Screen name="ProviderProfile" component={ProviderProfileScreen} />
    </Tab.Navigator>
  );
}
