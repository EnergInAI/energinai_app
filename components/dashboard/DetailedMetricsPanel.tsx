import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { GenMetrics, LoadMetrics } from '../../types/types';
import MetricsList from './MetricsList';

interface DetailedMetricsPanelProps {
  loadMetrics: LoadMetrics;
  genMetrics: GenMetrics;
}

const DetailedMetricsPanel = ({ loadMetrics, genMetrics }: DetailedMetricsPanelProps) => {
  return (
    <View>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
        <MetricsList title="Consumption" metrics={loadMetrics} />
      </Pressable>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
        <MetricsList title="Generation" metrics={genMetrics} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#0d274d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardPressed: {
    transform: [{ translateY: -2 }],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
});

export default DetailedMetricsPanel;
