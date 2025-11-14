import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ConsumptionCardProps = {
  title: string;
  value: string;
  unit: string;
  subtext: string;
  iconName?: React.ComponentProps<typeof Feather>['name'];
  symbol?: string;
  color: string;
  style?: object;
  insightText?: string;
};

const colors = {
  text: '#222',
  subtext: '#777',
  cardBackground: '#ffffff',
};

const ConsumptionCard = ({ title, value, unit, subtext, iconName, symbol, color, style }: ConsumptionCardProps) => (
  <View style={[styles.card, style]}>
    <View style={styles.iconContainer}>
      {iconName ? (
        <Feather name={iconName} size={28} color={color} />
      ) : (
        symbol && <Text style={[styles.symbol, { color }]}>{symbol}</Text>
      )}
    </View>
    <View style={styles.content}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}{unit}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 14,
    width: '48%',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(13, 39, 77, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    color: colors.subtext,
    fontFamily: 'Inter-Medium',
    marginBottom: 3,
    lineHeight: 14,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'Inter-Bold',
  },
  cardUnit: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.subtext,
    fontFamily: 'Inter-Medium',
  },
  cardSubtext: {
    fontSize: 10,
    color: colors.subtext,
    fontFamily: 'Inter-Regular',
  },
  symbol: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});

export default ConsumptionCard;
