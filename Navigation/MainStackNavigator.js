import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../app/screens/SplashScreen";
import LandingScreen from "../app/screens/LandingScreen";
import WelcomeScreen from "../app/screens/WelcomeScreen";
import LogInScreen from "../app/screens/LogInScreen";
import RoleSelectionScreen from "../app/screens/RoleSelectionScreen";
import SignUp from "../app/screens/SignUp";
import BottomTabNavigator from "./BottomTabNavigator";
import ChatScreen from "../app/screens/client/ChatScreen";
import ProviderBottomTabs from "./ProviderBottomTabs";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />    
            <Stack.Screen name="LandingScreen" component={LandingScreen} />    
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />  
            <Stack.Screen name="LogInScreen" component={LogInScreen} />  
            <Stack.Screen name="RoleSelectionScreen" component={RoleSelectionScreen} /> 
            <Stack.Screen name="SignUp" component={SignUp} />   
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />  
            <Stack.Screen name="ChatScreen" component={ChatScreen} /> 
            <Stack.Screen name="ProviderBottomTabs" component={ProviderBottomTabs} />   
                   
          </Stack.Navigator>
        </NavigationContainer>
  );
};

export default MainStackNavigator;