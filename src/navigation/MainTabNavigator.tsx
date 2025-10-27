import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  MainTabParamList } from './NavigationTypes';
import NewsScreen from '../screens/Mains/NewsScreen';
import ShopScreen from '../screens/Mains/ShopScreen';
import MainScreen from '../screens/Mains/MainScreen';
import UserScreen from '../screens/Mains/UserScreen';

const MainStack = createNativeStackNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <MainStack.Navigator 
    initialRouteName="Main" 
    screenOptions={{ 
      headerShown: false ,
      gestureEnabled: false
      }}>

       <MainStack.Screen name="Home" component={MainScreen} />
       <MainStack.Screen name="News" component={NewsScreen} />
       <MainStack.Screen name="Shop" component={ShopScreen} />
       <MainStack.Screen name="User" component={UserScreen} />
    </MainStack.Navigator>
  );
};


export default MainTabNavigator;
