import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryKPIs from './PrimaryKPIs';

const GreetingCard = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <MaterialCommunityIcons name="calendar-blank" size={20} color="#94A3B8" />
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
   
      <View style={styles.kpiContainer}>
        <PrimaryKPIs />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
    marginTop: 16,
    shadowColor: '#0d274d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: '#777',
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
  },
  eventsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  events: {
    color: '#28a745',
    marginLeft: 8,
    fontFamily: 'Inter-SemiBold',
  },
  greeting: {
    color: '#222',
    fontSize: 32,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  subGreeting: {
    color: '#777',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  kpiContainer: {
    marginTop: 20,
  },
});

export default GreetingCard;
