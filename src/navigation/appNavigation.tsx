import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import loginScreen from '../screens/Auth/loginScreen';


const Stack = createNativeStackNavigator();

const appNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={loginScreen} />
            
            {/* <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
        </Stack.Navigator>
    )
}

export default appNavigation;