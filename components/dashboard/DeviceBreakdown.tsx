import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Device } from '../../types/types';
import DeviceListItem from './DeviceListItem';

const mockDevices: Device[] = [
  { name: 'HVAC System', icon: 'air-conditioner', power: 1850, costPerHour: 0.222, percentage: 42.3 },
  { name: 'Refrigerator', icon: 'fridge', power: 680, costPerHour: 0.082, percentage: 15.5 },
  { name: 'Lighting', icon: 'lightbulb-on', power: 420, costPerHour: 0.050, percentage: 9.6 },
  { name: 'Living Room TV', icon: 'television', power: 380, costPerHour: 0.046, percentage: 8.7 },
  { name: 'Washing Machine', icon: 'washing-machine', power: 320, costPerHour: 0.038, percentage: 7.3 },
  { name: 'Kitchen Microwave', icon: 'microwave', power: 280, costPerHour: 0.034, percentage: 6.4 },
  { name: 'Other Devices', icon: 'power-plug', power: 450, costPerHour: 0.054, percentage: 10.3 },
];

const DeviceBreakdown = () => {
  const totalUsage = mockDevices.reduce((sum, device) => sum + device.power, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Device Breakdown</Text>
        <MaterialCommunityIcons name="dots-horizontal" size={24} color="#94A3B8" />
      </View>
      <FlatList
        data={mockDevices}
        renderItem={({ item }) => <DeviceListItem device={item} />}
        keyExtractor={(item) => item.name}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Total Usage</Text>
        <Text style={styles.footerValue}>{totalUsage}W</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footerText: {
    color: '#64748B',
    fontSize: 14,
  },
  footerValue: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default DeviceBreakdown;
