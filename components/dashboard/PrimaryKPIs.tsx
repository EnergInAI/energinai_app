import React from 'react';
import { StyleSheet, View } from 'react-native';
import KPICard from './KPICard';

const PrimaryKPIs = () => {
  const netValue = 1.6;
  const netColor = netValue >= 0 ? '#22C55E' : '#F97316';

  return (
    <View style={styles.container}>
      <KPICard title="KW GENERATION" value={5.8} unit="" color="#22C55E" />
      <KPICard title="KW CONSUMPTION" value={4.2} unit="" color="#F97316" />
      <KPICard title="KW NET" value={netValue} unit="" color={netColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
});

export default PrimaryKPIs;
