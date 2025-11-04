import { DailyData, MonthlyData } from '@/constants/mockData';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';

interface HistoricalKPISummaryProps {
  data: DailyData | MonthlyData;
  title: string;
}

const HistoricalKPISummary = ({ data, title }: HistoricalKPISummaryProps) => {
  const kpiData = [
    {
      label: 'Load',
      value: data.loadConsumption,
      unit: 'kWh',
      icon: 'bolt.fill' as const,
      color: '#FF6B6B',
      bgColor: '#FFF5F5',
    },
    {
      label: 'Solar',
      value: data.solarProduction,
      unit: 'kWh',
      icon: 'sun.max.fill' as const,
      color: '#FFB347',
      bgColor: '#FFF9F0',
    },
    {
      label: 'Net',
      value: data.net,
      unit: 'kWh',
      icon: 'chart.line.uptrend.xyaxis' as const,
      color: '#51CF66',
      bgColor: '#F0FFF4',
    },
    {
      label: 'Cost',
      value: data.cost,
      unit: '₹',
      icon: 'dollarsign.circle.fill' as const,
      color: '#4ECDC4',
      bgColor: '#F0FFFE',
      isCurrency: true,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.kpiGrid}>
        {kpiData.map((kpi, index) => (
          <View key={index} style={styles.kpiCard}>
            <View style={[styles.iconWrapper, { backgroundColor: kpi.bgColor }]}>
              <IconSymbol name={kpi.icon} size={20} color={kpi.color} />
            </View>
            <View style={styles.kpiContent}>
              <Text style={[styles.kpiLabel, { color: kpi.color }]}>{kpi.label}</Text>
              <Text style={[styles.kpiValue, { color: 'black' }]}>
                {kpi.isCurrency ? `${kpi.unit}${kpi.value.toFixed(2)}` : `${kpi.value} ${kpi.unit}`}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#0d274d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 16,
    textAlign: 'center',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiContent: {
    flex: 1,
  },
  kpiLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontWeight: '600',
    color: '#7F8C8D',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  kpiValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default HistoricalKPISummary;
