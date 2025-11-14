import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GenMetrics, LoadMetrics } from '../../types/types';
import MetricCard from './MetricCard';

interface MetricsListProps {
  title: string;
  metrics: LoadMetrics | GenMetrics;
}

type MetricIcon = keyof typeof MaterialCommunityIcons.glyphMap;

const MetricsList = ({ title, metrics }: MetricsListProps) => {
  const isLoad = title === 'Consumption';
  const iconColor = isLoad ? '#f28c28' : '#28a745';
  const titleColor = iconColor;

  const metricsData: { label: string; value: string | number; unit: string }[] = [
    { label: 'Voltage (V)', value: metrics.voltage, unit: 'V' },
    { label: 'Units (kWh)', value: metrics.kwh, unit: 'kWh' },
    { label: 'Current (I)', value: metrics.current, unit: 'A' },
    { label: 'Power (P)', value: metrics.power, unit: 'kW' },
    { label: 'Power Factor (PF)', value: metrics.pf, unit: '' },
    { label: 'Frequency (F)', value: metrics.frequency, unit: 'Hz' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={[styles.verticalLine, { backgroundColor: iconColor }]} />
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      </View>
      <View style={styles.grid}>
        {metricsData.map(metric => (
          <View key={metric.label} style={styles.metricWrapper}>
            <MetricCard
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  verticalLine: {
    width: 4,
    height: 20,
    marginRight: 8,
  },
  title: {
    color: '#222',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'Poppins-SemiBold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricWrapper: {
    width: '48%',
    marginBottom: 12,
  },
});

export default MetricsList;
