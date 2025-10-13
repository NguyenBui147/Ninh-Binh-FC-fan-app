import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './navigation/AuthStack';
import MainTabNavigator from './navigation/MainTab';
import { RootStackParamList } from './navigation/NavigationTypes';
import splashScreen from './screens/splashScreen';

import { useAuth } from './hooks/useAuth';// Mới: Sử dụng hook xác thực


const RootStack = createNativeStackNavigator<RootStackParamList>();


const SplashScreen = splashScreen;

//component 
const App = () => {
  const { isAuthenticated, isLoading } = useAuth(); 

  // Splash screen, check token
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          
          <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
        ) : (
          
          <RootStack.Screen name="AuthStack" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
