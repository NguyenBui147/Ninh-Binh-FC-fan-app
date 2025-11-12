import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProductsScreen from '../../screens/MainApp/MainNavigator/ShopStack/ProductsScreen';
import DetailedProductsScreen from '../../screens/MainApp/MainNavigator/ShopStack/DetailedProductsScreen';
import TicketScreen from '../../screens/MainApp/MainNavigator/ShopStack/TicketScreen';
import DetailedTicketScreen from '../../screens/MainApp/MainNavigator/ShopStack/DetailedTicketScreen';
import CheckOutScreen from '../../screens/MainApp/MainNavigator/ShopStack/CheckOutScreen';
import { ShopStackParamList } from '../NavigationTypes';

const Stack = createNativeStackNavigator<ShopStackParamList>();

export default function ShopStack() {
    return (
        <Stack.Navigator initialRouteName="Products" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="DetailedProducts" component={DetailedProductsScreen} />
            <Stack.Screen name="Ticket" component={TicketScreen} />
            <Stack.Screen name="DetailedTicket" component={DetailedTicketScreen} />
            <Stack.Screen name="CheckOut" component={CheckOutScreen} />
        </Stack.Navigator>
    );
}

