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
  const isLoad = title === 'Load Metrics';
  const iconColor = isLoad ? '#F97316' : '#22C55E';

  const metricsData: { label: string; value: string | number; unit: string; icon: MetricIcon }[] = [
    { label: 'Voltage', value: metrics.voltage, unit: 'V', icon: 'sine-wave' },
    { label: 'Current', value: metrics.current, unit: 'A', icon: 'current-ac' },
    { label: 'Power', value: metrics.power, unit: 'kW', icon: 'flash' },
    { label: 'Energy', value: metrics.kwh, unit: 'kWh', icon: 'battery-charging' },
    { label: 'Power Factor', value: metrics.pf, unit: '', icon: 'gauge' },
    { label: 'Frequency', value: metrics.frequency, unit: 'Hz', icon: 'waveform' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.grid}>
        {metricsData.map(metric => (
          <View key={metric.label} style={styles.metricWrapper}>
            <MetricCard
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              icon={metric.icon}
              iconColor={iconColor}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricWrapper: {
    width: '32%',
    marginBottom: 16,
  },
});

export default MetricsList;
