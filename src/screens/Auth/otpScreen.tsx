import {  Text, View } from 'react-native'
import React from 'react'
import RoundedButton from '../../components/buttons/roundedButton';
import OTPInputField from '../../components/input/otpInput';

const otpScreen = () => {
  const [otpCode, setOtp] = React.useState('');

  const handleOtpSubmit = async (otp: string) => {
    setOtp(otp);
    console.log('OTP entered:', otp);
  }
  

  return (
    <View>
      <Text>otpScreen</Text>
      <OTPInputField
        length={6}
        onComplete={handleOtpSubmit}
      />
      <RoundedButton
        text="Xác nhận OTP"
        backgroundColor={Colors.black}
        onPress={handleLoginTest}
      />
    </View>
  )
}

export default otpScreen

