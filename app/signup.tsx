import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { confirmSignUp, signUp } from 'aws-amplify/auth';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const SignupScreen = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ivrsNumber, setIvrsNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [solarCapacity, setSolarCapacity] = useState('');
  const [deviceId, setDeviceId] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !phoneNumber || !password || !ivrsNumber || !deviceId) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      const formattedPhoneNumber = `+91${phoneNumber}`;
      await signUp({
        username: formattedPhoneNumber,
        password,
        options: {
          userAttributes: {
            email,
            name,
            phone_number: formattedPhoneNumber,
            'custom:ivrs_number': ivrsNumber,
            'custom:solar_capacity': solarCapacity || '0',
            'custom:device_id': deviceId,
          },
        }
      });
      setStep(3); // Move to confirmation step
    } catch (error: any) {
      Alert.alert('Error signing up', error.message);
    }
  };

  const handleConfirmation = async () => {
    try {
      const formattedPhoneNumber = `+91${phoneNumber}`;
      await confirmSignUp({ username: formattedPhoneNumber, confirmationCode });
      Alert.alert('Success', 'Account confirmed successfully! You can now log in.');
      router.push('/login');
    } catch (error: any) {
      Alert.alert('Error confirming sign up', error.message);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Animated.View entering={FadeIn.duration(500)} style={styles.stepContainer}>
            <ThemedText type="title" style={styles.title}>Welcome to EnergInAI</ThemedText>
            <ThemedText style={styles.subtitle}>Monitor, Analyze, and Save on your energy consumption.</ThemedText>
            <View style={styles.cardContainer}>
                <Animated.View entering={FadeInDown.duration(500).delay(200)}>
                    <View style={styles.card}>
                        <Ionicons name="flash-outline" size={40} color="#3B82F6" />
                        <ThemedText style={styles.cardTitle}>Real-Time Monitoring</ThemedText>
                        <ThemedText style={styles.cardText}>Track your energy usage live from anywhere.</ThemedText>
                    </View>
                </Animated.View>
                <Animated.View entering={FadeInDown.duration(500).delay(400)}>
                    <View style={styles.card}>
                        <Ionicons name="analytics-outline" size={40} color="#3B82F6" />
                        <ThemedText style={styles.cardTitle}>Smart Insights</ThemedText>
                        <ThemedText style={styles.cardText}>Get personalized recommendations to reduce costs.</ThemedText>
                    </View>
                </Animated.View>
                <Animated.View entering={FadeInDown.duration(500).delay(600)}>
                    <View style={styles.card}>
                        <Ionicons name="leaf-outline" size={40} color="#3B82F6" />
                        <ThemedText style={styles.cardTitle}>Eco-Friendly</ThemedText>
                        <ThemedText style={styles.cardText}>Lower your carbon footprint and help the planet.</ThemedText>
                    </View>
                </Animated.View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setStep(2)}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      case 2:
        return (
          <Animated.View entering={FadeIn.duration(500)} style={styles.stepContainer}>
            <ThemedText type="title" style={styles.title}>Create Your Account</ThemedText>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} placeholderTextColor="#999" />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#999" />
            <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" placeholderTextColor="#999" />
            <TextInput style={styles.input} placeholder="IVRS Number" value={ivrsNumber} onChangeText={setIvrsNumber} keyboardType="number-pad" placeholderTextColor="#999" />
            <TextInput style={styles.input} placeholder="Device ID" value={deviceId} onChangeText={setDeviceId} autoCapitalize="none" placeholderTextColor="#999" />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor="#999" />
            <TextInput style={styles.input} placeholder="Solar Capacity (enter only if u have solar)" value={solarCapacity} onChangeText={setSolarCapacity} keyboardType="number-pad" placeholderTextColor="#999" />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStep(1)}>
                <Text style={styles.linkText}>Back to Welcome</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      case 3:
        return (
          <Animated.View entering={FadeIn.duration(500)} style={styles.stepContainer}>
            <ThemedText type="title" style={styles.title}>Confirm Your Account</ThemedText>
            <ThemedText style={styles.subtitle}>A confirmation code has been sent to your phone number. Please enter it below.</ThemedText>
            <TextInput style={styles.input} placeholder="Confirmation Code" value={confirmationCode} onChangeText={setConfirmationCode} keyboardType="number-pad" placeholderTextColor="#999" />
            <TouchableOpacity style={styles.button} onPress={handleConfirmation}>
              <Text style={styles.buttonText}>Confirm & Proceed</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F1F5F9' }}>
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: 'Create Account' }} />
        {renderStep()}
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F1F5F9',
  },
  stepContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#475569',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  button: {
    width: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#3B82F6',
    marginTop: 24,
    fontSize: 16,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default SignupScreen;
