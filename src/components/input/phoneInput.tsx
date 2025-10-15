import * as React from 'react';
import { TextInput } from 'react-native-paper';

const PhoneInput = () => {
  const [phone, setPhone] = React.useState('');

  const handleChange = (text: string) => {
    // keep numbers only
    const digitsOnly = text.replace(/[^0-9]/g, '');
    setPhone(digitsOnly);
  };

  return (
    <TextInput
    style={{ width: '100%', height: 0 }}
      mode="outlined"
      label="Số điện thoại"
      placeholder="Nhập số điện thoại"
      keyboardType="phone-pad"
      value={phone}
      onChangeText={handleChange}
    />
  );
};

export default PhoneInput;
