// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { CartProvider } from './src/context/CartContext';
import AppNavigator from './src/AppNavigator';

export default function App() {
  return (
    <CartProvider>
      <StatusBar barStyle="light-content" backgroundColor="#006400" />
      <AppNavigator />
    </CartProvider>
  );
}
