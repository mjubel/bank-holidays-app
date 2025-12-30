import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator, Button, Divider, List, Text } from 'react-native-paper';
import { useHolidays } from '../../context/HolidayContext';
import { addToCalendar } from '../../utils/calendar';
import { styles } from './HolidayListScreen.styles';


import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = StackScreenProps<RootStackParamList, 'List'>;

export const HolidayListScreen = ({ navigation }: Props) => {
  const { holidays, loading, refresh } = useHolidays();

  if (loading && holidays.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={holidays}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} />
      }
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={
        !loading ? (
          <View style={styles.emptyContainer}>
            <Text variant="bodyMedium">No upcoming holidays found.</Text>
          </View>
        ) : null
      }
      renderItem={({ item }) => (
        <List.Item
          title={item.title}
          description={item.date}
          onPress={() => navigation.navigate('Edit', { holiday: item })}
          left={props => <List.Icon {...props} icon="calendar-check" />}
          right={() => (
            <Button 
              mode="text" 
              compact 
              onPress={() => addToCalendar(item)}
            >
              Add
            </Button>
          )}
        />
      )}
    />
  );
};