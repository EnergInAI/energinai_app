import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginScreen = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/dashboard');
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/energinai-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Energy Monitoring Dashboard</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>User Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#999"
        />
        <Text style={styles.label}>IVRS Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your IVRS number"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 16,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
