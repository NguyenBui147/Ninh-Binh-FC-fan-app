import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './NavigationTypes';

import LoginScreen from '../screens/AuthStack/LoginScreen';
import OtpScreen from '../screens/AuthStack/OtpScreen';
import RegisterScreen from '../screens/AuthStack/RegisterScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator 
    initialRouteName="Login" 
    screenOptions={{ 
      headerShown: false ,
      animation: 'slide_from_right',
      gestureEnabled: false
      }}>

       
       <AuthStack.Screen name="Login" component={LoginScreen} />
       <AuthStack.Screen name="Register" component={RegisterScreen} />
       <AuthStack.Screen name="Otp" component={OtpScreen} />

       
    </AuthStack.Navigator>
  );
};


export default AuthNavigator;
