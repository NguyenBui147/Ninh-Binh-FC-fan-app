import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MatchesScreen from '../../screens/MainApp/MainNavigator/ScheduleStack/MatchesScreen';
import LeaderBoardScreen from '../../screens/MainApp/MainNavigator/ScheduleStack/LeaderBoardScree';
import { ScheduleStackParamList } from '../NavigationTypes';

const Stack = createNativeStackNavigator<ScheduleStackParamList>();

export default function ScheduleStack() {
    return (
        <Stack.Navigator initialRouteName="Matches" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Matches" component={MatchesScreen} />
            <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} />
        </Stack.Navigator>
    );
}

