import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './NavigationTypes';
import loginScreen from '../screens/Auth/loginScreen';
import otpScreen from '../screens/Auth/otpScreen';



const LoginScreen = loginScreen; 
const OtpScreen= otpScreen;

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
       <AuthStack.Screen name="Login" component={LoginScreen} />
       <AuthStack.Screen name="Otp" component={OtpScreen} />
    </AuthStack.Navigator>
  );
};


export default AuthNavigator;
