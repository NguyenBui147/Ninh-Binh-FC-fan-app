// src/App.tsx

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './app-redux/store/index'; 
import AuthNavigator from './navigation/AuthStackNavigator'; 
import MainTabNavigator from './navigation/MainTab'; 
import { RootStackParamList } from './navigation/NavigationTypes'; 
import splashScreen from './screens/splashScreen'; 
import { Provider } from 'react-redux';
import { useAuth } from './hooks/useAuth'; 
const RootStack = createNativeStackNavigator<RootStackParamList>();
const SplashScreen = splashScreen;

const RootNavigator = () => {
  const { user, isLoading } = useAuth(); 

  // Splash screen, check token
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen 
          name={user ? "MainTabs" : "AuthStack"} 
          component={user ? MainTabNavigator : AuthNavigator} 
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};


const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;