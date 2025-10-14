import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DailyData, MonthlyData } from '@/constants/mockData';
import { Fonts } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import DataItem from './DataItem';
import DataItem from './DataItem';

interface DataCardProps {
  title: string;
  data: DailyData[] | MonthlyData[];
  isDaily: boolean;
}

const DataCard = ({ title, data, isDaily }: DataCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    if (isDaily) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={handlePress} disabled={!isDaily}>
        <ThemedText style={styles.headerText}>{title}</ThemedText>
        {isDaily && (
          <IconSymbol name={isOpen ? 'chevron.up' : 'chevron.down'} size={20} color="#808080" />
        )}
      </TouchableOpacity>
      {(isOpen || !isDaily) && (
        <View>
          <View style={styles.dataHeader}>
            <ThemedText style={styles.dataHeaderText}>Date</ThemedText>
            <ThemedText style={styles.dataHeaderText}>Load Consumption</ThemedText>
            <ThemedText style={styles.dataHeaderText}>Solar Production</ThemedText>
            <ThemedText style={styles.dataHeaderText}>Net</ThemedText>
            <ThemedText style={styles.dataHeaderText}>Cost</ThemedText>
          </View>
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
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  headerText: {
    fontFamily: Fonts.rounded,
    fontSize: 18,
    fontWeight: '600',
  },
  dataHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  dataHeaderText: {
    fontFamily: Fonts.rounded,
    fontSize: 12,
    color: '#A0A0A0',
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default DataCard;
