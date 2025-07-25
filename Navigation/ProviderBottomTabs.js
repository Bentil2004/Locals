import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import ProviderHomeScreen from "../app/screens/provider/ProviderHomeScreen";
import ProviderJobsScreen from "../app/screens/provider/ProviderJobsScreen";
import ProviderMessagesScreen from "../app/screens/provider/ProviderMessagesScreen";
import ProviderProfileScreen from "../app/screens/provider/ProviderProfileScreen";

const Tab = createBottomTabNavigator();

export default function ProviderBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="ProviderHome" component={ProviderHomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="ProviderJobs" component={ProviderJobsScreen} options={{ title: 'Jobs' }} />
      <Tab.Screen name="ProviderMessages" component={ProviderMessagesScreen} options={{ title: 'Messages' }} />
      <Tab.Screen name="ProviderProfile" component={ProviderProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}