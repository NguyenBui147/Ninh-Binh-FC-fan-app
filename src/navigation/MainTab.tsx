import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './NavigationTypes';
import colors from '../assets/colors/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainScreen from '../screens/Mains/mainScreen';
import NewsScreen from '../screens/Mains/newsScreen';
import ShopScreen from '../screens/Mains/shopScreen';
import UserScreen from '../screens/Mains/userScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const iconMap: Record<keyof MainTabParamList, [string, string]> = {
  MainTab: ['home-outline', 'home'],
  NewsTab: ['newspaper-variant-outline', 'newspaper-variant'],
  ShopTab: ['shopping-outline', 'shopping'],
  UserTab: ['account-outline', 'account'],
};

const screenOptions = ({ route }: { route: { name: keyof MainTabParamList } }) => ({
  headerShown: false,
  tabBarActiveTintColor: colors.primaryRed,
  tabBarInactiveTintColor: 'gray',
  tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
    const [inactiveIcon, activeIcon] = iconMap[route.name] || ['help-circle-outline', 'help-circle'];
    const iconName = focused ? activeIcon : inactiveIcon;
    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabBarStyle: {
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
});

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="MainTab" component={MainScreen} options={{ tabBarLabel: 'Trang chủ' }} />
      <Tab.Screen name="NewsTab" component={NewsScreen} options={{ tabBarLabel: 'Tin tức' }} />
      <Tab.Screen name="ShopTab" component={ShopScreen} options={{ tabBarLabel: 'Cửa hàng' }} />
      <Tab.Screen name="UserTab" component={UserScreen} options={{ tabBarLabel: 'Cá nhân' }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;