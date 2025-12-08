import {  StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import Colors from '../../../../assets/colors/colors';
import { HomeStackScreensProps } from '../../../../navigation/NavigationTypes';
import { ScrollView } from 'react-native-gesture-handler';
import { Sliders } from '../../../../components';
import { Board } from '../../../../components';
import { Footers } from '../../../../components';

const HomeScreen:React.FC<HomeStackScreensProps<"Home">> = () => {

  return (
    <ScrollView style={{flex:1,backgroundColor:Colors.white}}>
      <Sliders.BannerSlider />
      
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <Sliders.CardSlider/>
        </View>
        <Text style={styles.segmentText}>TRẬN ĐẤU TRỰC TIẾP </Text>
        <View>
          <Board.LiveScoreBoard/>
        </View>
        {/* <View>
          <Sliders.SocialSlider/>
          </View> */}
        <View>
          <Text style={styles.segmentText}>MẠNG XÃ HỘI </Text>
         <Sliders.VideoSlider/></View>
        <View style={{height:400}}></View>
      </View>
      <Footers.Footer1/>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:18,
  },
  sectionContainer:{
    borderRadius:12,
    overflow:'hidden'
  },
  segmentText:{
    fontFamily:'Manrope-ExtraBold',
    fontSize:20,
    marginVertical:20,
    fontWeight: 'bold',
    color:Colors.darkNavy
  },

})
export default HomeScreen
