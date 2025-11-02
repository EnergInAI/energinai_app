import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ConsumptionCardProps = {
  title: string;
  value: string;
  unit: string;
  subtext: string;
  iconName: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  style?: object;
  insightText?: string;
};

const colors = {
  text: '#222',
  subtext: '#777',
  cardBackground: '#ffffff',
};

const ConsumptionCard = ({ title, value, unit, subtext, iconName, color, style }: ConsumptionCardProps) => (
  <View style={[styles.card, style]}>
    <View style={styles.iconContainer}>
      <FontAwesome name={iconName} size={24} color={color} />
    </View>
    <View style={styles.content}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value} <Text style={styles.cardUnit}>{unit}</Text></Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 18,
    width: '48%',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  iconContainer: {
    marginRight: 10,
    marginLeft: 7,
  },
  content: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: '100',
    color: colors.text,
    fontFamily: 'Inter-Regular',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'Inter-Regular-Bold',
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
});

export default ConsumptionCard;
