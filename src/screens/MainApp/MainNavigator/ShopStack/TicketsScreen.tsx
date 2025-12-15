import { StyleSheet, Text, View ,Image, Dimensions } from 'react-native'
import React from 'react'

const WIDTH= Dimensions.get('window').width;
const imgUrl ='https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/548603767_1461263065502426_1630409452714940641_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG2In7MCTMrel4SzbwbRxZFIPI6lwMqn9Qg8jqXAyqf1FpR46UiDv3rKm6RVka0JVwcQYmH0c2QhAWSiPQRwjFe&_nc_ohc=WVEzYEcOpdMQ7kNvwEbXdxf&_nc_oc=Adn90yevS7qIVF_eyhd4CV_M0-Ona_7gKBoaG88JYS1mR5QcWc03qa53831QRHqB_uw&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=dk92M8LZwEKvJG2u5uD4gg&oh=00_AfmElEx8RPNpx9sw8PtlhVKsKX08feoeUUG4-l5bkcrUvw&oe=693FE8FE'

const TicketsScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imgUrl }} style={styles.image} />
      <Text>TicketsScreen</Text>
    </View>
  )
}

export default TicketsScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
  
    alignItems:'center'
  },
  image:{
    height:400,
    width: WIDTH,
    resizeMode:'cover'
  }
})