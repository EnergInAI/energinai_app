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
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
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
    color: '#222',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  unit: {
    color: '#777',
    fontSize: 10,
    marginLeft: 2,
    fontFamily: 'Inter-Regular',
  },
  label: {
    color: '#777',
    fontSize: 10,
    marginTop: 2,
    fontFamily: 'Inter-Regular',
  },
});

export default MetricCard;
