import { ThemedText } from '@/components/themed-text';
import { DailyData, MonthlyData } from '@/constants/mockData';
import { Fonts } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';

interface DataItemProps {
  item: DailyData | MonthlyData;
  isDaily: boolean;
}

const DataItem = ({ item, isDaily }: DataItemProps) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.dataText}>{item.date}</ThemedText>
      <View style={styles.metricContainer}>
        <IconSymbol name="bolt.fill" size={16} color="#FFA500" />
        <ThemedText style={styles.dataText}>{item.loadConsumption} kWh</ThemedText>
      </View>
      <View style={styles.metricContainer}>
        <IconSymbol name="sun.max.fill" size={16} color="#FFD700" />
        <ThemedText style={styles.dataText}>{item.solarProduction} kWh</ThemedText>
      </View>
      <View style={styles.metricContainer}>
        <IconSymbol name="chart.line.uptrend.xyaxis" size={16} color="#00FF00" />
        <ThemedText style={styles.dataText}>+{item.net} kWh</ThemedText>
      </View>
      <View style={styles.metricContainer}>
        <IconSymbol name="dollarsign.circle.fill" size={16} color="#4CAF50" />
        <ThemedText style={styles.dataText}>${item.cost.toFixed(2)}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    alignItems: 'center',
  },
  metricContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  dataText: {
    fontFamily: Fonts.rounded,
    fontSize: 14,
    textAlign: 'center',
    color: '#333333',
  },
});

export default DataItem;
