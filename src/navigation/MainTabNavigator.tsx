import React, {  useState } from 'react';

import NewsScreen from '../screens/Mains/NewsScreen';
import ShopScreen from '../screens/Mains/ShopScreen';
import MainScreen from '../screens/Mains/MainScreen';
import UserScreen from '../screens/Mains/UserScreen';
import MatchesScreen from '../screens/Mains/MatchesScreen';
import { BottomNavigation } from 'react-native-paper';



const MainTabNavigator = () => {

  const [index,setIndex]= useState(0);

  const [routes] = useState([
    {key: 'news' ,title: 'Tin tức' ,focusedIcon: 'newspaper-variant', unfocusedIcon : 'newspaper-variant-outline'},
    {key: 'shop' ,title: 'Cửa hàng' ,focusedIcon: 'store', unfocusedIcon : 'store-outline'},
    {key: 'main' ,title: 'Trang chủ' ,focusedIcon: 'home', unfocusedIcon : 'home-outline'},
    {key: 'matches' ,title: 'Lịch thi đấu' ,focusedIcon: 'calendar', unfocusedIcon : 'calendar-outline'},
    {key: 'user' ,title: 'Cá nhân' ,focusedIcon: 'account', unfocusedIcon : 'account-outline'},
    
  ]);

  const renderScene = BottomNavigation.SceneMap({
    news: NewsScreen,
    matches: MatchesScreen,
    main: MainScreen,
    shop: ShopScreen,
    user: UserScreen,
  });

  return(
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
  // return (
  //   <MainStack.Navigator 
  //   initialRouteName="Main" 
  //   screenOptions={{ 
  //     headerShown: false ,
  //     gestureEnabled: false
  //     }}>

  //      <MainStack.Screen name="Main" component={MainScreen} />
  //      <MainStack.Screen name="News" component={NewsScreen} />
  //      <MainStack.Screen name="Shop" component={ShopScreen} />
  //      <MainStack.Screen name="User" component={UserScreen} />
  //   </MainStack.Navigator>
  // );
};


export default MainTabNavigator;
