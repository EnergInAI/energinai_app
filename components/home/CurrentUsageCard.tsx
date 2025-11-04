import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const colors = {
  text: '#222',
  subtext: '#777',
  cardBackground: '#ffffff',
  online: '#28a745',
  separator: '#e9ecef',
  accent: '#dc3545',
  orange: '#f28c28',
};

interface CurrentUsageCardProps {
  style?: object;
  color: string;
  iconName: React.ComponentProps<typeof FontAwesome>['name'];
}

const CurrentUsageCard = ({ style, color, iconName }: CurrentUsageCardProps) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <FontAwesome name={iconName} size={28} color={color} style={styles.icon} />
        <View style={styles.content}>
          <Text style={styles.title}>Net Usage</Text>
          <View style={styles.usageContainer}>
            <Text style={styles.usageValue}>4,368.295</Text>
            <Text style={styles.usageUnit}>kWh</Text>
            <View style={styles.trendContainer}>
              <FontAwesome name="long-arrow-up" size={14} color={colors.orange} />
              <Text style={styles.trendText}>2.8%</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={[styles.footerLabel, styles.consumptionLabel]}>Consumption</Text>
          <Text style={styles.footerValue}>5052 kWh</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={[styles.footerLabel, styles.generationLabel]}>Generation</Text>
          <Text style={styles.footerValue}>1258 kWh</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    // Subtle shadow for modern look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1, // For Android
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  icon: {
    marginRight: 8,
    marginTop: 5,
    marginLeft: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '100',
    color: '#f28c28',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9f7ef',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.online,
    marginRight: 6,
  },
  liveText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.online,
    fontFamily: 'Inter-SemiBold',
  },
  usageContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 0,
  },
  usageValue: {
    fontSize: 21,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'Inter-Regular',
  },
  usageUnit: {
    fontSize: 21,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  trendText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.orange,
    marginLeft: 5,
    fontFamily: 'Inter-SemiBold',
  },
  separator: {
    height: 1,
    backgroundColor: colors.separator,
    marginVertical: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerItem: {
    alignItems: 'flex-start',
  },
  footerLabel: {
    fontSize: 14,
    color: colors.subtext,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  footerValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'Inter-SemiBold',
  },
  consumptionLabel: {
    color: '#f28c28',
  },
  generationLabel: {
    color: '#28a745',
  },
});

export default CurrentUsageCard;
