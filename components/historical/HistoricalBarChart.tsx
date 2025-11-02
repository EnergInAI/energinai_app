import { DailyData, MonthlyData } from '@/constants/mockData';
import React, { useEffect } from 'react';
import { Dimensions, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

interface HistoricalBarChartProps {
  activeView: 'daily' | 'monthly';
  monthlyData: { month: string; data: MonthlyData[] }[];
  dailyData: { month: string; data: DailyData[] }[];
  selectedMonthIndex: number | null;
  selectedDayIndex: number | null;
  chartMode: 'months' | 'days';
  onMonthSelect: (index: number) => void;
  onDaySelect: (index: number) => void;
}

const { width: windowWidth } = Dimensions.get('window');

const monthMap: { [key: string]: string } = {
  'January': 'Jan',
  'February': 'Feb',
  'March': 'Mar',
  'April': 'Apr',
  'May': 'May',
  'June': 'Jun',
  'July': 'Jul',
  'August': 'Aug',
  'September': 'Sep',
  'October': 'Oct',
  'November': 'Nov',
  'December': 'Dec'
};

const getShortMonth = (monthString: string): string => {
  const monthName = monthString.split(' ')[0];
  return monthMap[monthName] || monthName.substring(0, 3);
};

const HistoricalBarChart = ({
  activeView,
  monthlyData,
  dailyData,
  selectedMonthIndex,
  selectedDayIndex,
  chartMode,
  onMonthSelect,
  onDaySelect,
}: HistoricalBarChartProps) => {
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [chartMode, activeView]);
  // For daily view - show recent days (last 10 days from most recent month)
  if (activeView === 'daily' && chartMode === 'months') {
    const mostRecentMonth = dailyData[dailyData.length - 1];
    const recentDays = mostRecentMonth.data.slice(-10); // Last 10 days

    const barWidth = 32;
    const barSpacing = 25;
    const chartHeight = 220;
    const availableHeight = chartHeight - 60;
    const maxValue = Math.max(...recentDays.map(item => item.loadConsumption));
    const chartWidth = 80 + recentDays.length * (barWidth + barSpacing);

    return (
      <View style={styles.fullWidthContainer}>
        <Text style={styles.title}>Recent Days - Load Consumption</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.chartScrollView}
          decelerationRate="fast"
          scrollEventThrottle={16}
          removeClippedSubviews={true}
        >
          <View style={{ position: 'relative' }}>
            {/* X-axis labels */}
            <View style={styles.labelsContainer}>
              {recentDays.map((item, index) => {
                const leftPosition = 40 + index * (barWidth + barSpacing);
                const month = getShortMonth(mostRecentMonth.month);
                const day = item.date.split(', ')[1];

                return (
                  <Text
                    key={index}
                    style={[
                      styles.label,
                      {
                        left: leftPosition + barWidth / 2,
                        top: chartHeight - 20,
                      }
                    ]}
                  >
                    {`${day}`}
                  </Text>
                );
              })}
            </View>

            {/* Custom rounded bars using SVG */}
            <Svg
              height={chartHeight}
              width={chartWidth}
            >
              {recentDays.map((item, index) => {
                const leftPosition = 40 + index * (barWidth + barSpacing);
                const value = item.loadConsumption;
                const barHeight = (value / maxValue) * availableHeight * 0.9;
                const isSelected = selectedDayIndex === index;

                return (
                  <Rect
                    key={index}
                    x={leftPosition}
                    y={40 + (availableHeight - barHeight)}
                    width={barWidth}
                    height={barHeight}
                    fill={isSelected ? '#3B82F6' : '#ADD8E6'}
                    rx={8}
                    ry={8}
                  />
                );
              })}
            </Svg>
          </View>
        </ScrollView>

        {/* Custom touchable bars for selection */}
        <View style={[styles.overlayContainer, { width: chartWidth }]}>
          {recentDays.map((item, index) => {
            const leftPosition = 40 + index * (barWidth + barSpacing);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.barTouchable,
                  {
                    left: leftPosition,
                    width: barWidth,
                    height: availableHeight,
                  }
                ]}
                onPress={() => onDaySelect(index)}
              />
            );
          })}
        </View>

        {/* Tooltip for selected bar */}
        {selectedDayIndex !== null && (
          <View style={[
            styles.tooltip,
            {
              left: 40 + selectedDayIndex * (barWidth + barSpacing) + barWidth / 2 - 30,
              top: 220 - 60 - recentDays[selectedDayIndex].loadConsumption * 1.5 - 40,
            }
          ]}>
            <Text style={styles.tooltipText}>
              {recentDays[selectedDayIndex].loadConsumption} kWh
            </Text>
          </View>
        )}
      </View>
    );
  }

  // For monthly view - show all months
  if (activeView === 'monthly' && chartMode === 'months') {
    const barWidth = 32;
    const barSpacing = 20;
    const chartHeight = 220;
    const availableHeight = chartHeight - 60;
    const maxValue = Math.max(...monthlyData.map(item => item.data[0].loadConsumption));
    const chartWidth = 80 + monthlyData.length * (barWidth + barSpacing);

    return (
      <View style={styles.fullWidthContainer}>
        <Text style={styles.title}>Monthly Load Consumption</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.chartScrollView}
          decelerationRate="fast"
          scrollEventThrottle={16}
          removeClippedSubviews={true}
        >
          <View style={{ position: 'relative' }}>
            {/* X-axis labels */}
            <View style={styles.labelsContainer}>
              {monthlyData.map((item, index) => {
                const leftPosition = 40 + index * (barWidth + barSpacing);
                const month = getShortMonth(item.month);

                return (
                  <Text
                    key={index}
                    style={[
                      styles.label,
                      {
                        left: leftPosition + barWidth / 2,
                        top: chartHeight - 20,
                      }
                    ]}
                  >
                    {month}
                  </Text>
                );
              })}
            </View>

            {/* Custom rounded bars using SVG */}
            <Svg
              height={chartHeight}
              width={chartWidth}
            >
              {monthlyData.map((item, index) => {
                const leftPosition = 40 + index * (barWidth + barSpacing);
                const value = item.data[0].loadConsumption;
                const barHeight = (value / maxValue) * availableHeight * 0.9;
                const isSelected = selectedMonthIndex === index;

                return (
                  <Rect
                    key={index}
                    x={leftPosition}
                    y={40 + (availableHeight - barHeight)}
                    width={barWidth}
                    height={barHeight}
                    fill={isSelected ? '#3B82F6' : '#ADD8E6'}
                    rx={8}
                    ry={8}
                  />
                );
              })}
            </Svg>
          </View>
        </ScrollView>

        {/* Custom touchable bars for selection */}
        <View style={[styles.overlayContainer, { width: chartWidth }]}>
          {monthlyData.map((item, index) => {
            const leftPosition = 40 + index * (barWidth + barSpacing);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.barTouchable,
                  {
                    left: leftPosition,
                    width: barWidth,
                    height: availableHeight,
                  }
                ]}
                onPress={() => onMonthSelect(index)}
              />
            );
          })}
        </View>

        {/* Tooltip for selected bar */}
        {selectedMonthIndex !== null && (
          <View style={[
            styles.tooltip,
            {
              left: 40 + selectedMonthIndex * (barWidth + barSpacing) + barWidth / 2 - 30,
              top: 220 - 60 - monthlyData[selectedMonthIndex].data[0].loadConsumption * 1.5 - 40,
            }
          ]}>
            <Text style={styles.tooltipText}>
              {monthlyData[selectedMonthIndex].data[0].loadConsumption} kWh
            </Text>
          </View>
        )}
      </View>
    );
  }

  // For monthly view showing days of selected month
  if (activeView === 'monthly' && chartMode === 'days' && selectedMonthIndex !== null) {
    const selectedMonthData = dailyData[selectedMonthIndex];
    const barWidth = 32;
    const barSpacing = 35;
    const chartHeight = 220;
    const availableHeight = chartHeight - 60;
    const maxValue = Math.max(...selectedMonthData.data.map(item => item.loadConsumption));
    const chartWidth = 80 + selectedMonthData.data.length * (barWidth + barSpacing);

    return (
      <View style={styles.fullWidthContainer}>
        <Text style={styles.title}>Monthly Load Consumption</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chartScrollView}
          decelerationRate="fast"
          scrollEventThrottle={16}
          removeClippedSubviews={true}
        >
          <View style={{ position: 'relative' }}>
            {/* X-axis labels */}
            <View style={styles.labelsContainer}>
              {selectedMonthData.data.map((item, index) => {
                const leftPosition = 40 + index * (barWidth + barSpacing);
                const month = getShortMonth(selectedMonthData.month);
                const day = item.date.split(', ')[1];

                return (
                  <Text
                    key={index}
                    style={[
                      styles.label,
                      {
                        left: leftPosition + barWidth / 2,
                        top: chartHeight - 20,
                      }
                    ]}
                  >
                    {`${month} ${day}`}
                  </Text>
                );
              })}
            </View>

            {/* Custom rounded bars using SVG */}
            <Svg
              height={chartHeight}
              width={chartWidth}
            >
              {selectedMonthData.data.map((item, index) => {
                const leftPosition = 40 + index * (barWidth + barSpacing);
                const value = item.loadConsumption;
                const barHeight = (value / maxValue) * availableHeight * 0.9;
                const isSelected = selectedDayIndex === index;

                return (
                  <Rect
                    key={index}
                    x={leftPosition}
                    y={40 + (availableHeight - barHeight)}
                    width={barWidth}
                    height={barHeight}
                    fill={isSelected ? '#3B82F6' : '#ADD8E6'}
                    rx={8}
                    ry={8}
                  />
                );
              })}
            </Svg>
          </View>
        </ScrollView>

        {/* Custom touchable bars for selection */}
        <View style={[styles.overlayContainer, { width: chartWidth }]}>
          {selectedMonthData.data.map((item, index) => {
            const leftPosition = 40 + index * (barWidth + barSpacing);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.barTouchable,
                  {
                    left: leftPosition,
                    width: barWidth,
                    height: availableHeight,
                  }
                ]}
                onPress={() => onDaySelect(index)}
              />
            );
          })}
        </View>

        {/* Tooltip for selected bar */}
        {selectedDayIndex !== null && (
          <View style={[
            styles.tooltip,
            {
              left: 40 + selectedDayIndex * (barWidth + barSpacing) + barWidth / 2 - 30,
              top: 220 - 60 - selectedMonthData.data[selectedDayIndex].loadConsumption * 1.5 - 40,
            }
          ]}>
            <Text style={styles.tooltipText}>
              {selectedMonthData.data[selectedDayIndex].loadConsumption} kWh
            </Text>
          </View>
        )}
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#0d274d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  fullWidthContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  chartScrollView: {
    marginHorizontal: -20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  backButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    flex: 1,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  labelsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  label: {
    position: 'absolute',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    transform: [{ translateX: -15 }],
  },
  overlayContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    height: 220,
  },
  barTouchable: {
    position: 'absolute',
    bottom: 0,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default HistoricalBarChart;
