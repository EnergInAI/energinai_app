import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const LiveDashboardCard = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.5, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.card}>
      <View style={styles.liveHeader}>
        <View style={styles.liveContent}>
          <View style={styles.liveTitle}>
            <Animated.View style={[styles.liveIndicator, animatedStyle]} />
            <Text style={styles.liveTitleText}>Live Dashboard</Text>
          </View>
          <Text style={styles.liveSubtitle}>Track real-time updates of your home energy</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    boxShadow: '0 4px 12px rgba(13, 39, 77, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(13, 39, 77, 0.08)',
    marginBottom: 16,
    marginTop: -5,
  },
  liveHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  liveContent: {
    flex: 1,
  },
  liveTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#28a745',
  },
  liveTitleText: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 18, // approx 1.1rem
    color: '#0d274d',
  },
  liveSubtitle: {
    fontSize: 14, // approx 0.85rem
    color: '#777',
    fontFamily: 'Inter-Regular',
  },
});

export default LiveDashboardCard;
