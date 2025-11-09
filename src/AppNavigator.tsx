// src/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../src/screens/HomeScreen';
import AboutScreen from '../src/screens/AboutScreen';
import CoursesScreen from '../src/screens/CoursesScreen';
import ContactScreen from '../src/screens/ContactScreen';
import CartScreen from '../src/screens/CartScreen';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Courses: undefined;
  Contact: undefined;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false 
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Courses" component={CoursesScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
