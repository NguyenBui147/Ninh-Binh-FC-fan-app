import { Text, View,ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { Board } from '../../../../components'
import { useStanding } from '../../../../hooks/useStanding'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../../../assets/colors/colors'


const LeaderBoardScreen = () => {
  const {standings,loading, error } = useStanding()
  if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primaryRed} />
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
      <Board.LeaderBoard data={standings}/>
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



