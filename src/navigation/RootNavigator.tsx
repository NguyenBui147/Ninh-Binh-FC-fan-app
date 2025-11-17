
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from '../app-redux/store/index'; 
import AuthNavigator from '../navigation/AuthStackNavigator'; 
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from '../navigation/NavigationTypes'; 
import { Provider } from 'react-redux';
import { useAuth } from '../hooks/useAuth'; 
import SplashScreen from '../screens/SplashScreen';
import { navigationRef, resetRoot } from './NavigationService'; 
import { StyleSheet } from 'react-native'; 

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        resetRoot('MainTabs'); 
      } else {
        resetRoot('AuthStack');
      }
    }
  }, [user, isLoading]);

  return (
    <NavigationContainer ref={navigationRef}> 
      <RootStack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash" 
      >
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="AuthStack" component={AuthNavigator} />
        <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <RootNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;