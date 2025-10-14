import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { dailyData, monthlyData } from '@/constants/mockData';
import { Fonts } from '@/constants/theme';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import DataCard from './DataCard';

type ViewType = 'daily' | 'monthly';

const HistoricalDataView = () => {
  const [activeView, setActiveView] = useState<ViewType>('daily');

  const data = activeView === 'daily' ? dailyData : monthlyData;
  const title = activeView === 'daily' ? 'Daily Summary' : 'Monthly Summary';

  return (
    <ThemedView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeView === 'daily' && styles.activeButton]}
          onPress={() => setActiveView('daily')}>
          <ThemedText style={[styles.buttonText, activeView === 'daily' && styles.activeButtonText]}>
            Daily
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeView === 'monthly' && styles.activeButton]}
          onPress={() => setActiveView('monthly')}>
          <ThemedText style={[styles.buttonText, activeView === 'monthly' && styles.activeButtonText]}>
            Monthly
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.summaryContainer}>
        <ThemedText style={styles.summaryTitle}>{title}</ThemedText>
        <ScrollView>
          {data.map((group, index) => (
            <DataCard key={index} title={group.month} data={group.data} isDaily={activeView === 'daily'} />
          ))}
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: -16, // Compensate for parent padding
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 4,
    alignSelf: 'center',
    marginHorizontal: 16, // Add back margin for the button container
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  activeButton: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    fontFamily: Fonts.rounded,
    fontSize: 16,
    color: '#000',
  },
  activeButtonText: {
    color: '#fff',
  },
  summaryContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '100%',
    borderRadius: 12,
  },
  summaryTitle: {
    fontFamily: Fonts.rounded,
    fontSize: 18,
    marginBottom: 16,
  },
});

export default HistoricalDataView;
