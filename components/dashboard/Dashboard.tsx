import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { EnergyDataState, TimeSeriesDataPoint } from '../../types/types';
import DetailedMetricsPanel from './DetailedMetricsPanel';
import EnergyUsageChart from './EnergyUsageChart';
import GreetingCard from './GreetingCard';

const mockEnergyData: EnergyDataState = {
  load: { voltage: 240.1, current: 15.3, power: 3.6, kwh: 28.5, pf: 0.98, frequency: 60.0 },
  generation: { voltage: 250.5, current: 10.1, power: 2.5, kwh: 18.7, pf: 0.99, frequency: 60.0 },
};

const mockChartData: TimeSeriesDataPoint[] = [
  { time: '12:00', loadKwh: 2.1, genKwh: 1.5 },
  { time: '13:00', loadKwh: 2.5, genKwh: 1.8 },
  { time: '14:00', loadKwh: 2.8, genKwh: 2.2 },
  { time: '15:00', loadKwh: 2.4, genKwh: 2.5 },
  { time: '16:00', loadKwh: 2.9, genKwh: 2.1 },
  { time: '17:00', loadKwh: 3.1, genKwh: 1.9 },
];

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <GreetingCard />
        <DetailedMetricsPanel loadMetrics={mockEnergyData.load} genMetrics={mockEnergyData.generation} />
        <EnergyUsageChart data={mockChartData} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  content: {
    padding: 16,
    gap: 24,
  },
});

export default Dashboard;
