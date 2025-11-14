import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface TimeSeriesDataPoint {
  time: string;
  loadKwh: number;
  genKwh: number;
}

interface EnergyUsageHomeProps {
  data: TimeSeriesDataPoint[];
}

const EnergyUsageHome = ({ data }: EnergyUsageHomeProps) => {
  const [timeRange, setTimeRange] = useState('1D');

  const screenWidth = Dimensions.get('window').width;
  const containerPadding = 20;
  const chartContainerPadding = 15;
  const chartWidth = screenWidth - (containerPadding * 2) - (chartContainerPadding * 2);

  const maxValue = data.length > 0 ? Math.max(...data.flatMap(d => [d.loadKwh, d.genKwh])) : 0;
  const segments = maxValue < 5 ? 4 : maxValue < 10 ? 3 : maxValue < 20 ? 2 : 1;
  const labelStep = data.length < 5 ? 1 : data.length < 10 ? 2 : data.length < 20 ? 4 : 6;
  const filteredLabels = data.map((d, i) => i % labelStep === 0 ? d.time : '');

  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        data: data.map(d => d.loadKwh),
        color: (opacity = 1) => `rgba(242, 140, 40, ${opacity})`,
        strokeWidth: 3,
      },
      {
        data: data.map(d => d.genKwh),
        color: (opacity = 1) => `rgba(40, 167, 69, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Header with Legend and Time Selector */}
      <View style={styles.topBar}>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendLine, { backgroundColor: '#f28c28' }]} />
            <Text style={styles.legendText}>Load</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendLine, { backgroundColor: '#28a745' }]} />
            <Text style={styles.legendText}>Solar</Text>
          </View>
        </View>

        <View style={styles.timeRangeSelector}>
          <TouchableOpacity 
            onPress={() => setTimeRange('1D')} 
            style={[styles.timeButton, timeRange === '1D' && styles.activeTimeButton]}
          >
            <Text style={[styles.timeButtonText, timeRange === '1D' && styles.activeTimeButtonText]}>
              1D
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setTimeRange('7D')} 
            style={[styles.timeButton, timeRange === '7D' && styles.activeTimeButton]}
          >
            <Text style={[styles.timeButtonText, timeRange === '7D' && styles.activeTimeButtonText]}>
              7D
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setTimeRange('1M')} 
            style={[styles.timeButton, timeRange === '1M' && styles.activeTimeButton]}
          >
            <Text style={[styles.timeButtonText, timeRange === '1M' && styles.activeTimeButtonText]}>
              1M
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chart */}
      <View style={styles.chartWrapper}>
        <LineChart
          data={chartData}
          width={chartWidth}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(150, 150, 150, ${opacity})`,
            style: {
              borderRadius: 0,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2.5',
              stroke: '#ffffff',
            },
            propsForBackgroundLines: {
              strokeWidth: 1,
              stroke: '#f5f5f5',
              strokeDasharray: '0',
            },
            fillShadowGradient: '#f28c28',
            fillShadowGradientOpacity: 0.1,
          }}
          withVerticalLines={false}
          withHorizontalLines={true}
          withShadow={false}
          withInnerLines={true}
          withOuterLines={false}
          fromZero={true}
          segments={segments}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Peak Info */}
      <View style={styles.peakInfo}>
        <View style={styles.peakItem}>
          <Text style={styles.peakLabel}>Peak Load</Text>
          <Text style={styles.peakValue}>3.1 kWh</Text>
          <Text style={styles.peakTime}>at 17:00</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.peakItem}>
          <Text style={styles.peakLabel}>Peak Solar</Text>
          <Text style={styles.peakValue}>2.5 kWh</Text>
          <Text style={styles.peakTime}>at 15:00</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  legendContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendLine: {
    width: 20,
    height: 3,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  timeRangeSelector: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 2,
  },
  timeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeTimeButton: {
    backgroundColor: '#0d274d',
  },
  timeButtonText: {
    color: '#999',
    fontWeight: '600',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  activeTimeButtonText: {
    color: '#ffffff',
  },
  chartWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 0,
    borderRadius: 0,
  },
  peakInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 16,
    marginTop: 4,
  },
  peakItem: {
    alignItems: 'center',
    flex: 1,
  },
  peakLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  peakValue: {
    fontSize: 18,
    color: '#222',
    fontWeight: '700',
    marginBottom: 2,
    fontFamily: 'Inter-SemiBold',
  },
  peakTime: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
});

export default EnergyUsageHome;
