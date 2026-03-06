import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProductsScreen from '../../screens/MainApp/MainNavigator/ShopStack/ProductsScreen';
import DetailedProductsScreen from '../../screens/MainApp/MainNavigator/ShopStack/DetailedProductsScreen';
import CheckOutScreen from '../../screens/MainApp/MainNavigator/ShopStack/CheckOutScreen';
import CartScreen from '../../screens/MainApp/MainNavigator/ShopStack/CartScreen';
import { ProductsStackParamList } from '../NavigationTypes';

const Stack = createNativeStackNavigator<ProductsStackParamList>();

export default function ProductsStack() {
    return (
        <Stack.Navigator initialRouteName="Products" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="DetailedProducts" component={DetailedProductsScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="CheckOut" component={CheckOutScreen} />

        </Stack.Navigator>
    );
}