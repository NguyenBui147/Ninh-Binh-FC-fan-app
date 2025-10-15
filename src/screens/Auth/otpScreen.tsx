import {  Text, View ,} from 'react-native'
import React, { use } from 'react'
import RoundedButton from '../../components/buttons/roundedButton';
import OTPInputField from '../../components/input/otpInput';
import app from '../../firebase/firebase';
import Colors from '../../assets/colors/colors';
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber
  
}from '../../firebase/firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type OTPRouteProps = NativeStackScreenProps<any, 'Otp'>;


const otpScreen = () => {
  const route = useRoute<OTPRouteProps>();
  

  return (
   
  )
}

export default otpScreen

