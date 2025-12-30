import * as Calendar from 'expo-calendar';
import { Alert, Platform } from 'react-native';
import { Holiday } from '../types';

export const addToCalendar = async (holiday: Holiday) => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  
  if (status !== 'granted') {
    Alert.alert('Permission Required', 'This app needs calendar access to save events.');
    return;
  }

  try {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    

    let calendarId: string;
    
    if (Platform.OS === 'ios') {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();
      calendarId = defaultCalendar.id;
    } else {

      const primaryCalendar = calendars.find(c => c.isPrimary) || calendars[0];
      if (!primaryCalendar) {
        throw new Error('No calendar found on device');
      }
      calendarId = primaryCalendar.id;
    }

    const eventDate = new Date(holiday.date);

    await Calendar.createEventAsync(calendarId, {
      title: holiday.title,
      startDate: eventDate,
      endDate: eventDate,
      allDay: true,
      notes: 'Bank Holiday added via App',
    });

    Alert.alert('Success', `${holiday.title} has been added to your calendar.`);
  } catch (err) {
    console.error('Calendar Error:', err);
    Alert.alert('Calendar Error', 'Could not save the event to your calendar.');
  }
};