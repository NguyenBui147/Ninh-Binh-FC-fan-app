import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './NavigationTypes';

// Import your main screens
import mainScreen from '../screens/Mains/mainScreen';
import newsScreen from '../screens/Mains/newsScreen';
import shopScreen from '../screens/Mains/shopScreen';
import userScreen from '../screens/Mains/userScreen';

// Import icons
import { icons } from '../assets/index';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen
        name="Home"
        component={mainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            icons.facebook
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={newsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            icons.facebook
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={shopScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            icons.facebook
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={userScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            icons.google
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;