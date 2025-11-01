import ConsumptionCard from '@/components/home/ConsumptionCard';
import CurrentUsageCard from '@/components/home/CurrentUsageCard';
import EnergyUsageHome from '@/components/home/EnergyUsageHome';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter';
import { Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {
  TimeSeriesDataPoint,
} from '../../types/types';

 const mockChartData: TimeSeriesDataPoint[] = [
  { time: '12:00', loadKwh: 2.1, genKwh: 1.5 },
  { time: '13:00', loadKwh: 2.5, genKwh: 1.8 },
  { time: '14:00', loadKwh: 2.8, genKwh: 2.2 },
  { time: '15:00', loadKwh: 2.4, genKwh: 2.5 },
  { time: '16:00', loadKwh: 2.9, genKwh: 2.1 },
  { time: '17:00', loadKwh: 3.1, genKwh: 1.9 },
];

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

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const HomeScreen = () => {
  const [withSolar, setWithSolar] = useState(true);

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.userName}>Hello, John</Text>
                  <Text style={styles.monitorText}>Your Home Energy Monitor</Text>
                </View>
                <View style={styles.statusContainer}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Online</Text>
                </View>
              </View>
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Without Solar</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={withSolar ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setWithSolar(previousState => !previousState)}
                  value={withSolar}
                />
                <Text style={styles.toggleLabel}>With Solar</Text>
              </View>
              <View style={styles.grid}>
                {withSolar ? (
                  <CurrentUsageCard style={styles.cardFullWidth} color={colors.consumption} iconName="bolt" />
                ) : (
                  <ConsumptionCard
                    title="Consumption"
                    value="28.4"
                    unit="kWh"
                    subtext="₹312.40 Today"
                    iconName="bolt"
                    color={colors.consumption}
                    style={styles.cardFullWidth}
                    insightText="5% better than yesterday"
                  />
                )}
                <ConsumptionCard
                  title="Estimated Cost"
                  value="₹312"
                  unit="Today"
                  subtext="Est. ₹9,360/month"
                  iconName="rupee"
                  color={colors.cost}
                />
                <ConsumptionCard
                  title="CO₂ Saved"
                  value="7.8"
                  unit="kg"
                  subtext="Equivalent to 1 tree"
                  iconName="leaf"
                  color={colors.co2}
                />
              </View>
              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Today's Energy Usage</Text>
                <EnergyUsageHome data={mockChartData} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
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
    marginTop: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default HomeScreen;
