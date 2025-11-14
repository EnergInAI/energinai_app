import { DailyData, MonthlyData } from '@/constants/mockData';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HistoricalKPISummaryProps {
  data: DailyData | MonthlyData;
  title: string;
}

const HistoricalKPISummary = ({ data, title }: HistoricalKPISummaryProps) => {
  // Calculate export and import based on the inspiration
  // Export = solar production (what's fed back to grid)
  // Import = load consumption - solar production (what's taken from grid)
  const exportValue = data.solarProduction;
  const importValue = data.loadConsumption - data.solarProduction;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.summarySection}>
        {/* Combined Card - Net Usage with Export/Import */}
        <View style={styles.combinedCard}>
          {/* Left Side: Net Usage */}
          <View style={styles.netUsageSection}>
            <View style={styles.metricRow}>
              <Text style={styles.metricIcon}>⚡</Text>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>NET USAGE</Text>
                <Text style={styles.metricValue}>{data.net.toFixed(1)} kWh</Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.verticalDivider} />

          {/* Right Side: Export and Import */}
          <View style={styles.exportImportSection}>
            {/* Export (Top) */}
            <View style={styles.exportSection}>
              <View style={styles.metricRow}>
                <Text style={[styles.metricIcon, styles.exportIcon]}>↗️</Text>
                <View style={styles.metricInfo}>
                  <Text style={styles.metricLabel}>EXPORT</Text>
                  <Text style={[styles.metricValue, styles.exportValue]}>
                    {exportValue.toFixed(1)} kWh
                  </Text>
                </View>
              </View>
            </View>

            {/* Horizontal Divider */}
            <View style={styles.horizontalDivider} />

            {/* Import (Bottom) */}
            <View style={styles.importSection}>
              <View style={styles.metricRow}>
                <Text style={[styles.metricIcon, styles.importIcon]}>↙️</Text>
                <View style={styles.metricInfo}>
                  <Text style={styles.metricLabel}>IMPORT</Text>
                  <Text style={[styles.metricValue, styles.importValue]}>
                    {importValue.toFixed(1)} kWh
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Cards Row */}
        <View style={styles.bottomCardsRow}>
          {/* Solar Produced Card */}
          <View style={[styles.summaryCard, styles.solarCard]}>
            <Text style={styles.summaryIcon}>☀️</Text>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>SOLAR PRODUCED</Text>
              <Text style={styles.summaryValue}>{data.solarProduction.toFixed(1)}</Text>
              <Text style={styles.summaryUnit}>kWh</Text>
            </View>
          </View>

          {/* Load Consumed Card */}
          <View style={[styles.summaryCard, styles.loadCard]}>
            <Text style={styles.summaryIcon}>⚙️</Text>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>LOAD CONSUMED</Text>
              <Text style={styles.summaryValue}>{data.loadConsumption.toFixed(1)}</Text>
              <Text style={styles.summaryUnit}>kWh</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 16,
    textAlign: 'center',
  },
  summarySection: {
    gap: 10,
  },
  combinedCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#0d274d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(13, 39, 77, 0.08)',
    flexDirection: 'row',
    height: 125,
    overflow: 'hidden',
  },
  netUsageSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  verticalDivider: {
    width: 2,
    backgroundColor: '#e8e8e8',
  },
  exportImportSection: {
    flex: 1,
    flexDirection: 'column',
  },
  exportSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  horizontalDivider: {
    height: 2,
    backgroundColor: '#e8e8e8',
  },
  importSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    width: '100%',
  },
  metricIcon: {
    fontSize: 18,
    width: 18,
    textAlign: 'center',
  },
  exportIcon: {
    color: '#28a745',
  },
  importIcon: {
    color: '#f28c28',
  },
  metricInfo: {
    flexDirection: 'column',
    gap: 2,
    flex: 1,
  },
  metricLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#777',
    fontWeight: '800',
    lineHeight: 12,
    letterSpacing: 0.2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d274d',
    lineHeight: 18,
  },
  exportValue: {
    color: '#28a745',
  },
  importValue: {
    color: '#f28c28',
  },
  bottomCardsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding : 20,
    // paddingHorizontal: 14,
    // paddingVertical: 12,
    shadowColor: '#0d274d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(13, 39, 77, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15,
    height: 100,
  },
  solarCard: {
    // Additional styles for solar card if needed
  },
  loadCard: {
    // Additional styles for load card if needed
  },
  summaryIcon: {
    fontSize: 20,
  },
  summaryContent: {
    flexDirection: 'column',
    gap: 2,
    flex: 1,
  },
  summaryLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 11,
    color: '#777',
    fontWeight: '800',
    letterSpacing: 0.2,
    lineHeight: 12,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d274d',
    lineHeight: 18,
  },
  summaryUnit: {
    fontSize: 10,
    color: '#777',
    lineHeight: 12,
  },
});

export default HistoricalKPISummary;