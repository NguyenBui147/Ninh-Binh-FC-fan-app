import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { RootStackScreensProps } from '../navigation/NavigationTypes';
import Colors from '../assets/colors/colors';



type SplashScreenProps = RootStackScreensProps<'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = () => {

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>CLB NINH BÌNH FC</Text>
      <Text style={styles.subtitle}>Sẵn sàng đồng hành cùng đội bóng</Text>
      <ActivityIndicator size="large" color={Colors.maroon} style={styles.spinner} />

      
      
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  spinner: {
      marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 5,
  },
  subtitle: {
      fontSize: 16,
      color: Colors.gray,
      marginBottom: 50,
  },

});