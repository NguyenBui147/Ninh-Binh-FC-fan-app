import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  SubStackParamList } from './NavigationTypes';
import NewsDetailsScreen from '../screens/Subs/NewsDetailsScreen';
import ProductScreen from '../screens/Subs/ProductScreen';
import PlayerScreen from '../screens/Subs/PlayerScreen';
import ProfileScreen from '../screens/Subs/ProfileScreen';
import TicketScreen from '../screens/Subs/TicketScreen';
import MainScreen from '../screens/Mains/MainScreen';


const SubStack = createNativeStackNavigator<SubStackParamList>();

const SubStackNavigator = () => {
  return (
    <SubStack.Navigator 
      screenOptions={{ 
      headerShown: false 
      }}>

       <SubStack.Screen name="NewsDetails" component={NewsDetailsScreen} />
       <SubStack.Screen name="Profile" component={ProfileScreen} />
       <SubStack.Screen name="Player" component={PlayerScreen} />
       <SubStack.Screen name="Ticket" component={TicketScreen} />
        <SubStack.Screen name="Product" component={ProductScreen} />
       <SubStack.Screen name="Default" component={MainScreen} />
    </SubStack.Navigator>
  );
};


export default SubStackNavigator;
