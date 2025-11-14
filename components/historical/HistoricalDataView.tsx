import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { DailyData, GroupedData, MonthlyData } from '../../constants/mockData';
import awsConfig, { API_CONFIG } from '../../src/aws-exports';
import HistoricalBarChart from './HistoricalBarChart';
import HistoricalKPISummary from './HistoricalKPISummary';

type ViewType = 'daily' | 'monthly';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const HistoricalDataView = () => {
  const [activeView, setActiveView] = useState<ViewType>('monthly');
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(0); // Start with 0
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [chartMode, setChartMode] = useState<'months' | 'days'>('months');
  const [monthlyData, setMonthlyData] = useState<GroupedData<MonthlyData>[]>(Array(12).fill(null).map(() => ({ month: '', data: [{ loadConsumption: 0, solarProduction: 0, net: 0, cost: 0, date: '' }] })));
  const [dailyData, setDailyData] = useState<GroupedData<DailyData>[]>(Array(12).fill(null).map(() => ({ month: '', data: [] })));

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const months = [];
      for (let i = 0; i < 12; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const month = date.toISOString().slice(0, 7); // YYYY-MM
        try {
          const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HISTORICAL_MONTHLY}?deviceId=${awsConfig.deviceId}&month=${month}`);
          const apiData = await response.json();
          if (apiData.status === 'ok' && apiData.data && apiData.data.data) {
            const monthData: MonthlyData = {
              date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
              loadConsumption: apiData.data.data.load || 0,
              solarProduction: apiData.data.data.solar || 0,
              net: apiData.data.data.net || 0,
              cost: apiData.data.data.cost || 0,
            };
            months.unshift({
              month: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
              data: [monthData]
            });
          }
        } catch (error) {
          console.error('Error fetching monthly data:', error);
        }
      }
      setMonthlyData(months);
    };

    fetchMonthlyData();
  }, []);

  useEffect(() => {
    if (selectedMonthIndex !== null && monthlyData[selectedMonthIndex]) {
      const fetchDailyData = async () => {
        const monthStr = monthlyData[selectedMonthIndex].month;
        // Parse month string to get year and month
        const date = new Date(monthStr + ' 1');
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const daysInMonth = new Date(year, month, 0).getDate();

        const days = [];
        for (let day = 1; day <= daysInMonth; day++) {
          const dayStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HISTORICAL_DAILY}?deviceId=${awsConfig.deviceId}&date=${dayStr}`);
            const apiData = await response.json();
            if (apiData.status === 'ok' && apiData.data && apiData.data.data) {
              const dayData: DailyData = {
                date: new Date(dayStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                loadConsumption: apiData.data.data.load || 0,
                solarProduction: apiData.data.data.solar || 0,
                net: apiData.data.data.net || 0,
                cost: apiData.data.data.cost || 0,
              };
              days.push(dayData);
            }
          } catch (error) {
            console.error('Error fetching daily data:', error);
          }
        }

        const updatedDailyData = [...dailyData];
        updatedDailyData[selectedMonthIndex] = {
          month: monthStr,
          data: days
        };
        setDailyData(updatedDailyData);
      };

      fetchDailyData();
    }
  }, [selectedMonthIndex, monthlyData]);

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
    setSelectedMonthIndex(0);
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
    if (activeView === 'daily' && selectedDayIndex !== null && dailyData.length > 0) {
      // For daily view, get data from most recent month
      const recentMonthIndex = dailyData.length - 1;
      if (dailyData[recentMonthIndex] && dailyData[recentMonthIndex].data) {
        const recentDays = dailyData[recentMonthIndex].data.slice(-10);
        if (recentDays[selectedDayIndex]) {
          return {
            data: recentDays[selectedDayIndex],
            title: `${recentDays[selectedDayIndex].date} Summary`
          };
        }
      }
    }

    if (activeView === 'monthly' && selectedMonthIndex !== null) {
      if (chartMode === 'days' && selectedDayIndex !== null) {
        // Show day summary when in day view
        if (dailyData[selectedMonthIndex] && dailyData[selectedMonthIndex].data && dailyData[selectedMonthIndex].data[selectedDayIndex]) {
          return {
            data: dailyData[selectedMonthIndex].data[selectedDayIndex],
            title: `${dailyData[selectedMonthIndex].data[selectedDayIndex].date} Summary`
          };
        }
      }
      // Show month summary when month is selected
      if (monthlyData[selectedMonthIndex] && monthlyData[selectedMonthIndex].data && monthlyData[selectedMonthIndex].data[0]) {
        return {
          data: monthlyData[selectedMonthIndex].data[0],
          title: `${monthlyData[selectedMonthIndex].month} Summary`
        };
      }
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
