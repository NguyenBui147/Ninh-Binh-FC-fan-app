import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NewsScreen from '../../screens/MainApp/MainNavigator/NewsStack/NewsScreen';
import DetailedNewScreen from '../../screens/MainApp/MainNavigator/NewsStack/DetailedNewScreen';
import { NewsStackParamList } from '../NavigationTypes';

const Stack = createNativeStackNavigator<NewsStackParamList>();

export default function NewsStack() {
    return (
        <Stack.Navigator initialRouteName="News" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="News" component={NewsScreen} />
            <Stack.Screen name="DetailedNews" component={DetailedNewScreen} />
        </Stack.Navigator>
    );
}

