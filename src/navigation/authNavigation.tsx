import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import loginScreen from '../screens/Auth/loginScreen';
import otpScreen from '../screens/Auth/otpScreen';


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={loginScreen} />
            <Stack.Screen name="Otp" component={otpScreen} />
            {/* <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
        </Stack.Navigator>
    )
}

export default AuthNavigation;