import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';


const VideoPlayer = () => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state:any) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Thông báo', 'Video đã kết thúc!');
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={200}
          play={playing}
          videoId={'BsDrkfYgKpg'} 
          onChangeState={onStateChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center', 
  },
  videoContainer: {
    width: '100%',
  }
});

export default VideoPlayer;