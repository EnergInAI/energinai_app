import ConsumptionCard from '@/components/home/ConsumptionCard';
import CurrentUsageCard from '@/components/home/CurrentUsageCard';
import EnergyUsageHome from '@/components/home/EnergyUsageHome';
import Header from '@/components/ui/Header';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter';
import { Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import awsConfig, { API_CONFIG } from '../../src/aws-exports';
import {
  TimeSeriesDataPoint,
} from '../../types/types';

const mockChartData: TimeSeriesDataPoint[] = [
  { time: '12:00', loadKwh: 2.1, genKwh: 1.5 },
  { time: '13:00', loadKwh: 2.5, genKwh: 1.8 },
  { time: '14:00', loadKwh: 2.8, genKwh: 2.2 },
  { time: '15:00', loadKwh: 2.4, genKwh: 2.5 },
  { time: '16:00', loadKwh: 17.9, genKwh: 2.1 },
  { time: '17:00', loadKwh: 9.1, genKwh: 1.9 },
];

const totalConsumed = mockChartData.reduce((sum, point) => sum + point.loadKwh, 0);
const totalGenerated = mockChartData.reduce((sum, point) => sum + point.genKwh, 0);

const colors = {
  primaryBlue: '#0d274d',
  accentOrange: '#f28c28',
  accentGreen: '#28a745',
  backgroundLight: '#ffffff',
  backgroundSoft: '#fafafa',
  textDark: '#222',
  textMuted: '#777',
  consumption: '#f28c28', // using accent-orange for consumption
  cost: '#0d274d', // using primary-blue for cost
  co2: '#28a745', // accent-green
  background: '#fafafa', // background-soft
  text: '#222', // text-dark
  subtext: '#777', // text-muted
  cardBackground: '#ffffff', // background-light
  online: '#28a745', // accent-green
};

const logo = require('../../assets/images/energinai-logo.png');

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const HomeScreen = () => {
  const [withSolar, setWithSolar] = useState(true);
  const [cumulative, setCumulative] = useState({ consumption: 0, solar: 0, cost: 0, co2_saved: 0, net: 0, import: 0, export: 0 });
  const [chartData, setChartData] = useState<TimeSeriesDataPoint[]>([]);

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

  let [fontsLoaded] = useFonts({
    interRegular: Inter_400Regular,
    interMedium: Inter_500Medium,
    interSemiBold: Inter_600SemiBold,
    poppinsMedium: Poppins_500Medium,
    poppinsSemiBold: Poppins_600SemiBold,
  });

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date().toISOString().split('T')[0];
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HOME}?deviceId=${awsConfig.deviceId}&date=${date}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'ok') {
          setCumulative(data.data.cumulative);
          const newChartData = data.data.graph.hours.map((h: string, i: number) => ({
            time: h,
            loadKwh: data.data.graph.load[i],
            genKwh: data.data.graph.solar[i]
          }));
          setChartData(newChartData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <Header />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
              {/* Name Card */}
              <View style={styles.nameCard}>
                <View style={styles.nameContent}>
                  <Text style={styles.nameTitle}>Hello, John</Text>
                  <Text style={styles.nameSubtitle}>Your Home Energy Monitor</Text>
                </View>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Online</Text>
                </View>
              </View>

              {/* Net Usage Card */}
              <CurrentUsageCard style={styles.netCard} color={colors.consumption} iconName="zap" net={cumulative.net} importToday={cumulative.import} exportToday={cumulative.export} />

              {/* Insights Grid */}
              <View style={styles.insightsGrid}>
                <ConsumptionCard
                  title="Load Consumed"
                  value={cumulative.consumption.toFixed(1)}
                  unit="kWh"
                  subtext="Total energy consumed"
                  iconName="zap"
                  color={colors.consumption}
                />
                <ConsumptionCard
                  title="Solar Generated"
                  value={cumulative.solar.toFixed(1)}
                  unit="kWh"
                  subtext="Solar energy generated"
                  iconName="zap"
                  color={colors.co2}
                />
                <ConsumptionCard
                  title="Today's Cost"
                  value={cumulative.cost.toFixed(2)}
                  unit=""
                  subtext="Today's energy cost"
                  iconName="dollar-sign"
                  color={colors.cost}
                />

                <ConsumptionCard
                  title="CO₂ Saved"
                  value={cumulative.co2_saved.toFixed(1)}
                  unit="kg"
                  subtext="Equivalent to 2 trees"
                  iconName="cloud"
                  color={colors.co2}
                />
              </View>

              {/* Chart */}
              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Today's Energy Usage</Text>
                <EnergyUsageHome data={chartData.length > 0 ? chartData : mockChartData} />
              </View>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  nameCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(13, 39, 77, 0.08)',
  },
  nameContent: {
    flex: 1,
  },
  nameTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primaryBlue,
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  nameSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    fontFamily: 'Inter-Regular',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9f4',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  netCard: {
    marginBottom: 20,
  },
  insightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    marginTop: 0,

  },
  userName: {
    fontSize: 26,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'Poppins-SemiBold',
  },
  monitorText: {
    fontSize: 16,
    color: colors.subtext,
    fontFamily: 'Inter-Regular',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9F7EF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.online,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.online,
    fontFamily: 'Inter-SemiBold',
  },
  logo: {
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
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
  cardFullWidth: {
    width: '100%',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 16,
    color: colors.subtext,
    marginHorizontal: 10,
    fontFamily: 'Inter-Regular',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 10,
    fontFamily: 'Inter-SemiBold',
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  cardUnit: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.subtext,
    fontFamily: 'Inter-Medium',
  },
  cardSubtext: {
    fontSize: 14,
    color: colors.subtext,
    fontFamily: 'Inter-Regular',
  },
  chartContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 14,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(13, 39, 77, 0.08)',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.cost,
    marginBottom: 12,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default HomeScreen;
