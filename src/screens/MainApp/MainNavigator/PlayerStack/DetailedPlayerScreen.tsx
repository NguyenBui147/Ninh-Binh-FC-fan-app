import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getFirestore } from '@react-native-firebase/firestore'
import { useRoute ,RouteProp} from '@react-navigation/native'
import { PlayerStackParamList } from '../../../../navigation/NavigationTypes'
import Colors from '../../../../assets/colors/colors'

const DetailedPlayerScreen = () => {
  // const route = useRoute<RouteProp<PlayerStackParamList , 'DetailedPlayer'>>()
  // const {player} = route.params
  // const [detailedPlayer,setDetailedPlayer]

  return (
    <View>
      <Text>DetailedPlayerScreen</Text>
    </View>
  )
}

export default DetailedPlayerScreen

const styles = StyleSheet.create({})