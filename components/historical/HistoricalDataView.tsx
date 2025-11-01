import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { dailyData, monthlyData } from '@/constants/mockData';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import HistoricalBarChart from './HistoricalBarChart';
import HistoricalKPISummary from './HistoricalKPISummary';

type ViewType = 'daily' | 'monthly';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const HistoricalDataView = () => {
  const [activeView, setActiveView] = useState<ViewType>('monthly');
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(10); // November 2025 (current month)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [chartMode, setChartMode] = useState<'months' | 'days'>('months');

  const handleMonthSelect = (index: number) => {
    if (selectedMonthIndex === index && chartMode === 'days') {
      // If same month is selected again while in days view, go back to months
      setChartMode('months');
      setSelectedDayIndex(null);
      return;
    }

    setSelectedMonthIndex(index);

    if (activeView === 'monthly') {
      // In monthly view, clicking a month shows its days
      setChartMode('days');
      setSelectedDayIndex(null);
    }
  };

  const handleDaySelect = (index: number) => {
    setSelectedDayIndex(index);
    
    // For daily view, we need to set the month index to the most recent month
    if (activeView === 'daily' && selectedMonthIndex === null) {
      setSelectedMonthIndex(dailyData.length - 1);
    }
  };

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
    setSelectedMonthIndex(null);
    setSelectedDayIndex(null);
    setChartMode('months');
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

  // Get the correct data for KPI summary
  const getKPIData = () => {
    if (activeView === 'daily' && selectedDayIndex !== null) {
      // For daily view, get data from most recent month
      const recentMonthIndex = dailyData.length - 1;
      const recentDays = dailyData[recentMonthIndex].data.slice(-10);
      return {
        data: recentDays[selectedDayIndex],
        title: `${recentDays[selectedDayIndex].date} Summary`
      };
    }
    
    if (activeView === 'monthly' && selectedMonthIndex !== null) {
      if (chartMode === 'days' && selectedDayIndex !== null) {
        // Show day summary when in day view
        return {
          data: dailyData[selectedMonthIndex].data[selectedDayIndex],
          title: `${dailyData[selectedMonthIndex].data[selectedDayIndex].date} Summary`
        };
      }
      // Show month summary when month is selected
      return {
        data: monthlyData[selectedMonthIndex].data[0],
        title: `${monthlyData[selectedMonthIndex].month} Summary`
      };
    }
    
    return null;
  };

  const kpiData = getKPIData();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          <ThemedView style={styles.container}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, activeView === 'daily' && styles.activeButton]}
                onPress={() => handleViewChange('daily')}>
                <ThemedText style={[styles.buttonText, activeView === 'daily' && styles.activeButtonText]}>
                  Daily
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, activeView === 'monthly' && styles.activeButton]}
                onPress={() => handleViewChange('monthly')}>
                <ThemedText style={[styles.buttonText, activeView === 'monthly' && styles.activeButtonText]}>
                  Monthly
                </ThemedText>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
              <HistoricalBarChart
                activeView={activeView}
                monthlyData={monthlyData}
                dailyData={dailyData}
                selectedMonthIndex={selectedMonthIndex}
                selectedDayIndex={selectedDayIndex}
                chartMode={chartMode}
                onMonthSelect={handleMonthSelect}
                onDaySelect={handleDaySelect}
              />

              {/* KPI Summary */}
              {kpiData && (
                <HistoricalKPISummary
                  data={kpiData.data}
                  title={kpiData.title}
                />
              )}
            </ScrollView>
          </ThemedView>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: -16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 4,
    alignSelf: 'center',
    marginHorizontal: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  activeButton: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000',
  },
  activeButtonText: {
    color: '#030303ff',
  },
  summaryContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '100%',
    borderRadius: 12,
  },
  summaryTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default HistoricalDataView;
