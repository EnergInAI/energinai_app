import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DailyData, MonthlyData } from '@/constants/mockData';
import { Fonts } from '@/constants/theme';
import React, { useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import DataItem from './DataItem';

interface DataCardProps {
  title: string;
  data: DailyData[] | MonthlyData[];
  isDaily: boolean;
}

const DataCard = ({ title, data, isDaily }: DataCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const handlePress = () => {
    const toValue = isOpen ? 0 : 1;
    setIsOpen(!isOpen);

    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <View style={styles.monthIconContainer}>
            <IconSymbol name="calendar" size={24} color="#6C5CE7" />
          </View>
          <View>
            <ThemedText style={styles.headerText}>{title}</ThemedText>
            <ThemedText style={styles.headerSubtext}>
              {data.length} {data.length === 1 ? 'entry' : 'entries'}
            </ThemedText>
          </View>
        </View>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <View style={styles.chevronContainer}>
            <IconSymbol name="chevron.down" size={20} color="#6C5CE7" />
          </View>
        </Animated.View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.contentContainer}>
          {data.map((item, index) => (
            <DataItem key={index} item={item} isDaily={isDaily} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#6C5CE7',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FAFBFF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  monthIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F0EDFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerText: {
    fontFamily: Fonts.rounded,
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 2,
  },
  headerSubtext: {
    fontFamily: Fonts.rounded,
    fontSize: 13,
    fontWeight: '500',
    color: '#95A5A6',
  },
  chevronContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0EDFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 8,
  },
});

export default DataCard;
