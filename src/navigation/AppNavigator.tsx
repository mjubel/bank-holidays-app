import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { EditHolidayScreen } from '../screens/EditHolidayScreen/EditHolidayScreen';
import { HolidayListScreen } from '../screens/HolidayListScreen/HolidayListScreen';
import { Holiday } from '../types';


export type RootStackParamList = {
  List: undefined;
  Edit: { holiday: Holiday };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerStyle: { backgroundColor: '#6200ee' }, 
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="List" 
        component={HolidayListScreen} 
        options={{ title: 'UK Bank Holidays' }} 
      />
      <Stack.Screen 
        name="Edit" 
        component={EditHolidayScreen} 
        options={{ title: 'Edit Holiday' }} 
      />
    </Stack.Navigator>
  );
};