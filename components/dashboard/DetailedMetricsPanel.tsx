import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GenMetrics, LoadMetrics } from '../../types/types';
import MetricsList from './MetricsList';

interface DetailedMetricsPanelProps {
  loadMetrics: LoadMetrics;
  genMetrics: GenMetrics;
}

const DetailedMetricsPanel = ({ loadMetrics, genMetrics }: DetailedMetricsPanelProps) => {
  return (
    <View>
      <View style={styles.card}>
        <MetricsList title="Load Metrics" metrics={loadMetrics} />
      </View>
      <View style={styles.card}>
        <MetricsList title="Generation Metrics" metrics={genMetrics} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
});

export default DetailedMetricsPanel;
