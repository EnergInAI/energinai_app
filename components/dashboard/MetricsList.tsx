import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GenMetrics, LoadMetrics } from '../../types/types';
import MetricCard from './MetricCard';

interface MetricsListProps {
  title: string;
  metrics: LoadMetrics | GenMetrics;
}

const MetricsList = ({ title, metrics }: MetricsListProps) => {
  const isLoad = 'pf' in metrics;
  const iconColor = isLoad ? '#F97316' : '#22C55E';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <MetricCard label="Voltage" value={metrics.voltage} unit="V" icon="sine-wave" iconColor={iconColor} />
        <MetricCard label="Current" value={metrics.current} unit="A" icon="current-ac" iconColor={iconColor} />
        <MetricCard label="Power" value={metrics.power} unit="kW" icon="flash" iconColor={iconColor} />
        <MetricCard label="Energy" value={metrics.kwh} unit="kWh" icon="battery-charging" iconColor={iconColor} />
        <MetricCard label="Power Factor" value={metrics.pf} unit="" icon="gauge" iconColor={iconColor} />
        <MetricCard label="Frequency" value={metrics.frequency} unit="Hz" icon="waveform" iconColor={iconColor} />
      </ScrollView>
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
});

export default MetricsList;
