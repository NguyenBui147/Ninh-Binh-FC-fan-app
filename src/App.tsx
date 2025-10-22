// src/App.tsx

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './app-redux/store/index'; // Đảm bảo đường dẫn đúng
import AuthNavigator from './navigation/AuthStack'; // Đảm bảo đường dẫn đúng
import MainTabNavigator from './navigation/MainTab'; // Đảm bảo đường dẫn đúng
import { RootStackParamList } from './navigation/NavigationTypes'; // Đảm bảo đường dẫn đúng
import splashScreen from './screens/splashScreen'; // Đảm bảo đường dẫn đúng
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

/**
 * ✅ BƯỚC 2: Component App chính bây giờ chỉ có nhiệm vụ là cung cấp Redux Provider
 */
const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;