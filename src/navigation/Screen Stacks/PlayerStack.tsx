import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PlayerScreen from '../../screens/MainApp/MainNavigator/PlayerStack/PlayerScreen';
import DetailedPlayerScreen from '../../screens/MainApp/MainNavigator/PlayerStack/DetailedPlayerScreen';
import { PlayerStackParamList } from '../NavigationTypes';

const Stack = createNativeStackNavigator<PlayerStackParamList>();

export default function PlayerStack() {
    return (
        <Stack.Navigator initialRouteName="Player" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Player" component={PlayerScreen} />
            <Stack.Screen name="DetailedPlayer" component={DetailedPlayerScreen} />
            
        </Stack.Navigator>
    );
}

