import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './NavigationTypes';

import LoginScreen from '../screens/Auth/LoginScreen';
import OtpScreen from '../screens/Auth/OtpScreen';
import SplashScreen from '../screens/Auth/SplashScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator 
    initialRouteName="Splash" 
    screenOptions={{ 
      headerShown: false ,
      animation: 'slide_from_right',
      gestureEnabled: false
      }}>

       <AuthStack.Screen name="Splash" component={SplashScreen} />
       <AuthStack.Screen name="Login" component={LoginScreen} />
       <AuthStack.Screen name="Register" component={RegisterScreen} />
       <AuthStack.Screen name="Otp" component={OtpScreen} />

       
    </AuthStack.Navigator>
  );
};


export default AuthNavigator;
