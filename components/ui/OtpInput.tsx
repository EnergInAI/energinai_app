import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  disabled?: boolean;
}

export interface OTPInputRef {
  clear: () => void;
  focus: () => void;
}

const OTPInput = forwardRef<OTPInputRef, OTPInputProps>(
  ({ length = 6, onComplete, disabled = false }, ref) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputs = useRef<Array<TextInput | null>>([]);

    useImperativeHandle(ref, () => ({
      clear: () => {
        setOtp(new Array(length).fill(''));
        inputs.current[0]?.focus();
      },
      focus: () => {
        inputs.current[0]?.focus();
      },
    }));

    const handleChange = (text: string, index: number) => {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < length - 1) {
        inputs.current[index + 1]?.focus();
      }

      if (newOtp.every((digit) => digit !== '')) {
        onComplete(newOtp.join(''));
      }
    };

    const handleKeyPress = (e: any, index: number) => {
      if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    };

    return (
      <View style={styles.container}>
        {otp.map((_, index) => (
          <TextInput
            key={index}
            ref={(el) => {
              inputs.current[index] = el;
            }}
            style={[styles.input, disabled && styles.disabled]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            value={otp[index]}
            editable={!disabled}
          />
        ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    textAlign: 'center',
    borderRadius: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  disabled: {
    backgroundColor: '#F1F5F9',
    color: '#94A3B8',
  },
});

export default OTPInput;
