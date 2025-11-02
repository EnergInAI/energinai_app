import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const logo = require('../../assets/images/energinai-logo.png');

interface HeaderProps {
  onProfilePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onProfilePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSpacer} />
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
        <MaterialCommunityIcons name="account-circle" size={32} color="#0d274d" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    marginTop: 18,
  },
  leftSpacer: {
    width: 32, // Same width as profile icon for centering
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  profileButton: {
    padding: 4,
  },
});

export default Header;
