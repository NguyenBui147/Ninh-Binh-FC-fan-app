import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Image ,Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Import các Stack con ---
import HomeStack from './Screen Stacks/HomeStack'; 
import NewsStack from './Screen Stacks/NewsStack'; 
import ShopStack from './Screen Stacks/ShopStack';
import ScheduleStack from './Screen Stacks/ScheduleStack';
import ProfileStack from './Screen Stacks/ProfileStack';

// --- Import Constants ---
import Colors from '../assets/colors/colors';
import { images } from '../assets';
import { MainTabParamList } from './NavigationTypes'; 
import { Text } from 'react-native-gesture-handler';



const Tab = createBottomTabNavigator<MainTabParamList>();

const routesConfig: { key: keyof MainTabParamList; title: string; icon: [string, string]; component: React.ComponentType<any> }[] = [
    { key: 'news', title: 'Tin tức', icon: ['newspaper-variant-outline', 'newspaper-variant'], component: NewsStack },
    { key: 'shop', title: 'Cửa hàng', icon: ['store-outline', 'store'], component: ShopStack },
    { key: 'home', title: 'Trang chủ', icon: ['home-outline', 'home'], component: HomeStack },
    { key: 'matches', title: 'Lịch thi đấu', icon: ['calendar-outline', 'calendar'], component: ScheduleStack },
    { key: 'profile', title: 'Cộng đồng', icon: ['account-group-outline', 'account-group'], component: ProfileStack },
];

const MainTabNavigator = () => {
    const navigation = useNavigation();

    // Hàm tùy chỉnh icon
    const getTabBarIcon = (routeName: keyof MainTabParamList, focused: boolean, color: string, size: number) => {
        const config = routesConfig.find(r => r.key === routeName);
        if (!config) return null;

        const [inactiveIcon, activeIcon] = config.icon;
        const iconName = focused ? activeIcon : inactiveIcon;

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
    };

  
    const navigateToProfile = () => {
        navigation.navigate('ProfileStack' as never); 
    };

    const navigateToNotifications = () => {
        
        navigation.navigate('NotificationScreen' as never); 
    };

    return (
        <View style={styles.container}> 
            <SafeAreaView style={styles.appBarContainer}>
                <View style={styles.appBar}>
                    <Image source={images.nbfc} style={styles.logo} />
                    <Text style={styles.headerText}>NBFC</Text>
                    <View style={styles.spacer} />
                    <Pressable onPress={navigateToProfile} style={styles.iconCircle}>
                        <MaterialCommunityIcons name="account-circle-outline" size={24} color={Colors.white} />
                    </Pressable>
                    <Pressable onPress={navigateToNotifications} style={styles.iconCircle}>
                        <MaterialCommunityIcons name="bell-outline" size={24} color={Colors.white} />
                    </Pressable>
                </View>
            </SafeAreaView>


            {/* --- BOTTOM TAB NAVIGATOR (React Navigation) --- */}
            <Tab.Navigator
                initialRouteName="home"
                screenOptions={({ route }) => ({
                    headerShown: false, 
                    tabBarActiveTintColor: Colors.maroon,
                    tabBarInactiveTintColor: Colors.gray,
                    tabBarStyle: styles.tabBarStyle,
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route.name as keyof MainTabParamList, focused, color, size),
                })}
            >
                {routesConfig.map((route) => (
                    <Tab.Screen 
                        key={route.key}
                        name={route.key as keyof MainTabParamList}
                        component={route.component} 
                        options={{ tabBarLabel: route.title }}
                    />
                ))}
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: Colors.gray1 
    },
    
    // --- APP BAR STYLES ---
    appBarContainer: {
        backgroundColor: Colors.maroon, // Màu nền cho SafeArea
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.maroon,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginRight: 10,
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 5,
    },
    spacer: {
        flex: 1,
    },
    iconCircle: {
        backgroundColor: '#ffffff33',
        padding: 8,
        borderRadius: 20,
        marginLeft: 10,
    },
    headerText:{
        fontSize:30,
        fontWeight:800,
        color:Colors.brightYellow,
        
    },
  
    tabBarStyle: {
        backgroundColor: Colors.darkNavy,
        borderTopWidth: 0,
        height: 60,
        paddingBottom: 5,
        paddingTop: 5,
    },
    tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 2,
    },
});

export default MainTabNavigator;