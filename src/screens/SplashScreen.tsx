import { StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native';
import React from 'react';
import { RootStackScreensProps } from '../navigation/NavigationTypes';
import Colors from '../assets/colors/colors';

type SplashScreenProps = RootStackScreensProps<'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  
  const handlePress = () => {
    navigation.replace('AuthStack');
  };
  const SimpleContinueButton = () => (
    <Pressable
      style={styles.button}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>Tiếp tục</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Logo/Icon CLB */}
      <ActivityIndicator size="large" color={Colors.primaryRed || '#FF0000'} style={styles.spinner} />
      
      <Text style={styles.title}>CLB NINH BÌNH FC</Text>
      <Text style={styles.subtitle}>Sẵn sàng đồng hành cùng đội bóng</Text>

      <SimpleContinueButton />
      
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
  button: {
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    backgroundColor: Colors.blue || '#007AFF', // Màu nền nút
    elevation: 3,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
});