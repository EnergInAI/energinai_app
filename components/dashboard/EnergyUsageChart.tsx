import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { TimeSeriesDataPoint } from '../../types/types';

interface EnergyUsageChartProps {
  data: TimeSeriesDataPoint[];
}

const EnergyUsageChart = ({ data }: EnergyUsageChartProps) => {
  const [timeRange, setTimeRange] = useState('1D');

  const chartData = {
    labels: data.map(d => d.time),
    datasets: [
      {
        data: data.map(d => d.loadKwh),
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // accent-blue
        strokeWidth: 2,
      },
      {
        data: data.map(d => d.genKwh),
        color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`, // accent-green
        strokeWidth: 2,
      },
    ],
    legend: ['Consumption', 'Generation'],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Energy Usage</Text>
        <View style={styles.timeRangeSelector}>
          <TouchableOpacity onPress={() => setTimeRange('1D')} style={[styles.timeRangeButton, timeRange === '1D' && styles.activeTimeRangeButton]}>
            <Text style={[styles.timeRangeButtonText, timeRange === '1D' && styles.activeTimeRangeButtonText]}>1D</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTimeRange('7D')} style={[styles.timeRangeButton, timeRange === '7D' && styles.activeTimeRangeButton]}>
            <Text style={[styles.timeRangeButtonText, timeRange === '7D' && styles.activeTimeRangeButtonText]}>7D</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTimeRange('1M')} style={[styles.timeRangeButton, timeRange === '1M' && styles.activeTimeRangeButton]}>
            <Text style={[styles.timeRangeButtonText, timeRange === '1M' && styles.activeTimeRangeButtonText]}>1M</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 80} // Adjust for padding
        height={220}
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '0',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        withInnerLines={false}
        fromZero
        segments={4}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeRangeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
  },
  timeRangeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTimeRangeButton: {
    backgroundColor: '#3B82F6',
  },
  timeRangeButtonText: {
    color: '#475569',
    fontWeight: '600',
  },
  activeTimeRangeButtonText: {
    color: '#FFFFFF',
  },
});

export default EnergyUsageChart;
