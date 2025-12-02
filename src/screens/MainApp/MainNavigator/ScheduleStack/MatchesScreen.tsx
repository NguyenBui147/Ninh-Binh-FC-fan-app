import { Text, View,ActivityIndicator, StyleSheet} from 'react-native'
import React from 'react'
import Colors from '../../../../assets/colors/colors'
import { useMatches } from '../../../../hooks/useMatches'
import { Board } from '../../../../components'
import { SafeAreaView } from 'react-native-safe-area-context'

const MatchesScreen = () => {
  const {match,loading,error } = useMatches();
  if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primaryRed} />
          <Text style={{ marginTop: 10 }}>Đang tải lịch thi đấu...</Text>
        </View>
      );
    }
  if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={{ color: 'red' }}>Lỗi tải dữ liệu!</Text>
        </View>
      );
    }  

  return(
  <SafeAreaView style={styles.container}>
    <Board.MatchesItem data={match}/>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container :{
    flex: 1
  },
  centerContainer:{
    flex:1,
    justifyContent:'center',
    alignContent:'center'
    
  }
})

export default MatchesScreen

