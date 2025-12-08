import { StyleSheet, Text, View, ActivityIndicator ,Image} from 'react-native';
import React from 'react';
import { RootStackScreensProps } from '../navigation/NavigationTypes';
import Colors from '../assets/colors/colors';
import { images } from '../assets';



type SplashScreenProps = RootStackScreensProps<'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = () => {

  return (
    <View style={styles.container}> 
      <Text style={styles.title}>CLB NINH BÌNH FC</Text>
      {/* <Image source={{uri: images.nbfc} } style={styles.logo}/> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.maroon,
    justifyContent: 'center',
    alignItems: 'center',

  },
  logo: {
      width:180,
      height:180,
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