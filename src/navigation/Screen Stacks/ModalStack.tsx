import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ModalScreen from '../../screens/MainApp/ModalStack/ModalScreen';
import { ModalStackParamList } from '../NavigationTypes';

const Stack = createNativeStackNavigator<ModalStackParamList>();

export default function ModalStack() {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: false,
                presentation: 'modal'
            }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Navigator>
    );
}

