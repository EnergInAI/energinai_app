// Dashboard.tsx

import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PubSub as PubSubClass } from '@aws-amplify/pubsub';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { ConsoleLogger } from 'aws-amplify/utils';
import awsConfig from '../../src/aws-exports';
import {
  EnergyDataState,
  GenMetrics,
  LoadMetrics,
  TimeSeriesDataPoint,
} from '../../types/types';
import DetailedMetricsPanel from './DetailedMetricsPanel';
import EnergyUsageChart from './EnergyUsageChart';
import GreetingCard from './GreetingCard';
// enable verbose Amplify logs (place once at app start)
ConsoleLogger.LOG_LEVEL = 'DEBUG';

// Configure Amplify as before
Amplify.configure(awsConfig);

// Create a singleton PubSub instance configured for your AWS IoT Core WebSocket endpoint.
// Using a singleton avoids creating multiple MQTT connections.
const pubsub: any = new PubSubClass({
  region: 'ap-south-1',
  endpoint:
    'wss://a18af7u6o4wtuq-ats.iot.ap-south-1.amazonaws.com/mqtt',
});

const MQTT_TOPIC = 'esp32/pub';

interface IoTData {
  V?: number;
  I?: number;
  P?: number;
  kWh?: number;
  PF?: number;
  F?: number;
}

// (chart mock omitted for brevity)


const Dashboard = () => {
  const [iotData, setIotData] = useState<IoTData | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const subscriptionRef = useRef<any>(null);

  const mockChartData: TimeSeriesDataPoint[] = [
  { time: '12:00', loadKwh: 2.1, genKwh: 1.5 },
  { time: '13:00', loadKwh: 2.5, genKwh: 1.8 },
  { time: '14:00', loadKwh: 2.8, genKwh: 2.2 },
  { time: '15:00', loadKwh: 2.4, genKwh: 2.5 },
  { time: '16:00', loadKwh: 2.9, genKwh: 2.1 },
  { time: '17:00', loadKwh: 3.1, genKwh: 1.9 },
];  

const mockEnergyData: EnergyDataState = {
  load: { voltage: 240.1, current: 15.3, power: 3.6, kwh: 28.5, pf: 0.98, frequency: 60.0 },
  generation: { voltage: 250.5, current: 10.1, power: 2.5, kwh: 18.7, pf: 0.99, frequency: 60.0 },
};

  useEffect(() => {
    console.log('📡 Subscribing to topic', MQTT_TOPIC);

    // show current credentials / identity for debugging auth
    fetchAuthSession()
      .then((session) => {
        // creds.identityId exists for Cognito Identity Pools
        // convert to plain object for logging
        console.log('🔐 Current AWS credentials:', {
          identityId: session.identityId,
          accessKeyId: session.credentials?.accessKeyId,
        });
      })
      .catch((err: any) => {
        console.warn('Could not get credentials:', err);
      });

    if (subscriptionRef.current) {
      console.log('📡 Already subscribed — skipping new subscribe.');
      return;
    }

    // create observable and subscribe
    const obs = pubsub.subscribe({ topics: [MQTT_TOPIC] });
    console.log('📡 Observable:', obs);

    const subscription = obs.subscribe({
      next: (data: any) => {
        console.log('📡 next — message received:', data);
        try {
          const payload = data?.value ?? data;
          setIotData(payload as IoTData);
          console.log('Voltage:', payload.V);
          console.log('Current:', payload.I);
          console.log('Power:', payload.P);
          console.log('Energy:', payload.kWh);
          console.log('Power Factor:', payload.PF);
          console.log('Frequency:', payload.F);
          setConnectionStatus('Connected');
        } catch (err) {
          console.error('Parsing message error', err);
        }
      },
      error: (err: any) => {
        console.error('📡 subscription error:', err);
        setConnectionStatus('Error');
      },
      complete: () => {
        console.log('📡 subscription complete');
        setConnectionStatus('Disconnected');
      },
    });

    // store ref so hot reload / re-render doesn't create duplicates
    subscriptionRef.current = subscription;
    console.log('📡 Subscribed (stored in ref).');

    return () => {
      console.log('📡 Cleanup — unsubscribing (if present).');
      try {
        subscriptionRef.current?.unsubscribe?.();
        subscriptionRef.current = null;
        console.log('📡 Unsubscribed');
      } catch (e) {
        console.warn('Unsubscribe error', e);
      }
    };
  }, []); // empty deps


  // map iotData to widget props...
  const loadMetrics: LoadMetrics = iotData
    ? {
        voltage: iotData.V || 0,
        current: iotData.I || 0,
        power: iotData.P || 0,
        kwh: iotData.kWh || 0,
        pf: iotData.PF || 0,
        frequency: iotData.F || 0,
      }
    : mockEnergyData.load;

  const genMetrics: GenMetrics = iotData
    ? {
        voltage: iotData.V || 0, // Assuming generation metrics are same as load for now
        current: iotData.I || 0,
        power: iotData.P || 0,
        kwh: iotData.kWh || 0,
        pf: iotData.PF || 0,
        frequency: iotData.F || 0,
      }
    : mockEnergyData.generation;

  return (
     <ScrollView style={styles.container}>
      <View style={styles.content}>
        <GreetingCard />
        <DetailedMetricsPanel
          loadMetrics={loadMetrics}
          genMetrics={genMetrics}
        />
        <EnergyUsageChart data={mockChartData} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
});

export default Dashboard;
