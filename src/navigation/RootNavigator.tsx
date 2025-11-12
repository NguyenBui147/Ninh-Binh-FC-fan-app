

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from '../app-redux/store/index'; 
import AuthNavigator from '../navigation/AuthStackNavigator'; 
import MainTabNavigator from './MainTabNavigator';

import { RootStackParamList } from '../navigation/NavigationTypes'; 
 
import { Provider } from 'react-redux';
import { useAuth } from '../hooks/useAuth'; 
import { ActivityIndicator } from 'react-native-paper';
import Colors from '../assets/colors/colors';
import SplashScreen from '../screens/SplashScreen';



const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.black} />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <RootStack.Screen name="Splash" component={SplashScreen} />
            <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
            
          </>
        ) : (
          <RootStack.Screen name="AuthStack" component={AuthNavigator} />
        )}
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