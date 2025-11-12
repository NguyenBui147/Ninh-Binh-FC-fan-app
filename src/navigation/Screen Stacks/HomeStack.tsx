import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../../screens/MainApp/MainNavigator/HomeStack/HomeScreen';
import LiveChatScreen from '../../screens/MainApp/MainNavigator/HomeStack/LiveChatScreen';
import { HomeStackParamList } from '../NavigationTypes';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="LiveChat" component={LiveChatScreen} />
        </Stack.Navigator>
    );
}