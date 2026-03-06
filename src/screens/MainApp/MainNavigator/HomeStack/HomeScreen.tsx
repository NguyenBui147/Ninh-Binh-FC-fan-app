import { StyleSheet, View, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react' // 2. Thêm useState
import { Button, Text, IconButton } from 'react-native-paper' // Thêm IconButton cho đẹp
import Colors from '../../../../assets/colors/colors';
import { HomeStackScreensProps } from '../../../../navigation/NavigationTypes';
import { ScrollView } from 'react-native-gesture-handler';
import { Sliders } from '../../../../components';
import { Board } from '../../../../components';
import { Footers } from '../../../../components';
import { Modals } from '../ModalStack';

import LiveChat from '../../../../components/LiveChat';
import { useLiveScore } from '../../../../hooks/useLiveScore';

const HomeScreen: React.FC<HomeStackScreensProps<"Home">> = () => {
  const [isChatVisible, setChatVisible] = useState(false);
  const { match } = useLiveScore();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
        <Sliders.BannerSlider />

        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <Sliders.CardSlider />
          </View>
          <Text style={styles.segmentText}>TRẬN ĐẤU TRỰC TIẾP </Text>
          <View>
            <Board.LiveScoreBoard />
          </View>
          <View>
            <Text style={styles.segmentText}>Live </Text>
            <Sliders.VideoSlider />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              mode="contained"
              icon="chat-processing"
              buttonColor={Colors.primaryColor || '#d32f2f'}
              textColor="white"
              onPress={() => setChatVisible(true)}
              contentStyle={{ height: 50 }}
            >
              Tham gia Live Chat trận đấu
            </Button>
          </View>
          <View style={{ height: 50 }}></View>
        </View>

        <Footers.Footer1 />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isChatVisible}
        onRequestClose={() => setChatVisible(false)}
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

          <View style={styles.chatHeader}>
            <IconButton
              icon="close"
              size={24}
              onPress={() => setChatVisible(false)}
            />
            <Text style={styles.chatTitle}>{match ? `Chat: ${match.homeTeam} vs ${match.awayTeam}` : 'Cộng đồng Fan Ninh Bình'}</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={{ flex: 1 }}>
            <LiveChat matchId={match?.id || "community-lobby"} />
          </View>
        </SafeAreaView>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 18,
  },
  sectionContainer: {
    borderRadius: 12,
    overflow: 'hidden'
  },
  segmentText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    color: Colors.darkNavy
  },
  // Style cho Header của Chat Modal
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: 50,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  }
})

export default HomeScreen;