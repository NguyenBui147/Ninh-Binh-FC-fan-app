import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './NavigationTypes';
import LoginScreen from '../screens/Auth/LoginScreen';
import OtpScreen from '../screens/Auth/OtpScreen';
import MainScreen from '../screens/Mains/MainScreen';
import SplashScreen from '../screens/Auth/SplashScreen';

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
       <AuthStack.Screen name="Otp" component={OtpScreen} />
       <AuthStack.Screen name="Main" component={MainScreen} />
    </AuthStack.Navigator>
  );
};


export default AuthNavigator;
