import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';


interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChangeText, placeholder }) => {
  const handleChange = (text: string) => {
    // Chỉ giữ lại ký tự số
    const digitsOnly = text.replace(/[^0-9]/g, '');
    onChangeText(digitsOnly);
  };

  return (
    <TextInput
      style={styles.input}
      mode="outlined"
      label="Số điện thoại"
      placeholder={placeholder}
      keyboardType="phone-pad"
      value={value}
      onChangeText={handleChange}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    marginBottom: 20,
  },
});

export default PhoneInput;
