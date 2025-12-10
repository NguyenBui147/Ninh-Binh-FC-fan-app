import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TicketsScreen from '../../screens/MainApp/MainNavigator/ShopStack/TicketsScreen';
import DetailedTicketsScreen from '../../screens/MainApp/MainNavigator/ShopStack/DetailedTicketsScreen';
import CheckOutScreen from '../../screens/MainApp/MainNavigator/ShopStack/CheckOutScreen';
import { TicketsStackParamList } from '../NavigationTypes';

const Stack = createNativeStackNavigator<TicketsStackParamList>();

export default function TicketsStack() {
    return (
        <Stack.Navigator initialRouteName="Tickets" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tickets" component={TicketsScreen} />
            <Stack.Screen name="DetailedTickets" component={DetailedTicketsScreen} />
            <Stack.Screen name="CheckOut" component={CheckOutScreen} />
            
        </Stack.Navigator>
    );
}