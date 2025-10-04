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
        <View style={styles.eventsContainer}>
          <MaterialCommunityIcons name="bell-outline" size={20} color="#94A3B8" />
          <Text style={styles.events}>2 Events</Text>
        </View>
      </View>
      <Text style={styles.greeting}>Hello, Alex</Text>
      <Text style={styles.subGreeting}>Here's your energy overview for today</Text>
      <View style={styles.kpiContainer}>
        <PrimaryKPIs />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
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
    color: '#475569',
    marginLeft: 8,
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
    color: '#22C55E',
    marginLeft: 8,
  },
  greeting: {
    color: '#0F172A',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subGreeting: {
    color: '#475569',
    fontSize: 16,
    marginTop: 4,
  },
  kpiContainer: {
    marginTop: 20,
  },
});

export default GreetingCard;
