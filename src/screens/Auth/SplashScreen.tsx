import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoundedButton from '../../components/buttons/roundedButton'
import Colors from '../../assets/colors/colors'
import { AuthStackScreensProps } from '../../navigation/NavigationTypes'

const SplashScreen: React.FC<AuthStackScreensProps<'Splash'>> = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ninh Bình FC</Text>

      <RoundedButton
        text="Tiếp tục"
        backgroundColor={Colors.blue}
        backgroundImageSource=""
        onPress={handlePress}
      />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 20,
  },
});