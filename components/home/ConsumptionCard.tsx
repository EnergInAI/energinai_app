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

const ConsumptionCard = ({ title, value, unit, subtext, iconName, color, style, insightText }: ConsumptionCardProps) => (
  <View style={[styles.card, { borderTopColor: color, borderTopWidth: 4 }, style]}>
    <View style={styles.cardHeader}>
      <FontAwesome name={iconName} size={20} color={color} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <View style={styles.contentContainer}>
      <View>
        <Text style={styles.cardValue}>{value} <Text style={styles.cardUnit}>{unit}</Text></Text>
        <Text style={styles.cardSubtext}>{subtext}</Text>
      </View>
      {insightText && (
        <View style={styles.insightContainer}>
          <Text style={styles.insightText}>{insightText}</Text>
        </View>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 18,
    padding: 20,
    width: '48%',
    marginBottom: 24,
    shadowColor: '#0d274d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
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
    fontFamily: 'Inter-SemiBold',
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  cardUnit: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.subtext,
    fontFamily: 'Inter-Medium',
  },
  cardSubtext: {
    fontSize: 14,
    color: colors.subtext,
    fontFamily: 'Inter-Regular',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  insightContainer: {
    // Add styles if needed, e.g., alignment
  },
  insightText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#28a745', // accent-green
    fontFamily: 'Inter-SemiBold',
  },
});

export default ConsumptionCard;
