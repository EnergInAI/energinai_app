import { Feather } from '@expo/vector-icons';
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
  iconName: React.ComponentProps<typeof Feather>['name'];
  net: number;
  importToday: number;
  exportToday: number;
}

const CurrentUsageCard = ({ style, color, iconName, net, importToday, exportToday }: CurrentUsageCardProps) => {
  const dynamicColor = exportToday > importToday ? '#28a745' : '#f28c28';
  const titleText = exportToday > importToday ? 'Net Export' : 'Net Import';
  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <Feather name={iconName} size={28} color={dynamicColor} style={styles.icon} />
        <View style={styles.content}>
          <Text style={[styles.title, { color: dynamicColor }]}>{titleText}</Text>
          <View style={styles.usageContainer}>
            <Text style={styles.usageValue}>{Math.abs(net).toFixed(3)}</Text>
            <Text style={styles.usageUnit}>kWh</Text>
            {/* <View style={styles.trendContainer}>
              <Feather name="arrow-up" size={14} color={colors.orange} />
              <Text style={styles.trendText}>2.8%</Text>
            </View> */}
          </View>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={[styles.footerLabel, styles.consumptionLabel]}>Import today</Text>
          <Text style={styles.footerValue}>{importToday} kWh</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={[styles.footerLabel, styles.generationLabel]}>Export today</Text>
          <Text style={styles.footerValue}>{exportToday} kWh</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(13, 39, 77, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  icon: {
    marginRight: 8,
    marginTop: 5,
    marginLeft: 0,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f28c28',
    fontFamily: 'Poppins-Bold',
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
    fontSize: 26,
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
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 18,
    borderRadius: 12,
  },
  footerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.subtext,
    marginBottom: 4,
    fontFamily: 'Poppins-Bold',
  },
  footerValue: {
    fontSize: 20,
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
