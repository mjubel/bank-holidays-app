import { addMonths, isValid, isWithinInterval, parseISO, startOfDay } from 'date-fns';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useHolidays } from '../../context/HolidayContext';
import { styles } from './EditHolidayScreen.styles';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';


type Props = StackScreenProps<RootStackParamList, 'Edit'>;

export const EditHolidayScreen = ({ route, navigation }: Props) => {
  const { holiday } = route.params;
  const { updateHoliday } = useHolidays();
  
  const [title, setTitle] = useState(holiday.title);
  const [date, setDate] = useState(holiday.date);

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const parsedDate = parseISO(date);

    const today = startOfDay(new Date());
    const limit = addMonths(today, 6);

    if (!trimmedTitle) {
      Alert.alert('Error', 'Please enter a holiday title.');
      return;
    }

    const isDateValid = isValid(parsedDate) && isWithinInterval(parsedDate, { start: today, end: limit });

    if (!isDateValid) {
      Alert.alert('Invalid Date', 'Please provide a valid date within the next 6 months.');
      return;
    }

    updateHoliday(holiday.id, trimmedTitle, date);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput 
        label="Holiday Title" 
        value={title} 
        onChangeText={setTitle} 
        mode="outlined" 
      />
      <TextInput 
        label="Date (YYYY-MM-DD)" 
        value={date} 
        onChangeText={setDate} 
        mode="outlined" 
        style={styles.input}
        placeholder="e.g. 2025-12-25"
      />
      <Button 
        mode="contained" 
        onPress={handleSave} 
        style={styles.button}
      >
        Save
      </Button>
    </View>
  );
};