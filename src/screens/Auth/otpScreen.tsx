import {  Text, View } from 'react-native'
import { StyleSheet } from 'react-native';
import React, { use } from 'react'
import RoundedButton from '../../components/buttons/roundedButton';
import OTPInputField from '../../components/input/otpInput';
import app from '../../firebase/firebase';
import Colors from '../../assets/colors/colors';
import { AuthStackScreensProps } from '../../navigation/NavigationTypes';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';



const OtpScreen: React.FC<AuthStackScreensProps<'Otp'>> = ({ navigation }) =>{
 


  return (
   <View style={styles.container}>
    <Text>hello</Text>
    <OTPInputField

      />
    <Text>otpScreen</Text>
   </View>
  )
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  header: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  headlineText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 5,
  },
  subHeadlineText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
  },
});

  

 


export default OtpScreen

