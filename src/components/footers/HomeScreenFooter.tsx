import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../assets/colors/colors'
import { images } from '../../assets'

const {width} = Dimensions.get('window')
const LOGO_WIDTH= width * 0.5

const HomeScreenFooter = () => {
  return (
    <View style={styles.container}>

    <Image source={images.lpbank} style={styles.img}/>
  </View>
  )
}

export default HomeScreenFooter

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.orange,
        padding: 20
    },
    img:{
        alignSelf:'center',
        width:LOGO_WIDTH,
        height: 100,
        resizeMode: 'contain',
        marginRight: 10,

    }
})