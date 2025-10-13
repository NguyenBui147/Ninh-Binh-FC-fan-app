import React from 'react';
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

import { MainTabParamList } from './NavigationTypes';
import colors from '../assets/colors/colors'; 

// Import các component icon cụ thể
import { icons } from '../assets/icons'; 

// Import các Screens
import MainScreen from '../screens/Mains/mainScreen';
import NewsScreen from '../screens/Mains/newsScreen';
import ShopScreen from '../screens/Mains/shopScreen';
import UserScreen from '../screens/Mains/userScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Khai báo kiểu cho Icon Component (dùng để định nghĩa trong iconMap)
type IconComponent = React.FC<{ size: number; color: string; focused: boolean }>;

// Cập nhật iconMap: Lưu trữ các component icon
const iconMap: Record<keyof MainTabParamList, [IconComponent, IconComponent]> = {
  // Giả định: homeIcon.inactive và homeIcon.active là các component icon hợp lệ
  MainTab: [icons.homeIcon.inactive, icons.homeIcon.active], 
  NewsTab: [icons.newsIcon.inactive, icons.newsIcon.active],
  ShopTab: [icons.shopIcon.inactive, icons.shopIcon.active],
  UserTab: [icons.userIcon.inactive, icons.userIcon.active],
};

// Sử dụng kiểu BottomTabScreenProps cho toàn bộ screenOptions
type MainTabsProps = BottomTabScreenProps<MainTabParamList, keyof MainTabParamList>;

// Tách hàm tabBarIcon ra ngoài để làm code gọn hơn
const renderTabBarIcon = ({ route, focused, color, size }: { 
    route: MainTabsProps['route']; 
    focused: boolean; 
    color: string; 
    size: number 
}) => {
    // Lấy cặp [InactiveIconComponent, ActiveIconComponent]
    const [InactiveIcon, ActiveIcon] = iconMap[route.name] || [View, View]; 
    
    // Trả về component icon tương ứng với trạng thái focused
    const IconComponent = focused ? ActiveIcon : InactiveIcon;
    
    // Trả về component đã được render
    return <IconComponent size={size} color={color} focused={focused} />;
};


const MainTabNavigator = () => {
    // Sửa lại cú pháp hàm screenOptions
    const screenOptions = ({ route }: { route: MainTabsProps['route'] }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primaryRed || '#FF0000', 
        tabBarInactiveTintColor: 'gray',
        
        tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => 
            renderTabBarIcon({ route, focused, color, size }),
        
        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
        },
        tabBarStyle: {
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
        },
    });

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="MainTab" component={MainScreen} options={{ tabBarLabel: 'Trang chủ' }} />
            <Tab.Screen name="NewsTab" component={NewsScreen} options={{ tabBarLabel: 'Tin tức' }} />
            <Tab.Screen name="ShopTab" component={ShopScreen} options={{ tabBarLabel: 'Cửa hàng' }} />
            <Tab.Screen name="UserTab" component={UserScreen} options={{ tabBarLabel: 'Cá nhân' }} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
