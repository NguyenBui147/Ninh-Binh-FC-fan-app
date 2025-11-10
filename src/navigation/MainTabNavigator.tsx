import React, {  useState } from 'react';

import NewsScreen from '../screens/Mains/NewsScreen';
import ShopScreen from '../screens/Mains/ShopScreen';
import MainScreen from '../screens/Mains/MainScreen';

import MatchesScreen from '../screens/Mains/MatchesScreen';
import { Appbar, BottomNavigation } from 'react-native-paper';
import Colors from '../assets/colors/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, View } from 'react-native';
import { images } from '../assets';
import { useNavigation } from '@react-navigation/native';
import SocialScreen from '../screens/Mains/SocialScreen';




const MainTabNavigator = () => {
  const navigation = useNavigation();

  const [index,setIndex]= useState(0);

  const [routes] = useState([
    {key: 'main' ,title: 'Trang chủ' ,focusedIcon: 'home', unfocusedIcon : 'home-outline'},
    {key: 'news' ,title: 'Tin tức' ,focusedIcon: 'newspaper-variant', unfocusedIcon : 'newspaper-variant-outline'},
    {key: 'shop' ,title: 'Cửa hàng' ,focusedIcon: 'store', unfocusedIcon : 'store-outline'},
    {key: 'matches' ,title: 'Lịch thi đấu' ,focusedIcon: 'calendar', unfocusedIcon : 'calendar-outline'},
    {key: 'social' ,title: 'Cộng đồng' ,focusedIcon: 'account', unfocusedIcon : 'account-outline'},
    
  ]);

  const renderScene = BottomNavigation.SceneMap({
    news: NewsScreen,
    matches: MatchesScreen,
    main: MainScreen,
    shop: ShopScreen,
    social: SocialScreen,
  });

  return(
    <SafeAreaView style={style.container}>
      <Appbar.Header
        style={style.header}
        mode='small'
      >
        <Image style={style.logo} source={images.nbfc}/>
        <View style={style.spacer}/>
        
        <Appbar.Action 
          icon="person-circle-outline" 
          color={Colors.black} 
          size={30}
          onPress={() => {
            navigation.navigate('UserScreen' as never);
          }}
          />
        <Appbar.Action 
          icon="notifications-outline" 
          color={Colors.black} 
          size={30}
          onPress={() => {
            

          }}
          />
        
      </Appbar.Header>

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{backgroundColor: Colors.maroon}}
      />
    </SafeAreaView>
  )
  
};


const style = StyleSheet.create({
  logo:{
    alignSelf:'center',
    width: 50,
    height: 50,
  },
  header:{
    backgroundColor: Colors.lightNavy,
    alignContent:'space-between',
    margin:10,
  },
  container:{
    flex : 1,
  },
  spacer:{
    flex:1,
  }

})


export default MainTabNavigator;
