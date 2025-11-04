import { StyleSheet } from 'react-native';

import HistoricalDataView from '@/components/historical/HistoricalDataView';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Header from '@/components/ui/Header';
import { Fonts } from '@/constants/theme';

export default function HistoricalScreen() {
  return (
    <>
    <Header />
    <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Historical Data
        </ThemedText>
      </ThemedView>
      <HistoricalDataView />
    
    </>
      
    
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center', 
  },
});
