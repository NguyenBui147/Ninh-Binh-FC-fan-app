import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from '../../screens/MainApp/Profile/ProfileScreen';
import EditProfileScreen from '../../screens/MainApp/Profile/EditProfileScreen';
import { ProfileStackParamList } from '../NavigationTypes';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        </Stack.Navigator>
    );
}