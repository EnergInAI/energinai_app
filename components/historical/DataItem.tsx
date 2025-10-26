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
      {/* Date Section */}
      <View style={styles.dateSection}>
        <ThemedText style={styles.dateText}>{item.date}</ThemedText>
      </View>

      {/* Metrics Grid */}
      <View style={styles.metricsGrid}>
        {/* Load Consumption */}
        <View style={[styles.metricCard, styles.consumptionCard]}>
          <View style={styles.iconWrapper}>
            <IconSymbol name="bolt.fill" size={20} color="#FF6B6B" />
          </View>
          <View style={styles.metricContent}>
            <ThemedText style={styles.metricLabel}>Load</ThemedText>
            <ThemedText style={styles.metricValue}>{item.loadConsumption}</ThemedText>
            <ThemedText style={styles.metricUnit}>kWh</ThemedText>
          </View>
        </View>

        {/* Solar Production */}
        <View style={[styles.metricCard, styles.solarCard]}>
          <View style={styles.iconWrapper}>
            <IconSymbol name="sun.max.fill" size={20} color="#FFB347" />
          </View>
          <View style={styles.metricContent}>
            <ThemedText style={styles.metricLabel}>Solar</ThemedText>
            <ThemedText style={styles.metricValue}>{item.solarProduction}</ThemedText>
            <ThemedText style={styles.metricUnit}>kWh</ThemedText>
          </View>
        </View>

        {/* Net Energy */}
        <View style={[styles.metricCard, styles.netCard]}>
          <View style={styles.iconWrapper}>
            <IconSymbol name="chart.line.uptrend.xyaxis" size={20} color="#51CF66" />
          </View>
          <View style={styles.metricContent}>
            <ThemedText style={styles.metricLabel}>Net</ThemedText>
            <ThemedText style={styles.metricValue}>+{item.net}</ThemedText>
            <ThemedText style={styles.metricUnit}>kWh</ThemedText>
          </View>
        </View>

        {/* Cost */}
        <View style={[styles.metricCard, styles.costCard]}>
          <View style={styles.iconWrapper}>
            <IconSymbol name="dollarsign.circle.fill" size={20} color="#4ECDC4" />
          </View>
          <View style={styles.metricContent}>
            <ThemedText style={styles.metricLabel}>Cost</ThemedText>
            <ThemedText style={styles.metricValue}>₹{item.cost.toFixed(2)}</ThemedText>
            <ThemedText style={styles.metricUnit}>Rupees</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  dateSection: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#F0F0F0',
  },
  dateText: {
    fontFamily: Fonts.rounded,
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    borderRadius: 12,
    gap: 10,
  },
  consumptionCard: {
    backgroundColor: '#FFF5F5',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  solarCard: {
    backgroundColor: '#FFF9F0',
    borderLeftWidth: 4,
    borderLeftColor: '#FFB347',
  },
  netCard: {
    backgroundColor: '#F0FFF4',
    borderLeftWidth: 4,
    borderLeftColor: '#51CF66',
  },
  costCard: {
    backgroundColor: '#F0FFFE',
    borderLeftWidth: 4,
    borderLeftColor: '#4ECDC4',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginLeft: 4,
  },
  metricContent: {
    flex: 1,
  },
  metricLabel: {
    fontFamily: Fonts.rounded,
    fontSize: 11,
    fontWeight: '600',
    color: '#7F8C8D',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  metricValue: {
    fontFamily: Fonts.rounded,
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 2,
  },
  metricUnit: {
    fontFamily: Fonts.rounded,
    fontSize: 10,
    fontWeight: '500',
    color: '#95A5A6',
  },
});

export default DataItem;
