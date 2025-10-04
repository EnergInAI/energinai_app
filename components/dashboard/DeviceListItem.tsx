import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Device } from '../../types/types';

interface DeviceListItemProps {
  device: Device;
}

const DeviceListItem = ({ device }: DeviceListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <MaterialCommunityIcons name={device.icon} size={24} color="#22C55E" />
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceName}>{device.name}</Text>
          <Text style={styles.deviceDetails}>
            {device.power}W • ${device.costPerHour.toFixed(3)}/hr
          </Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.percentage}>{device.percentage.toFixed(1)}%</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${device.percentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceInfo: {
    marginLeft: 10,
  },
  deviceName: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '600',
  },
  deviceDetails: {
    color: '#64748B',
    fontSize: 12,
  },
  rightSection: {
    position: 'absolute',
    right: 0,
    top: 6,
  },
  percentage: {
    color: '#16A34A',
    fontSize: 12,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginTop: 6,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#0F172A',
    borderRadius: 2,
  },
});

export default DeviceListItem;
