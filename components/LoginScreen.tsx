import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import OTPInput, { OTPInputRef } from '@/components/ui/OtpInput';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const LoginScreen = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const otpInputRef = useRef<OTPInputRef>(null);

  const handleSendCode = async () => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }
    // Simulate sending code
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleVerifyCode = async (code: string) => {
    setLoading(true);
    // Simulate code verification
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)/home');
    }, 1000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Animated.View entering={FadeIn.duration(500)} style={styles.stepContainer}>
            <ThemedText type="title" style={styles.title}>Welcome Back!</ThemedText>
            <ThemedText style={styles.subtitle}>Enter your phone number to sign in.</ThemedText>
            <View style={styles.inputContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor="#999"
                maxLength={10}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSendCode} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send OTP'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/signup')}>
              <Text style={styles.secondaryButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      case 2:
        return (
          <Animated.View entering={FadeIn.duration(500)} style={styles.stepContainer}>
            <ThemedText type="title" style={styles.title}>Verify Your Number</ThemedText>
            <ThemedText style={styles.subtitle}>Enter the 6-digit code sent to your phone.</ThemedText>
            <OTPInput ref={otpInputRef} onComplete={handleVerifyCode} disabled={loading} />
            <TouchableOpacity onPress={() => setStep(1)} style={{ marginTop: 24 }}>
              <Text style={styles.linkText}>Change phone number</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F1F5F9' }}>
      <StatusBar barStyle="dark-content" />
      <ThemedView style={styles.container}>

        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/energinai-logo.png')}
            style={styles.logo}
          />
            <Text style={styles.title}>Energy Monitoring Dashboard</Text>

        </View>
        
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  countryCode: {
    fontSize: 16,
    color: '#0F172A',
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#0F172A',
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
    fontSize: 16,
    textAlign: 'center',
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    color: '#3B82F6',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
