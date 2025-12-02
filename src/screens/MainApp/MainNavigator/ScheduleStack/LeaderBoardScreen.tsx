import { Text, View,ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { leaderboard } from '../../../../components'
import { useStanding } from '../../../../hooks/useStanding'
import { SafeAreaView } from 'react-native-safe-area-context'


const LeaderBoardScreen = () => {
  const {standings,loading, error } = useStanding()
  if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 10 }}>Đang tải bảng xếp hạng...</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <leaderboard.LeaderBoard data={standings}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  centerContainer:{
    flex:1,
    justifyContent:'center',
    alignContent:'center'
    
  }
})

export default LeaderBoardScreen



