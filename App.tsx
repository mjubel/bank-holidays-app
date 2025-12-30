import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { HolidayProvider } from './src/context/HolidayContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <HolidayProvider>
      <PaperProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </HolidayProvider>
  );
}