// Dashboard.tsx

import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import awsConfig, { API_CONFIG } from '../../src/aws-exports';
import {
  GenMetrics,
  LoadMetrics,
} from '../../types/types';
import Header from '../ui/Header';
import DetailedMetricsPanel from './DetailedMetricsPanel';
import LiveDashboardCard from './LiveDashboardCard';

interface LiveData {
  status: string;
  timestamp: string;
  grid: {
    voltage: number;
    current: number;
    power: number;
    kwh: number;
    power_factor: number;
    frequency: number;
  };
  solar: {
    voltage: number;
    current: number;
    power: number;
    kwh: number;
    power_factor: number;
    frequency: number;
  };
}

// (chart mock omitted for brevity)

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const Dashboard = () => {
  const [liveData, setLiveData] = useState<LiveData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LIVE}?deviceId=${awsConfig.deviceId}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'ok') {
          setLiveData(data.data);
        }
      } catch (error) {
        console.error('Error fetching live data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, API_CONFIG.REFRESH_INTERVALS.LIVE);

    return () => clearInterval(interval);
  }, []);

  // map liveData to widget props...
  const loadMetrics: LoadMetrics = liveData && liveData.grid
    ? {
        voltage: liveData.grid.voltage,
        current: liveData.grid.current,
        power: liveData.grid.power,
        kwh: liveData.grid.kwh,
        pf: liveData.grid.power_factor,
        frequency: liveData.grid.frequency,
      }
    : {
        voltage: 1,
        current: 1,
        power: 1,
        kwh: 1,
        pf: 1,
        frequency: 1,
      };

  const genMetrics: GenMetrics = liveData && liveData.solar
    ? {
        voltage: liveData.solar.voltage,
        current: liveData.solar.current,
        power: liveData.solar.power,
        kwh: liveData.solar.kwh,
        pf: liveData.solar.power_factor,
        frequency: liveData.solar.frequency,
      }
    : {
        voltage: 1,
        current: 1,
        power: 1,
        kwh: 1,
        pf: 1,
        frequency: 1,
      };

  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    })
    .onEnd(() => {
      scale.value = withTiming(1);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -windowWidth / 2 },
        { translateY: -windowHeight / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: windowWidth / 2 },
        { translateY: windowHeight / 2 },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <Header />
          <ScrollView>
            <View style={styles.content}>
              <LiveDashboardCard />
              <DetailedMetricsPanel
                loadMetrics={loadMetrics}
                genMetrics={genMetrics}
              />
              <Text style={styles.timestamp}>
                Last updated: {liveData ? new Date(liveData.timestamp).toLocaleString() : 'Loading...'}
              </Text>
            </View>
          </ScrollView>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  timestamp: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
    marginTop: 16,
    fontFamily: 'Inter-Regular',
  },
});

export default Dashboard;
