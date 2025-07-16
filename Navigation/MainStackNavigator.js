import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "../app/screens/LandingScreen";
import WelcomeScreen from "../app/screens/WelcomeScreen";
import LogInScreen from "../app/screens/LogInScreen";
import SignUpScreen from "../app/screens/SignUpScreen"

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LandingScreen" component={LandingScreen} />    
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />  
            <Stack.Screen name="LogInScreen" component={LogInScreen} />  
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />        
          </Stack.Navigator>
        </NavigationContainer>
  );
};

export default MainStackNavigator;