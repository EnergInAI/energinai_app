import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface KPICardProps {
  title: string;
  value: number;
  unit: string;
  color?: string;
}

const KPICard = ({ title, value, unit, color = '#F1F5F9' }: KPICardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.body}>
        <Text style={[styles.value, { color }]}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: '#777',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  unit: {
    color: '#777',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
});

export default KPICard;
