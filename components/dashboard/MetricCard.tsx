import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit: string;
}

const MetricCard = ({ label, value, unit }: MetricCardProps) => {
  const displayValue = unit ? `${value} ${unit}` : value;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{displayValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#0d274d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(13, 39, 77, 0.08)',
  },
  label: {
    fontSize: 12,
    color: '#777',
    marginBottom: 6,
    fontWeight: '500',
    lineHeight: 16,
    fontFamily: 'Inter-Medium',
  },
  value: {
    fontSize: 21,
    fontWeight: '700',
    color: '#0d274d',
    fontFamily: 'Poppins-Bold',
  },
});

export default MetricCard;
