import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor?: string;
}

const MetricCard = ({ label, value, unit, icon, iconColor = '#F97316' }: MetricCardProps) => {
  const iconBackgroundColor = `${iconColor}1A`; // Add alpha for background

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
        <MaterialCommunityIcons name={icon} size={16} color={iconColor} />
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconContainer: {
    borderRadius: 999,
    padding: 4,
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  unit: {
    color: '#475569',
    fontSize: 10,
    marginLeft: 2,
  },
  label: {
    color: '#475569',
    fontSize: 10,
    marginTop: 2,
  },
});

export default MetricCard;
