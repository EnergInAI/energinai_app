import EnergyUsageHome from '@/components/home/EnergyUsageHome';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  TimeSeriesDataPoint,
} from '../../types/types';

type MetricCardProps = {
  title: string;
  value: string;
  unit: string;
  subtext: string;
  iconName: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
};

const MetricCard = ({ title, value, unit, subtext, iconName, color }: MetricCardProps) => (
  <View style={[styles.card, { borderTopColor: color, borderTopWidth: 4 }]}>
    <View style={styles.cardHeader}>
      <FontAwesome name={iconName} size={20} color={color} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <Text style={styles.cardValue}>{value} <Text style={styles.cardUnit}>{unit}</Text></Text>
    <Text style={styles.cardSubtext}>{subtext}</Text>
  </View>
);

 const mockChartData: TimeSeriesDataPoint[] = [
  { time: '12:00', loadKwh: 2.1, genKwh: 1.5 },
  { time: '13:00', loadKwh: 2.5, genKwh: 1.8 },
  { time: '14:00', loadKwh: 2.8, genKwh: 2.2 },
  { time: '15:00', loadKwh: 2.4, genKwh: 2.5 },
  { time: '16:00', loadKwh: 2.9, genKwh: 2.1 },
  { time: '17:00', loadKwh: 3.1, genKwh: 1.9 },
];

const colors = {
    consumption: '#FF7B2B',
    solar: '#FFD15C',
    cost: '#4A90E2',
    co2: '#28A745',
    background: '#F8F9FA',
    text: '#343A40',
    subtext: '#6C757D',
    cardBackground: '#FFFFFF',
    online: '#28A745',
};

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.userName}>Hello, John</Text>
            <Text style={styles.monitorText}>Your Home Energy Monitor</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>
        <View style={styles.grid}>
          <MetricCard
            title="Consumption"
            value="28.4"
            unit="kWh"
            subtext="₹312.40 Today"
            iconName="bolt"
            color={colors.consumption}
          />
          <MetricCard
            title="Solar Production"
            value="15.7"
            unit="kWh"
            subtext="Clean Energy"
            iconName="sun-o"
            color={colors.solar}
          />
          <MetricCard
            title="Estimated Cost"
            value="₹312"
            unit="Today"
            subtext="Est. ₹9,360/month"
            iconName="rupee"
            color={colors.cost}
          />
          <MetricCard
            title="CO₂ Saved"
            value="7.8"
            unit="kg"
            subtext="Equivalent to 1 tree"
            iconName="leaf"
            color={colors.co2}
          />
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Today's Energy Usage</Text>
          <EnergyUsageHome data={mockChartData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  monitorText: {
    fontSize: 16,
    color: colors.subtext,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9F7EF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.online,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.online,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 18,
    width: '48%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 10,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  cardUnit: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.subtext,
  },
  cardSubtext: {
    fontSize: 14,
    color: colors.subtext,
  },
  chartContainer: {
    marginTop: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
});

export default HomeScreen;
