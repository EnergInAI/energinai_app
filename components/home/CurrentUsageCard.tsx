import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const colors = {
    text: '#343A40',
    subtext: '#6C757D',
    cardBackground: '#FFFFFF',
    online: '#28A745',
    separator: '#E9ECEF',
    accent: '#DC3545',
};

interface CurrentUsageCardProps {
  style?: object;
  color: string;
  iconName: React.ComponentProps<typeof FontAwesome>['name'];
}

const CurrentUsageCard = ({ style, color, iconName }: CurrentUsageCardProps) => {
  return (
    <View style={[styles.card, { borderTopColor: color, borderTopWidth: 4 }, style]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <FontAwesome name={iconName} size={20} color={color} />
          <Text style={styles.title}>Net Usage</Text>
        </View>
        {/* <View style={styles.liveContainer}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
        </View> */}
      </View>
      <View style={styles.usageContainer}>
        <Text style={styles.usageValue}>4,368.295</Text>
        <Text style={styles.usageUnit}>kW</Text>
        <View style={styles.trendContainer}>
          <FontAwesome name="long-arrow-up" size={16} color={colors.accent} />
          <Text style={styles.trendText}>2.8%</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Load</Text>
          <Text style={styles.footerValue}>5052 kW</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Solar</Text>
          <Text style={styles.footerValue}>1258 kW</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
    },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9F7EF',
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
    marginLeft: 18,
  },
  usageUnit: {
    fontSize: 21,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 8,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  trendText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.accent,
    marginLeft: 5,
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
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 14,
    color: colors.subtext,
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
});

export default CurrentUsageCard;
