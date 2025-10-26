import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { dailyData, monthlyData } from '@/constants/mockData';
import { Fonts } from '@/constants/theme';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import DataCard from './DataCard';

type ViewType = 'daily' | 'monthly';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const HistoricalDataView = () => {
  const [activeView, setActiveView] = useState<ViewType>('daily');

  const data = activeView === 'daily' ? dailyData : monthlyData;
  const title = activeView === 'daily' ? 'Daily Summary' : 'Monthly Summary';

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
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          <ThemedView style={styles.container}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, activeView === 'daily' && styles.activeButton]}
                onPress={() => setActiveView('daily')}>
                <ThemedText style={[styles.buttonText, activeView === 'daily' && styles.activeButtonText]}>
                  Daily
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, activeView === 'monthly' && styles.activeButton]}
                onPress={() => setActiveView('monthly')}>
                <ThemedText style={[styles.buttonText, activeView === 'monthly' && styles.activeButtonText]}>
                  Monthly
                </ThemedText>
              </TouchableOpacity>
            </View>

            <ThemedView style={styles.summaryContainer}>
              <ThemedText style={styles.summaryTitle}>{title}</ThemedText>
              <ScrollView>
                {data.map((group, index) => (
                  <DataCard key={index} title={group.month} data={group.data} isDaily={activeView === 'daily'} />
                ))}
              </ScrollView>
            </ThemedView>
          </ThemedView>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: -16, // Compensate for parent padding
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
    marginHorizontal: 16, // Add back margin for the button container
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
    fontFamily: Fonts.rounded,
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
    fontFamily: Fonts.rounded,
    fontSize: 18,
    marginBottom: 16,
  },
});

export default HistoricalDataView;
