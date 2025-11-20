import {  StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import Colors from '../../../../assets/colors/colors';
import { HomeStackScreensProps } from '../../../../navigation/NavigationTypes';
import { ScrollView } from 'react-native-gesture-handler';
import { Sliders } from '../../../../components';
import LiveScoreBoard from '../../../../components/LiveScoreBoard';

const HomeScreen:React.FC<HomeStackScreensProps<"Home">> = () => {

  return (
    <ScrollView style={{flex:1,backgroundColor:Colors.white}}>
      <Sliders.BannerSlider />
      
      <View style={styles.container}>
        <View>
          <Text style={styles.segmentText}>TRẬN ĐẤU TRỰC TIẾP </Text>
        </View>
          <LiveScoreBoard/>

        <View>
          <Text style={styles.segmentText}>SỰ KIỆN NỔI BẬT </Text>
        </View>


        </View>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:18,
  },
  segmentText:{
    fontFamily:'Manrope-ExtraBold',
    fontSize:16,
    marginVertical:10,
    fontWeight: 'bold',
    color:Colors.darkNavy
  },

})
export default HomeScreen
