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
    text: '#343A40',
    subtext: '#6C757D',
    cardBackground: '#FFFFFF',
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
    fontSize: 17,
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
    color: '#28A745', // A green color for positive insights
  },
});

export default ConsumptionCard;
