import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

interface OTPInputProps {
  length?: number; // otp length
  onComplete?: (otp: string) => void; // callback
}

const OTPInputField: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
  const { colors } = useTheme();
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputs = useRef<any[]>([]);

  useEffect(() => {
    // Auto focus on the first input 
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    // Only numbers
    if (!/^[0-9]*$/.test(text)) {
      return;
    }
    
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next i
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // combine otp array to string
    const otpValue = newOtp.join('');

    // Call onComplete if all inputs are filled
    if (otpValue.length === length) {
      onComplete?.(otpValue);
      Keyboard.dismiss();
    }
  };

  const handleBackspace = (event: any, index: number) => {
    // Di chuyển về ô trước đó nếu ô hiện tại rỗng và người dùng nhấn backspace
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(input) => (inputs.current[index] = input)}
          style={[styles.input, { borderColor: colors.primary }]}
          value={otp[index]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleBackspace(event, index)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          mode="outlined"
          selectionColor={colors.primary}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    width: 50,
    height: 60,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default OTPInputField;