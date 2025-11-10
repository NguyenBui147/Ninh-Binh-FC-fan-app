import React, {  useState } from 'react';

import NewsScreen from '../screens/Mains/NewsScreen';
import ShopScreen from '../screens/Mains/ShopScreen';
import MainScreen from '../screens/Mains/MainScreen';

import MatchesScreen from '../screens/Mains/MatchesScreen';

import Colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Image,Text, StyleSheet, View ,Pressable} from 'react-native';
import { images } from '../assets';

import SocialScreen from '../screens/Mains/SocialScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SubStackScreensProps } from './NavigationTypes';

type IconName = 
  | 'newspaper-variant'
  | 'store'
  | 'home'
  | 'calendar'
  | 'account';

type Route = {
  key: string;
  title: string;
  icon: IconName;
};

const routes: Route[] = [
  { key: 'news', title: 'Tin tức', icon: 'newspaper-variant' },
  { key: 'shop', title: 'Cửa hàng', icon: 'store' },
  { key: 'main', title: 'Trang chủ', icon: 'home' },
  { key: 'matches', title: 'Lịch thi đấu', icon: 'calendar' },
  { key: 'social', title: 'Cộng đồng', icon: 'account' },
];

const MainTabNavigator:React.FC<SubStackScreensProps<'Default'>> = ({navigation}) => {
  const [index, setIndex] = useState(2);

  const renderScene = () => {
    switch (routes[index].key) {
      case 'news':
        return <NewsScreen />;
      case 'shop':
        return <ShopScreen />;
      case 'main':
        return <MainScreen />;
      case 'matches':
        return <MatchesScreen />;
      case 'social':
        return <SocialScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* APPBAR */}
      <View style={styles.appBar}>
        
        <Image source={images.nbfc} style={styles.logo} />

        <View style={{ flexDirection: 'row', gap: 15 }}>
          
        <Pressable
          onPress={() => navigation.navigate('Profile')}
          style={styles.iconCircle}>
          <MaterialCommunityIcons name="account" size={24} color={Colors.white} />
        </Pressable>
        <Pressable
          onPress={() => console.log('Notifications')}
          style={styles.iconCircle}>
          <MaterialCommunityIcons name="bell-outline" size={24} color={Colors.white} />
        </Pressable>
          </View>
      </View>

      {/* MAIN CONTENT */}
      <View style={{ flex: 1 }}>{renderScene()}</View>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomBar}>
        {routes.map((route, i) => {
          const isActive = i === index;
          return (
            <Pressable
              key={route.key}
              onPress={() => setIndex(i)}
              style={[styles.tabButton, isActive && styles.activeTab]}>
              <MaterialCommunityIcons
                name={route.icon}
                size={isActive ? 28 : 24}
                color={isActive ? Colors.white : '#bbb'}
              />
              <Text style={[styles.tabText, isActive && { color: Colors.white }]}>
                {route.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray1 },

  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
      alignItems: 'center',
    backgroundColor: Colors.maroon,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },

  logo: { 
    width: 50, 
    height: 50, 
    resizeMode: 'contain',
    backgroundColor: Colors.black,
    
    padding: 8,
    borderRadius: 50 },

  iconCircle: {
    
    alignSelf: 'flex-end',
    backgroundColor: '#ffffff33',
    padding: 8,
    borderRadius: 20,
    
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.maroon,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
    paddingTop: 6,
    elevation: 10,
  },

  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 5,
  },

  activeTab: {
    backgroundColor: '#ffffff22',
    borderRadius: 12,
  },

  tabText: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 2,
  },
});

export default MainTabNavigator;